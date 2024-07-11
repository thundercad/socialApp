import pyodbc

class LikesDataBase:
    def __init__(self):
        self.conn = pyodbc.connect('DRIVER={SQL SERVER};SERVER=DESKTOP-ROAVTRL;DATABASE=artGallery')
        self.cursor = self.conn.cursor()
    
    def get_likes(self):
        res = []
        query = "SELECT * FROM Likes"
        self.cursor.execute(query)
        for row in self.cursor.fetchall():
            like_dict = {
                "like_id": row[0],
                "user_id": row[1],
                "artwork_id": row[2],
                "like_dat": row[3]
            }
            res.append(like_dict)
        return res
    
    def add_like(self, user_id, artwork_id):
        try:
        # Convert user_id to integer
            user_id = int(user_id)
            query = f"EXEC LikeArtwork @user_id={user_id}, @artwork_id={artwork_id}"
            self.cursor.execute(query)
            self.conn.commit()
            print("Like added successfully.")
        except ValueError:
            print("Error: user_id must be an integer.")
        except pyodbc.Error as e:
            print("Error executing query:", e)

    
    
    
    def un_like(self,user_id,artwork_id):
        query=f"EXEC UnlikeArtwork @user_id={user_id}, @artwork_id={artwork_id}"  
        self.cursor.execute(query)
        self.conn.commit()
        
    def get_artwork_likes(self, artwork_id):
        res = []
        query = f"EXEC GetArtworkLikes @artwork_id={artwork_id}"
        self.cursor.execute(query)
        for row in self.cursor.fetchall():
            like_dict = {
                "like_id": row[0],
                "liked_by": row[1],
                "like_date": row[2]
            }
            res.append(like_dict)
        return res
        
    def like_exists(self,user_id,artwork_id):
        print(user_id)
        query=f"Select like_id from Likes Where user_id='{user_id}' AND artwork_id='{artwork_id}'"
        self.cursor.execute(query)
        row=self.cursor.fetchone()
        print(row)
        if row is None:
            return False
        else:
            return row[0]
        