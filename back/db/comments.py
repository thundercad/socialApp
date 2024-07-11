import pyodbc
class CommentsDataBase:
    def __init__(self):
        self.conn = pyodbc.connect('DRIVER={SQL SERVER};SERVER=DESKTOP-ROAVTRL;DATABASE=artGallery;')
        self.cursor = self.conn.cursor()
    
    def get_comments(self,artwork_id):
        artwork_id=int(artwork_id)
        res = []
        query = f"SELECT * FROM Forum_Comments WHERE artwork_id = '{artwork_id}'"
        self.cursor.execute(query)
        for row in self.cursor.fetchall():
            commnet_dict = {
                "user_id": row[1],
                "comment_text": row[3],
                "comment_date":row[4],
            }
            res.append(commnet_dict)
        return res
        
    
    
    def add_comment(self,user_id,art_work_id,text):
        user_id = int(user_id)
        art_work_id = int(art_work_id)
        print(text)
        query = f"EXEC AddCommentToArtwork @user_id= '{user_id}' , @artwork_id='{art_work_id}',@comment_text='{text}'"
        self.cursor.execute(query)
        self.conn.commit()  # Commit changes to the database
        
    def delete_comment(self,comment_id):
        query=f"EXEC DeleteComment @comment={comment_id}"
        