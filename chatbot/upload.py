from PyPDF2 import PdfReader
from bucket import Bucket

NEON_GREEN = '\033[92m'
RESET_COLOR = '\033[0m'

def extract_text_from_pdf(pdf_stream):
    try:
        pdf_reader = PdfReader(pdf_stream)
        with open("vault.txt", 'w', encoding='utf-8') as output_file:
            for page in pdf_reader.pages:
                text = page.extract_text()
                if text:
                    output_file.write(text + "\n")
        print(NEON_GREEN + "vault.txt created" + RESET_COLOR)
    except Exception as e:
        raise Exception(f"Error during text extraction : {e}")

def upload(filename: str):
    try:
        pdf_stream = Bucket.read("transaction-folders/", filename)

        extract_text_from_pdf(pdf_stream)
    except Exception as err:
        print(f"Error : {err}")
