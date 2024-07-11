from marshmallow import Schema,fields

class UserSchema(Schema):
    username = fields.Str(required=True)
    email = fields.Str()
    password = fields.Str(required=True, load_only=True)
    account_type = fields.Str()
    bio = fields.Str()
    profilepic = fields.Str()
    
class updateUserSchema(Schema):
    user_id = fields.Str()
    username = fields.Str()
    email = fields.Str()
    password = fields.Str()
    account_type = fields.Str()
    bio = fields.Str()
    profilepic = fields.Str()
    

class UserGetSchema(Schema):
    id=fields.Int()

class UserDeleteSchema(Schema):
    id=fields.Int()
    
class GetArtSchema(Schema):
    id=fields.Int()

class ForumCommentSchema(Schema):
    comment_id = fields.Int(dump_only=True)
    u_id = fields.Int()
    id = fields.Int(required=True)
    comment_date = fields.DateTime(dump_only=True)

class getArtSchema(Schema):
    artwork_id = fields.Int(dump_only=True)

class ArtworkSchema(Schema):
    u_id = fields.Int()
    title = fields.Str(required=True)
    description = fields.Str()
    category = fields.Str()
    image = fields.Str()  # Use Raw field for binary data
    edit_date = fields.DateTime(format='%Y-%m-%d %H:%M:%S', dump_only=True)



class LikeSchema(Schema):
    like_id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    artwork_id = fields.Int(required=True)
    like_date = fields.DateTime(format='%Y-%m-%d %H:%M:%S', dump_only=True)

class GetLikesSchema(Schema):
    post_id=fields.Int(dump_only=True)
    
class AddLikesSchema(Schema):
    post_id=fields.Int(dump_only=True)

class FavoriteSchema(Schema):
    favorite_id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    artwork_id = fields.Int(required=True)
    favorite_date = fields.DateTime(format='%Y-%m-%d %H:%M:%S', dump_only=True)


class NotificationSchema(Schema):
    notification_id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    notification_text = fields.Str()
    notification_date = fields.DateTime(format='%Y-%m-%d %H:%M:%S', dump_only=True)
    read_status = fields.Boolean(default=False)

class DiscussionForumSchema(Schema):
    discussion_id = fields.Int()
    user_id = fields.Int()
    topic = fields.Str()
    content = fields.Str()
    post_date = fields.DateTime(format='%Y-%m-%d %H:%M:%S', dump_only=True)
    reply_to = fields.Int()

class UserLoginSchema(Schema):
     username = fields.Str(required=True)
     password = fields.Str(required=True, load_only=True)
     
class Search(Schema):
     key= fields.Str()

