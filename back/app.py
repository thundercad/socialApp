from flask import Flask
from resources.user import blp as UserBluePrint
from resources.artworks import blp as ArtBluePrint
from resources.likes import blp as LikesBluePrint
from resources.comments import blp as CommentsBluePrint
from resources.notifications import blp as  NotificationsBluePrint
from resources.messages import blp as  MessagesBluePrint
from flask_smorest import Api 
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from blocklist import BLOCKLIST
import secrets
app = Flask(__name__)
CORS(app)
app.config["PROPAGATE_EXCEPTIONS"] = True 
app.config["API_TITLE"] = "Rest API"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.3"
app.config["OPENAPI_URL_PREFIX"] = "/"
app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"


app.config["JWT_SECRET_KEY"] = "154281130814958933425240769184967185190"
jwt = JWTManager(app)
api = Api(app)



@jwt.token_in_blocklist_loader
def check_token_in_blocklist(jwt_header, jwt_payload):
    return jwt_payload["jti"] in BLOCKLIST

@jwt.revoked_token_loader
def revoked_token_callback(jwt_header, jwt_payload):
    return (
        {
            "description":"User has been logged out",
            "error": "token_revoked"
        },
        401)
        
api.register_blueprint(UserBluePrint)
api.register_blueprint(ArtBluePrint)
api.register_blueprint(LikesBluePrint)
api.register_blueprint(CommentsBluePrint)
api.register_blueprint(NotificationsBluePrint)
api.register_blueprint(MessagesBluePrint)