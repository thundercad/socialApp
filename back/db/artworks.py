import pyodbc


class ArtWorks:
    # Constructor
    def __init__(self):
        self.conn = pyodbc.connect('DRIVER={SQL SERVER};SERVER=DESKTOP-ROAVTRL;DATABASE=artGallery')
        self.cursor = self.conn.cursor()

    # 1) Adds an artwork for the user
    def add_art_work(self, user_id, title, description, category, image_url):
        query = f"INSERT INTO artworks (user_id, title, description, category, image_url) " \
            f"VALUES ({user_id}, '{title}', '{description}', '{category}', '{image_url}')"
        try:
            self.cursor.execute(query)
            self.conn.commit()
            print("Committed")
            return True
        except pyodbc.Error as ex:
            print("Error:", ex)
            return False

    # 2) Gets all the artworks
    def get_art_works(self):
        res = []
        query = "SELECT * FROM Artworks"
        self.cursor.execute(query)
        for row in self.cursor.fetchall():
            user_dict = {
                "user_id": row[1],
                "art_workid":row[0],
                "title": row[2],  # Adjust index to match the title value
                "description": row[3],  # Adjust index to match the description value
                "category": row[4],  # Adjust index to match the category value
                "image_url": row[6]  # Adjust index to match the image_url value
            }
            res.append(user_dict)
        return res

    # 3) Gets the artworks of a specific user
    def get_art_work(self, user_id):
        query = f"SELECT * FROM Artworks WHERE user_id = {user_id}"  # Assuming table name is Artworks
        self.cursor.execute(query)
        artworks = []
        for row in self.cursor.fetchall():
            artwork_dict = {
            "user_id": row[0],
            "title": row[1],
            "description": row[2],
            "category": row[3],
            "image_url": row[6]
        }
        artworks.append(artwork_dict)
        return artworks



    # 4) Verifies the user id and deletes the artwork
    def delete_art_work(self, art_work_id, user_id):
        query = f"EXEC DeleteUser @artwork_id = {art_work_id}, @user_id = {user_id}"
        self.cursor.execute(query)
        self.conn.commit()  # Commit changes to the database

    # Returns the featured art works
    def get_featured_art_works(self):
        query = "EXEC GetFeaturedArtworks;"
        self.cursor.execute(query)
        res = []
        for row in self.cursor.fetchall():
            user_dict = {
                "featured_id": row[0],
                "title": row[1],
                "url": row[2],
            }
            res.append(user_dict)
        return res


    def search_artworks(self, keyword):
        print(keyword)
        res = []
        query = f"EXEC SearchArtworks @keyword = '{keyword}';"
        self.cursor.execute(query)
        for row in self.cursor.fetchall():
                artwork_dict = {
                    "user_id": row[1],
                    "title": row[2],
                    "description": row[3],
                    "category": row[4],
                    "image_url": row[6]
                }
                res.append(artwork_dict)
        return res

