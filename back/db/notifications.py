import pyodbc

class NotificationsDataBase:
    def __init__(self):
        self.conn = pyodbc.connect('DRIVER={SQL SERVER};SERVER=DESKTOP-ROAVTRL;DATABASE=artGallery;')
        self.cursor = self.conn.cursor()
    
    def get_notifications(self,u_id):
        query=f"select * From Notifications Where user_id={u_id}"
        self.cursor.execute(query)
        res=[]
        for rows in self.cursor.fetchall():
            notifi_dic={
                'n_id':rows[0],
                'u_id':rows[1],
                'n_text':rows[2],
                'n_date':rows[3],
                'read':rows[4]
            }
            res.append(notifi_dic)
        return res
    
    def remove_notification(self,notification_id,user_id):
        query=f"select * From Notifications Where user_id={user_id} AND notification_id={notification_id}"
        self.cursor.execute(query)
        self.conn.commit()
    
    def notification_exists(self,user_id,notify_id):
        query=f"select notification_id form Notifications Where user_id={user_id} AND artwork_id={notify_id}"
        self.cursor.execute(query)
        row=self.cursor.fetchone()
        if row is None:
            return False
        else:
            return row[0]
        
