import boto3
import os
from dotenv import load_dotenv

load_dotenv()

class Bucket:
    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")
    )
    bucket_name = os.getenv("S3_BUCKET_NAME")

    @classmethod
    def write(cls, content, name: str):
        try:
            cls.s3.put_object(Bucket=cls.bucket_name, Key=name, Body=content)
        except Exception as e:
            raise ConnectionError(f"S3 bucket connection error: {e}")
