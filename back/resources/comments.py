from flask import Flask,request,jsonify
from db.comments import CommentsDataBase
from flask.views import MethodView
from flask_smorest import Blueprint,abort
from schemas import ForumCommentSchema
from flask_jwt_extended import jwt_required,get_jwt_identity

blp=Blueprint("comments",__name__,description=":comment realted operations")
@blp.route("/comments")

class Comments(MethodView):
    
    def __init__(self):
        self.db=CommentsDataBase()
   
        #jwt_required()
    @blp.arguments(ForumCommentSchema,location="query")
    def get(self, req):
        artwork_id = request.args.get("id")
        res = self.db.get_comments(artwork_id)
        if res:
            return jsonify({"comments": res}), 200
        else:
            return jsonify({"message": "No comments found"}), 404
        

      
    
    #@jwt_required
    @blp.arguments(ForumCommentSchema,location="query")
    def post(self, obj):
        print(obj)
        user_id = request.args.get("u_id")  # Retrieve URL parameter u_id
        artwork_id = request.args.get("id")  # Retrieve URL parameter id
        comment_data = request.json
        comment_text = comment_data.get("comment_text")
        self.db.add_comment(user_id, artwork_id,comment_text)
        return jsonify({"message": "comment added successfully"})


        
    #jwt_required()
    @blp.response(200,ForumCommentSchema)
    @blp.arguments(ForumCommentSchema)
    def delete(self,args):
        
        self.db.delete_comment()
