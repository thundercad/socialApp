import pyodbc
class Favorites:
    def __init__(self):
        self.conn = pyodbc.connect('DRIVER={SQL SERVER};SERVER=DESKTOP-ROAVTRL;DATABASE=artGallery;')
        self.cursor = self.conn.cursor()
        
    def add_favorite(self, user_id, artwork_id):
        query = f"EXEC FavrouiteArtwork @user_id={user_id},@artwork_id={artwork_id} "
        self.cursor.execute(query)
        self.conn.commit()  # Commit changes to the database
    
    def get_favorites(self):
        res = []
        query = "SELECT * FROM Favorites"
        self.cursor.execute(query)
        for row in self.cursor.fetchall():
            favorite_dict = {
                "favorite_id": row[0],
                "user_id": row[1],
                "artwork_id": row[2],
                "favorite_date": row[3]
            }
            res.append(favorite_dict)
        return res
    
    def get_user_favorites(self, user_id):
        res = []
        query = f"SELECT * FROM Favorites WHERE user_id = {user_id}"
        self.cursor.execute(query)
        for row in self.cursor.fetchall():
            favorite_dict = {
                "favorite_id": row[0],
                "user_id": row[1],
                "artwork_id": row[2],
                "favorite_date": row[3]
            }
            res.append(favorite_dict)
        return res
    
    def un_favorite(self, user_id,artwork_id):
        query = f"EXEC UnfavoriteArtwork @user_id={user_id},@artwork_id={artwork_id} "
        self.cursor.execute(query)
        self.conn.commit()  # Commit changes to the database
    
