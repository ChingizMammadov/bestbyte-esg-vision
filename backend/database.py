import sqlite3
from sqlite3 import Connection
import os
from datetime import datetime
import io

# Use persistent data directory on Render
DATA_DIR = os.environ.get("RENDER_DISK_MOUNT_PATH", "")
if DATA_DIR:
    print(f"Using Render persistent disk at {DATA_DIR}")
    DB_DIR = os.path.join(DATA_DIR, "db")
    REPORTS_DIR = os.path.join(DATA_DIR, "reports")
else:
    print("Using local directories")
    DB_DIR = "db"
    REPORTS_DIR = "reports"

# Create database directory if it doesn't exist
os.makedirs(DB_DIR, exist_ok=True)
os.makedirs(REPORTS_DIR, exist_ok=True)

DB_PATH = os.path.join(DB_DIR, "reports.db")

def get_db_connection() -> Connection:
    """Create a connection to the SQLite database"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize the database with required tables"""
    conn = get_db_connection()
    try:
        # Check if the reports table exists
        table_exists = conn.execute(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='reports'"
        ).fetchone()
        
        # Create reports directory if it doesn't exist
        os.makedirs(REPORTS_DIR, exist_ok=True)
        
        if not table_exists:
            # Create the table with file_path instead of binary data
            conn.execute('''
            CREATE TABLE reports (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                filename TEXT NOT NULL,
                file_path TEXT NOT NULL,
                created_at TEXT NOT NULL,
                file_size INTEGER NOT NULL,
                user_id TEXT NOT NULL
            )
            ''')
            conn.commit()
        else:
            # Check for schema migration - if report_data exists but file_path doesn't
            column_exists = conn.execute(
                "PRAGMA table_info(reports)"
            ).fetchall()
            
            columns = {col['name'] for col in column_exists}
            
            # Add user_id if needed
            if 'user_id' not in columns:
                conn.execute('ALTER TABLE reports ADD COLUMN user_id TEXT NOT NULL DEFAULT "system"')
                conn.commit()
                print("Added user_id column to existing reports table")
                
            # Migrate from BLOB storage to file storage if needed
            if 'report_data' in columns:
                # Check if file_path column needs to be added
                if 'file_path' not in columns:
                    print("Migrating from BLOB storage to file storage...")
                    
                    # Add file_path column
                    conn.execute('ALTER TABLE reports ADD COLUMN file_path TEXT')
                    conn.commit()
                    
                    # Get all reports with BLOB data
                    reports = conn.execute('SELECT id, filename, report_data, user_id FROM reports').fetchall()
                    
                    # Save each report to file and update the database
                    for report in reports:
                        if report['report_data']:
                            # Create user directory
                            user_dir = os.path.join("reports", report['user_id'])
                            os.makedirs(user_dir, exist_ok=True)
                            
                            # Generate file path
                            file_path = os.path.join(user_dir, f"{report['id']}_{report['filename']}")
                            
                            # Save to file
                            with open(file_path, 'wb') as f:
                                f.write(report['report_data'])
                            
                            # Update database
                            conn.execute(
                                'UPDATE reports SET file_path = ? WHERE id = ?',
                                (file_path, report['id'])
                            )
                    
                    conn.commit()
                    print(f"Migration complete: {len(reports)} reports moved to filesystem")
                
                # Make report_data column nullable
                print("Making report_data column nullable...")
                
                # In SQLite, we need to recreate the table to change column constraints
                # First, get the current schema
                conn.execute("PRAGMA foreign_keys=off")
                
                # Create a new table without the NOT NULL constraint on report_data
                conn.execute('''
                CREATE TABLE reports_new (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    filename TEXT NOT NULL,
                    report_data BLOB,
                    file_path TEXT NOT NULL,
                    created_at TEXT NOT NULL,
                    file_size INTEGER NOT NULL,
                    user_id TEXT NOT NULL
                )
                ''')
                
                # Copy the data
                conn.execute('''
                INSERT INTO reports_new (id, filename, report_data, file_path, created_at, file_size, user_id)
                SELECT id, filename, report_data, file_path, created_at, file_size, user_id FROM reports
                ''')
                
                # Drop the old table
                conn.execute("DROP TABLE reports")
                
                # Rename the new table
                conn.execute("ALTER TABLE reports_new RENAME TO reports")
                
                # Add indices for performance
                conn.execute("CREATE INDEX IF NOT EXISTS idx_reports_id ON reports(id)")
                conn.execute("CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id)")
                
                conn.execute("PRAGMA foreign_keys=on")
                conn.commit()
                print("Database schema updated successfully - report_data is now nullable")
    except Exception as e:
        print(f"Database initialization error: {e}")
    finally:
        conn.close()

def save_report(report_data: bytes, filename: str, user_id: str) -> int:
    """Save a report to filesystem and record in database
    
    Args:
        report_data: Binary content of the report
        filename: Name of the report file
        user_id: ID of the user who generated the report
        
    Returns:
        The ID of the saved report
    """
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        # First insert the record to get an ID
        cursor.execute(
            "INSERT INTO reports (filename, file_path, created_at, file_size, user_id) VALUES (?, ?, ?, ?, ?)",
            (filename, "", datetime.now().isoformat(), len(report_data), user_id)
        )
        conn.commit()
        report_id = cursor.lastrowid
        
        # Create user directory if it doesn't exist
        safe_user_id = user_id.replace("/", "_").replace("\\", "_")  # Sanitize user_id for file path
        user_dir = os.path.join(REPORTS_DIR, safe_user_id)
        os.makedirs(user_dir, exist_ok=True)
        
        # Create file path with timestamp to avoid collisions
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        sanitized_filename = os.path.basename(filename).replace(" ", "_")
        file_path = os.path.join(user_dir, f"{report_id}_{timestamp}_{sanitized_filename}")
        
        # Save the file
        with open(file_path, 'wb') as f:
            f.write(report_data)
        
        # Update the database with the file path
        cursor.execute(
            "UPDATE reports SET file_path = ? WHERE id = ?",
            (file_path, report_id)
        )
        conn.commit()
        
        print(f"Report saved to file: {file_path}")
        return report_id
    except Exception as e:
        print(f"Error saving report: {e}")
        raise
    finally:
        conn.close()

