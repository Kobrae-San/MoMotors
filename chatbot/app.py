import os
import torch
import ollama
from flask import Flask, request, jsonify, render_template

from rag import ollama_chat
from upload import upload

app = Flask(__name__)

vault_content = {}
vault_embeddings = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    global vault_content, vault_embeddings

    data = request.json
    filename = data.get("filename", "").strip()
    user_input = data.get("question", "").strip()

    if not filename:
        return jsonify({"error": "Veuillez entrer un nom de fichier"}), 400
    if not user_input:
        return jsonify({"error": "Veuillez poser une question"}), 400

    if filename not in vault_content:
        try:
            upload(filename) 
            with open("vault.txt", "r", encoding='utf-8') as vault_file:
                vault_content[filename] = vault_file.readlines()

            vault_embeddings[filename] = torch.tensor([
                ollama.embeddings(model='mxbai-embed-large', prompt=content)["embedding"]
                for content in vault_content[filename]
            ])
        except Exception as e:
            return jsonify({"error": f"Erreur lors du chargement du fichier : {e}"}), 500

    try:
        system_message = "Vous êtes un assistant expert en extraction d'informations à partir de documents."
        conversation_history = []
        response = ollama_chat(user_input, system_message, vault_embeddings[filename], vault_content[filename], "llama3", conversation_history, 0.1)

        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
