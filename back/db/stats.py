import pyodbc

class stats:
    def __init__(self):
        self.conn = pyodbc.connect('DRIVER={SQL SERVER};SERVER=DESKTOP-ROAVTRL;DATABASE=artGallery;')
        self.cursor = self.conn.cursor()
    
    def getStats(self, uid):
        res = []
        
        # Total posts by the user
        query = f"SELECT COUNT(*) AS total_posts FROM Artworks WHERE user_id = ?"
        self.cursor.execute(query, uid)
        for row in self.cursor.fetchall():
            res.append(row[0])
        
        # Total likes received by the user
        query = f"""
            SELECT COUNT(like_id) AS total_likes
            FROM Likes
            WHERE user_id = ?
        """
        self.cursor.execute(query, uid)
        for row in self.cursor.fetchall():
            res.append(row[0])
        
        # Total comments received by the user
        query = f"""
            SELECT COUNT(comment_id) AS total_comments
            FROM Forum_Comments
            WHERE user_id = ?
        """
        self.cursor.execute(query, uid)
        for row in self.cursor.fetchall():
            res.append(row[0])
            
        # Total likes given by the user
        query = f"""
            SELECT COUNT(like_id) AS total_likes_given
            FROM Likes
            WHERE user_id = ?
        """
        self.cursor.execute(query, uid)
        for row in self.cursor.fetchall():
            res.append(row[0])
        
        return res

obj = stats()
print(obj.getStats(1))
