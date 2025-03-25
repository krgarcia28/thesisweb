from flask import Flask
import firebase_admin
from firebase_admin import credentials, firestore

def create_app():
    app = Flask(__name__)

    if not firebase_admin._apps:  # Prevent duplicate initialization
        cred = credentials.Certificate("website/firebase_config.json")
        firebase_admin.initialize_app(cred)

    from .views import main  # Import Blueprint
    app.register_blueprint(main)  # Register Blueprint



    
    return app
