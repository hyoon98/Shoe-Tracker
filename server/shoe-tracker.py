
import requests
from flask import Flask
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument("--headless")
driver = webdriver.Chrome(options=chrome_options)

urls = []
shoes = []

urls.append(
    "https://www.mec.ca/en/product/6012-564/Boostic-Rock-Shoes?colour=BK135")

urls.append(
    "https://www.mec.ca/en/product/5058-437/Diabola-Rock-Shoes?colour=OBB00"
)

for url in urls:
    driver.get(url)
    shoe = driver.find_element_by_xpath(
        "//h1[@class='product__name t-level-3 qa-product__name']").text
    price = driver.find_element_by_xpath(
        "//span[@class='qa-single-price']").text
    shoes.append({"shoe": shoe, "price": price})

app=Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        task_content = request.form['content']
        new_task = Todo(content=task_content)
        try:
            db.session.add(new_task)
            db.session.commit()
            return redirect('/')
        except:
            return 'There was issue adding task'
    else:
        tasks = Todo.query.order_by(Todo.date_created).all()
        return (render_template('index.html', tasks=tasks))


@app.route('/delete/<int:id>')
def delete(id):
    task_to_delete = Todo.query.get_or_404(id)

    try:
        db.session.delete(task_to_delete)
        db.session.commit()
        return redirect('/')
    except:
        return 'There was issue deleting task'

if __name__=="__main__":
    app.run(debug=True)