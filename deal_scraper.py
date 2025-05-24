
import datetime

def fetch_deals():
    # Placeholder deals (real scraper will replace this)
    return [
        {
            "title": "boAt Airdopes 181",
            "price": "₹899",
            "original": "₹2,499",
            "link": "https://www.amazon.in/dp/B09PVXHGNZ?tag=pranayloots-21",
            "source": "Amazon",
        },
        {
            "title": "Flipkart SmartBuy Charger",
            "price": "₹249",
            "original": "₹799",
            "link": "https://www.flipkart.com/item/p/itm123?affid=pranayloots",
            "source": "Flipkart",
        }
    ]

def generate_html(deals):
    html = f"""<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>PRANAY LOOTS AND DEALS</title>
  <style>
    body {{ font-family: sans-serif; background: #f0f2f5; padding: 20px; }}
    .deal {{ background: white; margin: 20px auto; max-width: 500px; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
    a {{ text-decoration: none; color: white; background: #4f46e5; padding: 10px 15px; border-radius: 5px; }}
  </style>
</head>
<body>
  <h1>PRANAY LOOTS AND DEALS</h1>
  <p>Last Updated: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
"""
    for deal in deals:
        html += f"""
  <div class='deal'>
    <h2>{deal['title']}</h2>
    <p><strike>{deal['original']}</strike> <strong>{deal['price']}</strong></p>
    <p>Source: {deal['source']}</p>
    <a href="{deal['link']}" target="_blank">Grab Deal</a>
  </div>"""
    html += "</body></html>"
    return html

if __name__ == "__main__":
    deals = fetch_deals()
    content = generate_html(deals)
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(content)
