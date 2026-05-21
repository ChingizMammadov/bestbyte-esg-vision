-- Neon PostgreSQL schema for BestByte ESG Vision
-- Adapted from Supabase migration: auth.users removed, RLS removed (handled by Clerk + FastAPI)

-- Enum types (safe re-run)
DO $$ BEGIN CREATE TYPE app_role AS ENUM ('admin', 'manager', 'viewer'); EXCEPTION WHEN duplicate_object THEN null; END; $$;
DO $$ BEGIN CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected'); EXCEPTION WHEN duplicate_object THEN null; END; $$;
DO $$ BEGIN CREATE TYPE data_source_type AS ENUM ('manual', 'api', 'file_upload', 'sensor'); EXCEPTION WHEN duplicate_object THEN null; END; $$;
DO $$ BEGIN CREATE TYPE report_status AS ENUM ('draft', 'published', 'archived'); EXCEPTION WHEN duplicate_object THEN null; END; $$;

-- profiles: id is Clerk user ID (text like "user_2abc123...")
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  job_title TEXT,
  department TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  industry TEXT,
  size TEXT,
  headquarters_location TEXT,
  website TEXT,
  description TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_company_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, company_id)
);

CREATE TABLE IF NOT EXISTS sustainability_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  report_type TEXT,
  reporting_period_start DATE,
  reporting_period_end DATE,
  status report_status DEFAULT 'draft',
  file_url TEXT,
  summary TEXT,
  created_by TEXT REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS carbon_footprint_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  scope INTEGER CHECK (scope IN (1, 2, 3)),
  category TEXT,
  source_description TEXT,
  emissions_co2_tons DECIMAL(12,2),
  calculation_method TEXT,
  emission_factor DECIMAL(10,4),
  activity_data DECIMAL(12,2),
  unit TEXT,
  reporting_period DATE,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS energy_consumption (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  facility_name TEXT,
  energy_type TEXT,
  source TEXT,
  consumption_kwh DECIMAL(12,2),
  cost DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  reporting_period DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS waste_management_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  facility_name TEXT,
  waste_type TEXT,
  waste_category TEXT,
  amount_kg DECIMAL(10,2),
  disposal_method TEXT,
  cost DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  reporting_period DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS water_usage_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  facility_name TEXT,
  usage_type TEXT,
  source TEXT,
  consumption_liters DECIMAL(12,2),
  cost DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  reporting_period DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS supply_chain_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  supplier_name TEXT NOT NULL,
  supplier_category TEXT,
  esg_score INTEGER CHECK (esg_score >= 0 AND esg_score <= 100),
  environmental_score INTEGER CHECK (environmental_score >= 0 AND environmental_score <= 100),
  social_score INTEGER CHECK (social_score >= 0 AND social_score <= 100),
  governance_score INTEGER CHECK (governance_score >= 0 AND governance_score <= 100),
  certification_status TEXT,
  last_audit_date DATE,
  next_audit_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS employee_engagement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  category TEXT,
  value DECIMAL(10,2),
  unit TEXT,
  department TEXT,
  reporting_period DATE,
  target_value DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS report_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  template_config JSONB,
  is_default BOOLEAN DEFAULT FALSE,
  created_by TEXT REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS benchmark_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  industry TEXT NOT NULL,
  company_size TEXT,
  metric_name TEXT NOT NULL,
  benchmark_value DECIMAL(12,2),
  unit TEXT,
  percentile INTEGER CHECK (percentile >= 0 AND percentile <= 100),
  year INTEGER,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  record_id UUID,
  action TEXT NOT NULL,
  old_values JSONB,
  new_values JSONB,
  user_id TEXT REFERENCES profiles(id),
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  ip_address INET
);

CREATE TABLE IF NOT EXISTS data_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type data_source_type NOT NULL,
  description TEXT,
  connection_config JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  last_sync TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS verification_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  status verification_status DEFAULT 'pending',
  verified_by TEXT REFERENCES profiles(id),
  verification_date TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS esg_targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  metric_name TEXT NOT NULL,
  target_value DECIMAL(12,2),
  current_value DECIMAL(12,2),
  unit TEXT,
  target_date DATE,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notification_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL,
  enabled BOOLEAN DEFAULT TRUE,
  frequency TEXT DEFAULT 'daily',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, notification_type)
);

CREATE TABLE IF NOT EXISTS dashboard_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  configuration_name TEXT DEFAULT 'Default',
  layout_config JSONB,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE OR REPLACE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE OR REPLACE TRIGGER update_sustainability_reports_updated_at BEFORE UPDATE ON sustainability_reports FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE OR REPLACE TRIGGER update_supply_chain_metrics_updated_at BEFORE UPDATE ON supply_chain_metrics FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE OR REPLACE TRIGGER update_esg_targets_updated_at BEFORE UPDATE ON esg_targets FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE OR REPLACE TRIGGER update_notification_settings_updated_at BEFORE UPDATE ON notification_settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE OR REPLACE TRIGGER update_dashboard_configurations_updated_at BEFORE UPDATE ON dashboard_configurations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
