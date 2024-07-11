import pyodbc
class UserDatabase:
    def __init__(self):
        self.conn = pyodbc.connect('DRIVER={SQL SERVER};SERVER=DESKTOP-ROAVTRL;DATABASE=artGallery')
        self.cursor = self.conn.cursor()
      
    #adds the users  
    def add_user(self, username, password, email, account_type, bio, profile_picture):
        query = """
        INSERT INTO Users (username, password, email, account_type, bio, profile_picture)
        VALUES (?, ?, ?, ?, ?, ?);
        """
        # Execute the query with parameters
        self.cursor.execute(query, (username, password, email, account_type, bio, profile_picture))
        self.conn.commit()  # Commit changes to the database



    #gets a specefic user
    def get_user(self, user_id):
        user_id=int(user_id)
        query = f"SELECT * FROM Users WHERE user_id = {user_id}"
        self.cursor.execute(query)
        row = self.cursor.fetchone()
        user_dict = {}
        if row:
            user_dict = {
            "user_id": row[0],
            "username": row[1],
            "email": row[2],
            "password": row[3],
            "account_type": row[4],
            "bio": row[5],
            "profilepic": row[6],
            "online_status": row[7]
            }
            return user_dict
        else:
            return None  

    #deletes a user
    def delete_user(self, user_id):
        user_id = int(user_id)
        query = f"EXEC DeleteUser @user_id = {user_id}"
        print("Executing delete query:", query)  # Debug statement: Print the delete query
        self.cursor.execute(query)
        self.conn.commit()  # Commit after checking rowcount
        return True
    
    #check the existence the a user in the data base 
    def checkExistance(self,username,password):
        query=f"select user_id from Users Where username='{username}' AND password='{password}'"
        self.cursor.execute(query)
        row=self.cursor.fetchone()
        if row is None:
            return False
        else:
            return row[0]


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
    
    
    def check_password(self, user_id, hashed_password):
        query = f"SELECT password FROM Users WHERE user_id = '{user_id}'"
        try:
            self.cursor.execute(query)
            row = self.cursor.fetchone()
            if row:
                stored_password = row[0]
                return hashed_password == stored_password
            else:
                return False  # User not found
        except Exception as e:
            print(f"Error checking password: {e}")
            return False
        
    def updatePic(self,user_id,profile_pic):
        query = f"UPDATE Users SET profile_picture = ? WHERE user_id = ?"
        self.cursor.execute(query)
        

        