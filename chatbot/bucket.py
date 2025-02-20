import boto3
import os
import io
from dotenv import load_dotenv

load_dotenv()

class Bucket:
    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
        region_name="us-east-1"
    )
    bucket_name = os.getenv("S3_BUCKET_NAME")

    @classmethod
    def read(cls, directory: str, name: str):
        """
        directory = "transaction-folders/" or "vehicles/"
        """
        try:
            file_stream = io.BytesIO()
            cls.s3.download_fileobj(Bucket=cls.bucket_name, Key=directory + name, Fileobj=file_stream)
            file_stream.seek(0)
            return file_stream
        except Exception as e:
            raise ConnectionError(f"S3 bucket connection error: {e}")
