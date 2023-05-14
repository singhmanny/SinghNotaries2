import flask
from flask import Flask, request, jsonify
from flask_login import LoginManager, UserMixin, login_user, login_required
from passlib.hash import pbkdf2_sha256
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.hybrid import hybrid_property
import json
app = Flask(__name__)
app.config.from_pyfile('config.py')
db = SQLAlchemy(app)
app.config['SECRET_KEY'] = 'secretkey'
app.app_context().push()

login_manager = LoginManager(app)

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

    