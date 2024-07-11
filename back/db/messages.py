import pyodbc
class MessageDatabase:
    def __init__(self):
        self.conn = pyodbc.connect('DRIVER={SQL SERVER};SERVER=DESKTOP-ROAVTRL;DATABASE=artGallery;')
        self.cursor = self.conn.cursor()
      
      
    def add_message(self, user_id, topic, content, reply_to=None):
    # Check if user_id is None
        if user_id is None:
            print("Error: user_id cannot be None")
            return False

    # Convert user_id to int
        user_id = int(user_id)

    # Convert reply_to to SQL NULL if None
        reply_to_sql = "NULL" if reply_to is None else reply_to

        query = f"EXEC InsertDiscussion @user_id = {user_id}, @topic = '{topic}', \
        @content = '{content}', @reply_to = {reply_to_sql};"
        try:
            self.cursor.execute(query)
            self.conn.commit()  # Commit changes to the database
            return True
        except pyodbc.Error as e:
            # Handle any errors that occur during execution
            print(f"Error adding message: {e}")
            return False



        
    def get_discussion(self):
        try:
            self.cursor.execute("SELECT * FROM DiscussionForum")
            rows = self.cursor.fetchall()
            # Display the discussions
            res=[]
            for row in rows:
                dict={
                "Discussion ID": row[0],
                "User ID": row[1],
                "Topic": row[2],
                "Content": row[3],
                "Post Date": row[4],
                "Reply To":row[5]
                }
                res.append(dict)
            return res
        except pyodbc.Error as e:
            print(f"Error fetching discussions: {e}")