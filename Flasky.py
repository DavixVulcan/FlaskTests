from flask import Flask, render_template
from flask_sock import Sock

app = Flask(__name__)
app.config['SOCK_SERVER_OPTIONS'] = {'ping_interval': 25}
sock = Sock(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/staging')
def staging():
    return render_template('staging.html')

@sock.route('/echo')
def echo(ws):
    while True:
        data = ws.receive()
        print(data)
        ws.send(data)

app.run()