
from flask import Flask, request, redirect, jsonify
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS, cross_origin

chrome_options = Options()
chrome_options.add_argument("--headless")
driver = webdriver.Chrome(options=chrome_options)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tracker.db'
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
db = SQLAlchemy(app)


def dump_datetime(value):
    if value is None:
        return None
    return [value.strftime("%Y-%m-%d"), value.strftime("%H:%M:%S")]


class Tracker(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(200), nullable=False)
    original_price = db.Column(db.String(5), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    @property
    def serialize(self):
        return{
            'id': self.id,
            'url': self.url,
            'original_price': self.original_price,
            'date_created': dump_datetime(self.date_created)
        }

    def __repr__(self):
        return '<Shoe %r>' % self.id


@app.route('/', methods=['POST', 'GET'])
@cross_origin()
def index():
    if request.method == 'POST':
        url = request.json['url']
        driver.get(url)
        price = driver.find_element_by_xpath(
            "//span[@class='qa-single-price']").text
        new_shoe = Tracker(url=url, original_price=price)
        try:
            db.session.add(new_shoe)
            db.session.commit()
            return redirect('/')
        except:
            return 'There was issue adding task'
    else:
        shoes = Tracker.query.order_by(Tracker.date_created).all()
        shoes = [i.serialize for i in shoes]
        for shoe in shoes:
            driver.get(shoe['url'])
            shoe["shoe_name"] = driver.find_element_by_xpath(
                "//h1[@class='product__name t-level-3 qa-product__name']").text
            shoe['price'] = driver.find_element_by_xpath(
                "//span[@class='qa-single-price']").text
        return jsonify(shoes)


@ app.route('/delete/<int:id>')
@ cross_origin()
def delete(id):
    task_to_delete = Tracker.query.get_or_404(id)

    try:
        db.session.delete(task_to_delete)
        db.session.commit()
        return redirect('/')
    except:
        return 'There was issue deleting task'


if __name__ == "__main__":
    app.run(debug=True)
