from flask import  request, jsonify
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from db.notifications import NotificationsDataBase
from flask_jwt_extended import jwt_required,get_jwt_identity
blp=Blueprint("User Notifications",__name__,description=":Like realted operations")
@blp.route("/notifications")

class Notifications(MethodView):
    
    def __init__(self):
        self.db=NotificationsDataBase()
    
    #@jwt_required()
    def get(self):
        user_id=request.args.get("id")
        res=self.db.get_notifications(user_id)
        if res is None:
            abort(404,message="This user doest have any notifications")
        else:
            return res
        

    @jwt_required()
    def delete(self, args):
        notification_id = request.args.get("id")
        user_id=get_jwt_identity()
        if self.db.notification_exists(user_id,notification_id):
                self.db.remove_notification(user_id,notification_id)
                return jsonify({"message": "deleted successfully"})
        else:
                abort(404,"No notifications")
            
