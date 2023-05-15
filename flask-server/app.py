import flask
from flask import Flask, request, jsonify, render_template, redirect, send_file, url_for
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from passlib.hash import pbkdf2_sha256
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
import json
from werkzeug.utils import secure_filename
import io
import base64
import hashlib
from datetime import datetime
import os


app = Flask(__name__)
app.config.from_pyfile('config.py')
db = SQLAlchemy(app)
app.config['SECRET_KEY'] = 'secretkey'
app.app_context().push()

login_manager = LoginManager(app)

#---------------- Models ----------------#
class User(UserMixin, db.Model):
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    _password = Column(String, nullable=False)

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, plaintext):
        self._password = pbkdf2_sha256.hash(plaintext)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class Notary(db.Model, UserMixin):

    id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    _password = Column(String, nullable=False)

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, plaintext):
        self._password = pbkdf2_sha256.hash(plaintext)

@login_manager.user_loader
def load_user(user_id):
    return Notary.query.get(int(user_id))

class Document(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(150))
    description = Column(String(150))
    filename = Column(String(150))  # New field to store the original filename
    file_data = Column(db.LargeBinary)
    file_extension = Column(String(5))  # Store the file extension
    hash_value = Column(String(64), nullable=False)  # SHA256 hash of the file
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    notary_id = Column(Integer, ForeignKey('notary.id'), nullable=False)

class Notary_Form(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    firstname = Column(String, nullable=False)
    lastname = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(Integer, nullable=False)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    zip = Column(String, nullable=False)
    type = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    witnesses = Column(String, nullable=False)
    additional = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('user.id'))



#---------------- Routes ----------------#

@app.route("/signup", methods=["POST"])
def signup():
    user_data = flask.request.get_json()
    required_fields = ["full_name", "email", "password"]
    for field in required_fields:
        if field not in user_data:
            flask.abort(400, description=f"{field} cannot be blank.")
    
    user = User()
    user.full_name = user_data["full_name"]
    user.email = user_data["email"]
    user.password = user_data["password"]

    db.session.add(user)
    db.session.commit()

    login_user(user)

    return flask.jsonify(
        {
            "full_name": user.full_name,
            "email": user.email,
        }
    )

@app.route("/login", methods=["POST"])
def login():
    login_data = flask.request.get_json()
    required_fields = ["email", "password"]
    for field in required_fields:
        if field not in login_data:
            flask.abort(400, description=f"{field} cannot be blank.")

    user = User.query.filter_by(email=login_data["email"]).one()
    if not user:
        flask.abort(401, description=f"Incorrect email or password.")
    is_correct_password = pbkdf2_sha256.verify(login_data["password"], user.password)
    if not is_correct_password:
        flask.abort(401, description=f"Incorrect email or password.")

    login_user(user)
    return flask.jsonify(
        {
            "full_name": user.full_name,
            "email": user.email,
        }
    )

@app.route("/NotaryLogin", methods=["POST"])
def notary_login():
    login_data = flask.request.get_json()
    required_fields = ["email", "password"]
    for field in required_fields:
        if field not in login_data:
            flask.abort(400, description=f"{field} cannot be blank.")

    user = Notary.query.filter_by(email=login_data["email"]).one()
    if not user:
        flask.abort(401, description=f"Incorrect email or password.")
    is_correct_password = pbkdf2_sha256.verify(login_data["password"], user.password)
    if not is_correct_password:
        flask.abort(401, description=f"Incorrect email or password.")

    login_user(Notary)
    return flask.jsonify(
        {
            "full_name": user.full_name,
            "email": user.email,
        }
    )

@app.route("/NotarySignup", methods=["POST"])
def notary_signup():
    user_data = flask.request.get_json()
    required_fields = ["full_name", "email", "password"]
    for field in required_fields:
        if field not in user_data:
            flask.abort(400, description=f"{field} cannot be blank.")
    
    user = Notary()
    user.full_name = user_data["full_name"]
    user.email = user_data["email"]
    user.password = user_data["password"]

    db.session.add(Notary)
    db.session.commit()

    login_user(Notary)

    return flask.jsonify(
        {
            "full_name": user.full_name,
            "email": user.email,
        }
    )

