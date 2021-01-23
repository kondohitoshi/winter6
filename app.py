from flask import Flask, render_template, url_for

from flask import Flask, render_template
from flask_bootstrap import Bootstrap

app = Flask(__name__)
bootstrap = Bootstrap(app)

@app.route('/')
def hello_world():
    return render_template('bootstrap_html.html')


if __name__ == '__main__':
    app.run(debug=True)