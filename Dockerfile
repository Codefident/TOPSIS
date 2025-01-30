# Użyj obrazu z Pythonem
FROM python:3.11

# Ustaw katalog roboczy
WORKDIR /app

# Skopiowanie plików aplikacji
COPY . .

# Instalacja zależności (bez venv)
RUN pip install -r requirements.txt

# Eksponowanie portu
EXPOSE 21370

# Uruchomienie aplikacji Flask
CMD ["python", "app.py"]
