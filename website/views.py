import firebase_admin
from firebase_admin import credentials, auth, firestore
from flask import Blueprint, render_template, request, jsonify

# Initialize Firebase
if not firebase_admin._apps:
    cred = credentials.Certificate("website/firebase_config.json")
    firebase_admin.initialize_app(cred)

db = firestore.client()
main = Blueprint('main', __name__)

@main.route('/')
def home():
    return render_template('index.html')


@main.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"message": "Invalid request format"}), 400

    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"message": "Email is required"}), 400

    try:
        # Fetch user from Firestore
        user_query = db.collection("user").where("email", "==", email).stream()
        user = None

        for doc in user_query:
            user = doc.to_dict()

        if user:
            role = user.get("role", "user")
            print(f"✅ User Role Retrieved: {role}")  # Debug Role
            print(f"✅ User found: {user}")  # ✅ Debugging role
            return jsonify({
                "message": "Login successful!",
                "user": {
                    "name": user["name"],
                    "email": user["email"],
                    "role": role  # Default role = "user"
                }
            }), 200
        else:
            return jsonify({"message": "⚠️ User not found. Please check your email."}), 401

    except Exception as e:
        return jsonify({"message": f"⚠️ Error: {str(e)}"}), 400



@main.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    student_number = data.get('studentnumber')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'user')  # Default role is "user"

    if not name or not student_number or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    try:
        # Check if email is already registered
        user_query = db.collection("users").where("email", "==", email).stream()
        if any(user_query):
            return jsonify({"message": "Email already registered"}), 400

        # Create user in Firebase Authentication
        user = auth.create_user(email=email, password=password, display_name=name)

        # Store additional user info in Firestore
        db.collection("users").document(user.uid).set({
            "name": name,
            "student_number": student_number,
            "email": email,
            "uid": user.uid,
            "createdAt": firestore.SERVER_TIMESTAMP,
            "role": role,  # Assign role
            "points": 0
        })

        return jsonify({"message": f"User {name} registered successfully!", "uid": user.uid}), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 400


@main.route('/users')
def users():
    return render_template('user.html')

@main.route('/admin')
def admin():
    return render_template('admin.html')











