from fastapi.responses import StreamingResponse
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from datetime import datetime
import io
import textwrap

def generate_pdf(data):

    buffer = io.BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    filename = f"{data['id']}_transaction.pdf"

    pdf.setTitle(f"{filename}")

    # Calcul du prix total
    if data["type"] == "Location":
        start_date = data["start_time"]
        end_date = data["end_time"]
        nb_days = (end_date - start_date).days 
        total = nb_days * data["price"]
    else:
        total = data["price"]

    formated_price = f"{data['price']:.2f}".replace(".", ",")
    formated_total = f"{total:,.2f}".replace(",", " ").replace(".", ",")
    formated_km = f"{data['km']:,.2f}".replace(",", " ")

    # Positionnement des textes
    x_position = 50
    y_position = height - 50
    line_height = 20 

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawCentredString(width / 2, y_position, "MoMotors")
    y_position -= 40

    pdf.setFont("Helvetica-Bold", 20)
    pdf.drawCentredString(width / 2, y_position, f"CONTRAT DE {data["type"].upper()}")
    y_position -= 40

    pdf.setFont("Helvetica", 12)
    pdf.drawRightString(width - 50, y_position, f"DATE : {data["created_at"].strftime('%d/%m/%Y')}")
    pdf.drawString(x_position, y_position, f"CONTRAT N° : {data["id"]}")
    y_position -= line_height
    pdf.drawString(x_position, y_position, f"STATUT : {data["status"].upper()}")

    divider_y_position = y_position - 15
    pdf.setStrokeColorRGB(0, 0, 0)
    pdf.setLineWidth(0.5)
    pdf.line(50, divider_y_position, width - 50, divider_y_position)
    y_position -= 40

    # CLIENT
    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(x_position, y_position, "CLIENT :")
    y_position -= line_height + 10
    pdf.setFont("Helvetica", 12)
    
    if data["type"] == "Location":
        wrapped_text = textwrap.wrap(
            f"Je soussigné(e) {data['lastname']} {data['firstname']} souscris au contrat de location du véhicule "
            f"{data['brand']} {data['model']}, loué(e) en bon état, pour la période du {data['start_time'].strftime('%d/%m/%Y')} au {data['end_time'].strftime('%d/%m/%Y')}. "
            f"Je m'engage à utiliser le véhicule avec soin, à assumer les conséquences d'une éventuelle dégradation "
            f"et à respecter les conditions du contrat de location.", width=90
        )

    else :
        wrapped_text = textwrap.wrap(
            f"Je soussigné(e) {data['lastname']} {data['firstname']} confirme l'achat du véhicule {data['brand']} "
            f"{data['model']}, acheté en bon état, et m'engage à en devenir propriétaire à compter de la date de la transaction. "
            f"Je m'engage également à respecter les conditions liées à l'achat du véhicule.", width=90
        )
            
    for line in wrapped_text:
        pdf.drawString(x_position, y_position, line)
        y_position -= line_height

    y_position -= 10
    pdf.drawString(x_position, y_position, f"Email : {data["email"]}")
    y_position -= line_height
    pdf.drawString(x_position, y_position, f"Téléphone : {data["telephone"]}")
    y_position -= 5

    divider_y_position = y_position - 15
    pdf.setStrokeColorRGB(0, 0, 0)
    pdf.setLineWidth(0.5)
    pdf.line(50, divider_y_position, width - 50, divider_y_position)
    y_position -= 40

    # VEHICULE
    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(x_position, y_position, "VÉHICULE :")
    y_position -= line_height + 10
    pdf.setFont("Helvetica", 12)
    
    pdf.drawString(x_position, y_position, f"Modèle : {data["model"]}")
    y_position -= line_height
    pdf.drawString(x_position, y_position, f"Année : {data["year"]}")
    y_position -= line_height
    pdf.drawString(x_position, y_position, f"Kilométrage : {formated_km} km")
    y_position -= line_height
    pdf.drawString(x_position, y_position, f"Type : {data["type"]}")
    y_position -= line_height
    pdf.drawString(x_position, y_position, f"Énergie : {data["energy"]}")
    y_position -= line_height
    pdf.drawString(x_position, y_position, f"Catégorie : {data["category"]}")
    y_position -= line_height

    wrapped_desc = textwrap.wrap(f"Description : {data["description"]}", width=90)
    for line in wrapped_desc:
        pdf.drawString(x_position, y_position, line)
        y_position -= line_height

    divider_y_position = y_position - 10
    pdf.setStrokeColorRGB(0, 0, 0)
    pdf.setLineWidth(0.5)
    pdf.line(50, divider_y_position, width - 50, divider_y_position)
    y_position -= 35

    total_text = f"TOTAL"
    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawRightString(width - 50, y_position, total_text)

    y_position -= line_height
    if data["type"] == "Location":
        pdf.drawRightString(width - 50, y_position, f"{nb_days} jours x {formated_price}€ = {formated_total}€")
    else :
        pdf.drawRightString(width - 50, y_position,  f"{formated_total}€")

    pdf.showPage()
    pdf.save()
    
    buffer.seek(0)

    return buffer.getvalue()
