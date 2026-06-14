import pypdf
import os

pdf_path = 'Scope Brochure_All 3 (1).pdf'
if not os.path.exists(pdf_path):
    print("PDF not found")
    exit(1)

reader = pypdf.PdfReader(pdf_path)
print(f"Total pages: {len(reader.pages)}")

for i, page in enumerate(reader.pages):
    text = page.extract_text()
    if 'zochem' in text.lower():
        print(f"Zochem found on page {i+1}")
    if 'xinyu' in text.lower():
        print(f"Xinyu found on page {i+1}")
