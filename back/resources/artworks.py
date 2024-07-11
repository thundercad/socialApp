from flask import Flask, request
from db.artworks import ArtWorks
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from schemas import GetArtSchema, ArtworkSchema,Search
from flask_jwt_extended import jwt_required,get_jwt_identity

blp = Blueprint("Art", __name__, description=":art_work related operations")
@blp.route('/art')

class ArtWork(MethodView):
    def __init__(self):
        self.db = ArtWorks()

    @jwt_required()
    @blp.arguments(GetArtSchema, location="query")
    def get(self, args):
        id = request.args.get("id")
        if id is None:
            result = self.db.get_art_works()
        else:
            result = self.db.get_art_work(id)
        if result is None:
            abort(404, message="Artwork doesn't exist")
        return result


    @jwt_required()
    @blp.response(200, ArtworkSchema)
    @blp.arguments(ArtworkSchema)
    def post(self, req):
        user_id = req.get("u_id")
        title = req.get("title")
        description = req.get("description")
        category = req.get("category")
        image_url = req.get("image")
        self.db.add_art_work(user_id, title, description, category, image_url)
        return {"message": "Artwork added"}, 201

    
    @jwt_required()
    @blp.response(200, GetArtSchema)
    @blp.arguments(GetArtSchema, location="query")
    def delete(self, args):
        user_id=get_jwt_identity()
        art_id = request.args.get("id")
        if self.db.delete_art_work(user_id,art_id):
            return {"message": "Artwork deleted"}
        abort(404, "Given Artwork doesn't exist")



@blp.route('/featuredartworks')
class FetauredArtworks(MethodView):
    def __init__(self):
        self.db=ArtWorks()
        
    def get(self):   
        res=self.db.get_featured_art_works()
        return res
        
@blp.route('/search')
class searchArtworks(MethodView):
    def __init__(self):
        self.db=ArtWorks()
        
    @blp.arguments(Search)
    def get(self,req):   
        key=request.args.get("key")
        res=self.db.search_artworks(key)
        return res
        
    
        
