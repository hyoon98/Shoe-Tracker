
import requests
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
print(shoes)
