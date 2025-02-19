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

    # Calcul du prix total
    if data["type"] == "Location":
        start_date = data["start_time"]
        end_date = data["end_time"]
        nb_jours = (end_date - start_date).days 
        total_prix = nb_jours * data["price"]
    else:
        total_prix = data["price"]

    # Positionnement des textes
    x_position = 50
    y_position = height - 50
    line_height = 20 

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawCentredString(width / 2, y_position, "M'Motors")
    y_position -= 40

    pdf.setFont("Helvetica-Bold", 20)
    pdf.drawCentredString(width / 2, y_position, f"CONTRAT DE {data["type"].upper()}")  
    y_position -= 40

    pdf.setFont("Helvetica", 12)
    pdf.drawRightString(width - 50, y_position, f"Date : {data["created_at"].strftime('%d/%m/%Y')}")
    pdf.drawString(x_position, y_position, f"N° Dossier : {data["id"]}")
    y_position -= line_height
    pdf.drawString(x_position, y_position, f"Statut du dossier : {data["status"]}")

    divider_y_position = y_position - 15
    pdf.setStrokeColorRGB(0, 0, 0)
    pdf.setLineWidth(0.5)
    pdf.line(50, divider_y_position, width - 50, divider_y_position)
    y_position -= 40

    # # CLIENT
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

    # # VEHICULE
    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(x_position, y_position, "VÉHICULE :")
    y_position -= line_height + 10
    pdf.setFont("Helvetica", 12)
    
    pdf.drawString(x_position, y_position, f"Modèle : {data["model"]}")
    y_position -= line_height
    pdf.drawString(x_position, y_position, f"Année : {data["year"]}")
    y_position -= line_height
    pdf.drawString(x_position, y_position, f"Kilométrage : {data["km"]} km")
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

    y_position -= 30

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
        pdf.drawRightString(width - 50, y_position, f"{nb_jours} jours x {data["price"]:.2f}€ = {total_prix:.2f}€")
    else :
        pdf.drawRightString(width - 50, y_position,  f"{total_prix}€")

    pdf.showPage()
    pdf.save()
    
    buffer.seek(0)
    return StreamingResponse(buffer, media_type="application/pdf", headers={"Content-Disposition": "inline; filename=contrat_location.pdf"})