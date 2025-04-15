from website import create_app  # Import the create_app function
from flask import render_template

app = create_app()  # Initialize Flask app

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


    
app.config['SECRET_KEY'] = 'forthesisproject'