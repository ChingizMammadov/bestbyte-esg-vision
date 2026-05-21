import os
import boto3
from botocore.config import Config
from dotenv import load_dotenv

load_dotenv()

R2_ACCOUNT_ID  = os.getenv("R2_ACCOUNT_ID", "")
R2_ACCESS_KEY  = os.getenv("R2_ACCESS_KEY", "")
R2_SECRET_KEY  = os.getenv("R2_SECRET_KEY", "")
R2_BUCKET      = os.getenv("R2_BUCKET", "bestbyte-reports")
R2_ENDPOINT    = f"https://{R2_ACCOUNT_ID}.r2.cloudflarestorage.com"

_client = None


def _get_client():
    global _client
    if _client is None:
        _client = boto3.client(
            "s3",
            endpoint_url=R2_ENDPOINT,
            aws_access_key_id=R2_ACCESS_KEY,
            aws_secret_access_key=R2_SECRET_KEY,
            config=Config(signature_version="s3v4"),
            region_name="auto",
        )
    return _client


def upload_pdf(pdf_bytes: bytes, key: str) -> str:
    """Upload PDF to R2 and return the object key."""
    _get_client().put_object(
        Bucket=R2_BUCKET,
        Key=key,
        Body=pdf_bytes,
        ContentType="application/pdf",
    )
    return key


def download_pdf(key: str) -> bytes:
    """Download PDF from R2 and return bytes."""
    response = _get_client().get_object(Bucket=R2_BUCKET, Key=key)
    return response["Body"].read()


def get_presigned_url(key: str, expires: int = 3600) -> str:
    """Return a pre-signed download URL valid for `expires` seconds."""
    return _get_client().generate_presigned_url(
        "get_object",
        Params={"Bucket": R2_BUCKET, "Key": key},
        ExpiresIn=expires,
    )


def delete_object(key: str) -> None:
    _get_client().delete_object(Bucket=R2_BUCKET, Key=key)