# User Dashboard
@app.route('/dashboard')
# @login_required
def dashboard():
    # Fetch user's documents and notary forms
    documents = Document.query.filter_by(user_id=current_user.id).all()
    notary_forms = Notary_Form.query.filter_by(user_id=current_user.id).all()

    # Convert binary data to base64 for rendering in HTML
    for doc in documents:
        if doc.file:  # Check if there is a file
            doc.file = base64.b64encode(doc.file).decode("utf-8")

    return render_template('dashboard.html', documents=documents, notary_forms=notary_forms)

@app.route('/form', methods=['POST'])
# @login_required  
def form():
    if request.method == 'POST':
        # Parse date and time
        date_string = request.json.get('date')
        time_string = request.json.get('time')
        try:
            date = datetime.strptime(date_string, "%Y-%m-%d").date()  # Adjust the format string as needed
            time = datetime.strptime(time_string, "%H:%M:%S").time()  # Adjust the format string as needed
        except ValueError:
            return jsonify(message='Invalid date or time format'), 400

        # Process the form and create a new Notary_Form
        notary_form = Notary_Form(
            firstname=request.json.get('firstname'),
            lastname=request.json.get('lastname'),
            email=request.json.get('email'),
            phone=request.json.get('phone'),
            address=request.json.get('address'),
            city=request.json.get('city'),
            state=request.json.get('state'),
            zip=request.json.get('zip'),
            type=request.json.get('type'),
            date=date,
            time=time,
            witnesses=request.json.get('witnesses'),
            additional=request.json.get('additional'),
            user_id=current_user.id,
        )
        db.session.add(notary_form)
        db.session.commit()
        return jsonify(message='Notary form submitted successfully')

    return jsonify(message='Invalid request'), 400




def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



import hashlib

@app.route('/upload', methods=['POST'])
# @login_required
def upload():
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify(message='No file part in the request'), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify(message='No file selected'), 400

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            extension = filename.rsplit('.', 1)[1].lower()
            file_data = file.read()

            document = Document(
                title=filename,
                description="Uploaded file",
                filename=filename,
                file_data=file_data,
                file_extension=extension,
                hash_value=hashlib.sha256(file_data).hexdigest(),
                user_id=current_user.id
            )
            db.session.add(document)
            db.session.commit()
            return jsonify(message='File uploaded successfully')

    return jsonify(message='Invalid request'), 400


@app.route('/file/<int:file_id>')
# @login_required
def serve_file(file_id):
    document = Document.query.get(file_id)
    if not document or document.user_id != current_user.id:
        return jsonify(message='File not found'), 404

    return send_file(
        io.BytesIO(document.file_data),
        mimetype='image/' + document.file_extension,
        as_attachment=True,
        attachment_filename=document.filename
    )

@app.route('/documents', methods=['GET'])
# @login_required
def get_user_documents():
    documents = Document.query.filter_by(user_id=current_user.id).all()
    response = []

    for doc in documents:
        document_data = {
            "id": doc.id,
            "title": doc.title,
            "description": doc.description,
            "filename": doc.filename
            # Include any other relevant fields from your Document model
        }
        response.append(document_data)

    return jsonify(response)

@app.route('/schedule')
# @login_required
def schedule():
    return redirect("https://calendly.com/singhnotariesdotcom")


"""
@blueprint.route("/logout", methods=["POST"])
@flask_login.login_required
def logout():
    flask_login.logout_user()
    return {}


@login_manager.login_manager.user_loader
def load_user(user_id):
    return database.db.session.get(User, int(user_id))
"""
# import stripe
# stripe.api_key = 'sk_test_51N6Q8tAaJk6jpItY0aIs34Zg3gANNVQUZNidxm05Vsc04QsBvDHxwABRx14vjWLH1rYKTcnWmIzLD5SRVdqCWrky00rlsbNxYJ'
     
@app.route('/pay', methods=['POST'])
def pay():
    try:
        data = json.loads(request.data)
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=2500,
            currency='usd',
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403



if __name__ == "__main__":
    db.create_all()
    app.run(port=8080, debug=True)

    