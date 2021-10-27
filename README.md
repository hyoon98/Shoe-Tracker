# Shoe-Tracker

# Images
![image](https://user-images.githubusercontent.com/74113651/139014935-dca815ca-a835-49c5-beb8-3ad0b9b5bd8b.png)


# Running the Project
1. cd into client folder and run `npm install`
2. cd into server folder and set up a virtual environment for python
3. Startup the virtual environemnt and run `pip install -r requirements.txt`
4. Then create a database with the following code:
```
from shoetracker.py import db
db.create_all()
```
5. Start both the client and server by changing directories to each and typing `npm start` and `python shoetracker.py` respectively.
