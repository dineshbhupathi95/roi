#

from fastapi import FastAPI,Request
# from typing import
import uvicorn

app = FastAPI()

users = [{"id":0,"name": "user1", "email":"user1@domain.com"},]

@app.post('/register')
async def create_user(request:Request):
    res = await request.json()
    cur_users_count = len(users)
    new_user = {
        "id":cur_users_count+1,
        "name": res.get('name'),
        "email": res.get('email')
    }
    users.append(new_user)
    return users

@app.get('/user/')
async def user_with_id(id:int):
    for i in users:
        if i.get('id') == id:
            return i
        else:
            return "No user Found"


if __name__ == "__main__":
    uvicorn.run(app)


