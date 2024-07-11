import hashlib
from flask import Flask,request
from flask.views import MethodView
from db.messages import MessageDatabase
from schemas import DiscussionForumSchema
from flask_smorest import Blueprint,abort

blp=Blueprint("Forum",__name__,description=":messages realted operations")

@blp.route("/forum")
class MessageAPI(MethodView):
    def __init__(self):
        self.db = MessageDatabase()

    @blp.arguments(DiscussionForumSchema)  # Assuming you have a MessageSchema defined
    def post(self, req):
        print(req)
        user_id = req.get("user_id")
        topic = req.get("topic")
        content = req.get("content")
        reply_to = req.get("reply_to")  # Optionally, check if reply_to is provided

        # Call the add_message function from your UserDatabase class
        if self.db.add_message(user_id, topic, content, reply_to):
            return {"message": "Message added"}, 201
        else:
            abort(403, message='Failed to add message')

    @blp.arguments(DiscussionForumSchema)  # Assuming you have a MessageSchema defined
    def get(self,req):
        # Fetch discussions from the database
        discussions = self.db.get_discussion()
        if discussions:
            return discussions
        else:
            abort(404, message='No discussions found')