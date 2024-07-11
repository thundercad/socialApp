from flask import Flask, request
from db.user import UserDatabase
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from schemas import UserSchema, UserLoginSchema, UserDeleteSchema, UserGetSchema,updateUserSchema
import hashlib
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from flask_jwt_extended import jwt_required,get_jwt_identity,get_jwt_header
from blocklist import BLOCKLIST
import base64

blp = Blueprint("Users", __name__, description="User related operations")


@blp.route('/login')
class UserLogin(MethodView):
    def __init__(self):
        self.db = UserDatabase()

    @blp.arguments(UserLoginSchema)
    def post(self, req):
        username = req["username"]
        password = hashlib.sha256(req["password"].encode('utf-8')).hexdigest()
        if self.db.checkExistance(username, password):
            access_token = create_access_token(identity=self.db.checkExistance(username, password))
            return {"access_token": access_token}
        else:
            abort(400, message="Username or password is incorrect")


@blp.route('/logout')
class UserLogOut(MethodView):
    @jwt_required()
    def post(self):
        jti = get_jwt()["jti"]
        BLOCKLIST.add(jti)
        return {'message': "Successfully logged out."}


@blp.route("/signup")
class UserAPI(MethodView):
    def __init__(self):
        self.db = UserDatabase()

    # GET METHOD to get a user
    @blp.arguments(UserGetSchema, location="query")
    def get(self, args):
        id = request.args.get('id')
        result = self.db.get_user(id)
        if result is None:
            abort(404, message="User doesn't exist")
        return result

    # POST METHOD to add a user
    @blp.arguments(UserSchema)
    def post(self, req):
        username = req["username"]
        email = req["email"]
        bio = req["bio"]
        password = hashlib.sha256(req["password"].encode('utf-8')).hexdigest()  # the passcode is hashed
        with open("C:\\Users\\Lenovo\\Desktop\\assdsadsdsda\\frontend\\src\\assets\\images\\default.jpg", "rb") as img_file:
            encodedimg = base64.b64encode(img_file.read()).decode('utf-8')
        if self.db.add_user(username, password, email, "default", bio, encodedimg):
            access_token = create_access_token(identity=username)
            return {"message": "User added", "access_token": access_token}, 201
        return abort(403, message='User already exists')



    # DELETE METHOD to delete a user
    @blp.arguments(UserDeleteSchema, location="query")
    def delete(self, args):
        id = request.args.get("id")
        if self.db.delete_user(id):
            return {"message": "User Deleted"}
        else:
            abort(404, message="User doesn't exist")


@blp.route("/stats")
class Sats(MethodView):
    def __init__(self):
        self.db = UserDatabase()

    # GET METHOD to get a user
    @blp.arguments(UserGetSchema, location="query")
    def get(self, args):
        id = request.args.get('id')
        result = self.db.getStats(id)
        return result


@blp.route("/update")
class UserUpdate(MethodView):
        def __init__(self):
            self.db = UserDatabase()

        @blp.arguments(updateUserSchema)
        def put(self, req):
            prevdata = self.db.get_user(6)
            print(prevdata)
            username = req.get("username", prevdata.get("username"))
            email = req.get("email", prevdata.get("email"))
            accounttype = req.get("account_type", prevdata.get("account_type"))
            bio = req.get("bio", prevdata.get("bio"))
            profilepic = req.get("profile_picture", prevdata.get("profile_picture"))
            old_password = req.get("old_password")  # Get the old password from the request
        # Additional validation or checks can be implemented here if needed
            self.db.update_user(6, username, email, accounttype, bio, profilepic)
        
            # if old_password:  # If old password is provided, verify it before updating
            #     hashed_old_password = hashlib.sha256(old_password.encode('utf-8')).hexdigest()
            # if not self.db.check_password(6, hashed_old_password):  # Check if old password matches
            #     abort(403, message="Old password is incorrect")

            # if self.db.update_user(6, username, email, accounttype, bio, profilepic):
            #     return {"message": "User updated successfully"}
            # else:
            #     abort(404, message="User not found or unable to update")