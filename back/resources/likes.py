from flask import Flask, request, jsonify
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from db.likes import LikesDataBase
from schemas import GetLikesSchema
from schemas import AddLikesSchema
from flask_jwt_extended import jwt_required,get_jwt_identity,get_jwt_header
blp=Blueprint("Likes",__name__,description=":Like realted operations")
@blp.route("/like")

class Likes(MethodView):
    
    def __init__(self):
        self.db=LikesDataBase()
    
    #@jwt_required()
    @blp.arguments(GetLikesSchema,location="query")
    def get(self,args):
        post_id=request.args.get('id')
        res=self.db.get_artwork_likes(post_id)
        if res is None:
            abort(404,message="This post doest have any likes")
        else:
            response_size = len(res)
            return jsonify({"data": res, "size": response_size})
        
    #@jwt_required()
    @blp.arguments(AddLikesSchema,location="query")
    def post(self,args):
        post_id = request.args.get("id")
        user_id=request.args.get("u_id")
        # Add the like to the post
        if self.db.like_exists(user_id,post_id):
            abort(404,"Like already exists")
        else:
            self.db.add_like(user_id,post_id)
        return jsonify({"message": "Like added successfully"})

    #@jwt_required()
    @blp.arguments(AddLikesSchema,location="query")
    def delete(self, args):
        post_id = request.args.get("id")
        user_id=request.args.get("u_id")
        #user_id=get_jwt_identity()
        if self.db.like_exists(user_id,post_id):
                self.db.un_like(user_id,post_id)
                return jsonify({"message": "unliked successfully"})
        else:
                abort(404,"Post not likes")
            
