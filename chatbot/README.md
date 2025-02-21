# Projet IA

Utilise le modele llama3 et peut accepter des fichiers de Google Drive en tant que RAG

## Technologies Utilisées & Prérequis

- Python3
- Ollama (Installer _[ici](https://ollama.com/download)_)  

    (- Avoir un Bucket S3 avec pour branche celles définies "transaction-folders/")

## Setup

- Se déplacer dans `./chatbot/`

### Construire avec Makefile

1. **Créer et activer l'environnement virtuel :**
    Si vous voulez utiliser un environnement virtuel :
    ```bash
    make venv
    ```
    Pour l'activer, faites :
    ```bash
    source .venv/bin/activate
    ```

2. **Installer les dépendances :**
    ```bash
    make requirements
    ```

3. **Télécharger les modèles Ollama :**
    ```bash
    make ollama
    ```

### Construire sans Makefile

1. **Créer et activer l'environnement virtuel :**
    Si vous voulez utiliser un environnement virtuel :
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```

2. **Installer les dépendances :**
    ```bash
    pip install -r requirement.txt
    pip install --no-cache-dir \
    --index-url https://download.pytorch.org/whl/nightly/cpu \
        torch \
        torchvision \
        torchaudio
    ```

3. **Télécharger les modèles Ollama :**
    ```bash
    ollama pull llama3
    ollama pull mxbai-embed-large
    ```

## Démarrer le pojet :

```bash
python3 app.py
```

### Désactiver le venv :
```bash
deactivate
```