def get_report(report_id: int, user_id: str = None) -> tuple[bytes, str]:
    """Retrieve a report from the filesystem by ID
    
    Args:
        report_id: The ID of the report to retrieve
        user_id: ID of the user requesting the report (if provided, checks ownership)
        
    Returns:
        Tuple of (report_data, filename) or (None, None) if not found/not authorized
    """
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        # Add index to improve query performance if it doesn't exist
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_reports_id ON reports(id);
        """)
        conn.commit()
        
        # Check if report exists and get metadata first (for quick checking)
        query_params = [report_id]
        query = "SELECT id, filename, file_path FROM reports WHERE id = ?"
        
        if user_id:
            query += " AND user_id = ?"
            query_params.append(user_id)
        
        result = cursor.execute(query, query_params).fetchone()
        
        if result is None:
            print(f"Report {report_id} not found or not authorized")
            return None, None
        
        # Check if we have a file path (migrated storage) or report_data (legacy)
        if 'file_path' in result and result['file_path']:
            file_path = result['file_path']
            
            # Check if file exists
            if not os.path.isfile(file_path):
                print(f"Report file not found: {file_path}")
                return None, None
                
            # Read file contents
            with open(file_path, 'rb') as f:
                report_data = f.read()
                
            print(f"Successfully retrieved report from filesystem: {result['filename']} ({len(report_data)} bytes)")
            return report_data, result['filename']
        else:
            # Try to get legacy BLOB data
            legacy_result = cursor.execute(
                "SELECT report_data, filename FROM reports WHERE id = ?", 
                (report_id,)
            ).fetchone()
            
            if legacy_result is None or 'report_data' not in legacy_result:
                print(f"No file path or BLOB data found for report ID {report_id}")
                return None, None
                
            print(f"Retrieved legacy BLOB report: {legacy_result['filename']}")
            return legacy_result["report_data"], legacy_result["filename"]
    except Exception as e:
        print(f"Error retrieving report: {e}")
        return None, None
    finally:
        conn.close()

def get_all_reports(user_id: str = None, limit: int = 50):
    """Get a list of reports (without the actual file data)
    
    Args:
        user_id: ID of the user whose reports to retrieve (if None, returns all reports)
        limit: Maximum number of reports to return (defaults to 50)
        
    Returns:
        List of report metadata dictionaries
    """
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        # Add index to improve query performance if it doesn't exist
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id);
        """)
        conn.commit()
        
        if user_id:
            # Use LIMIT for better performance with large datasets
            reports = cursor.execute(
                """SELECT id, filename, file_path, created_at, file_size, user_id,
                   (CASE WHEN LENGTH(filename) > 50 THEN substr(filename, 1, 50) || '...' ELSE filename END) as display_name,
                   (CASE WHEN file_path != '' AND file_path IS NOT NULL THEN 1 ELSE 0 END) as is_file_stored
                   FROM reports WHERE user_id = ? ORDER BY created_at DESC LIMIT ?""",
                (user_id, limit)
            ).fetchall()
            print(f"Found {len(reports)} reports for user {user_id}")
        else:
            reports = cursor.execute(
                """SELECT id, filename, file_path, created_at, file_size, user_id,
                   (CASE WHEN LENGTH(filename) > 50 THEN substr(filename, 1, 50) || '...' ELSE filename END) as display_name,
                   (CASE WHEN file_path != '' AND file_path IS NOT NULL THEN 1 ELSE 0 END) as is_file_stored
                   FROM reports ORDER BY created_at DESC LIMIT ?""",
                (limit,)
            ).fetchall()
            print(f"Found {len(reports)} total reports (limited to {limit})")
        
        # Convert rows to dictionaries and check file existence
        result = []
        for r in reports:
            report_dict = dict(r)
            
            # Verify file exists if we're using file storage
            if report_dict.get('is_file_stored') and report_dict.get('file_path'):
                report_dict['file_exists'] = os.path.isfile(report_dict['file_path'])
            else:
                report_dict['file_exists'] = False
                
            # Don't send file paths to client for security
            if 'file_path' in report_dict:
                del report_dict['file_path']
                
            result.append(report_dict)
        
        return result
    except Exception as e:
        print(f"Error in get_all_reports: {e}")
        return []
    finally:
        conn.close()

def debug_db():
    """Debug function to print database info"""
    conn = get_db_connection()
    try:
        # Check if the reports table exists
        table_info = conn.execute("PRAGMA table_info(reports)").fetchall()
        print("Table schema:", [dict(col) for col in table_info])
        
        # Check reports count
        report_count = conn.execute("SELECT COUNT(*) as count FROM reports").fetchone()
        print(f"Total reports in database: {report_count['count']}")
        
        # Check reports by user
        reports_by_user = conn.execute(
            "SELECT user_id, COUNT(*) as count FROM reports GROUP BY user_id"
        ).fetchall()
        print("Reports by user:", [dict(r) for r in reports_by_user])
        
        # List all reports
        all_reports = conn.execute(
            "SELECT id, filename, created_at, user_id FROM reports"
        ).fetchall()
        print("All reports:", [dict(r) for r in all_reports])
    except Exception as e:
        print(f"Error debugging database: {e}")
    finally:
        conn.close()

# Initialize the database when this module is imported
init_db()
debug_db()