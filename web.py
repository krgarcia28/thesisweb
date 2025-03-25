from website import create_app  # Import the create_app function
from flask import Flask, render_template, url_for

app = create_app()  # Initialize Flask app

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)

    
