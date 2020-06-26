#!/bin/python3
from flask import Flask, render_template, redirect, url_for
from time import sleep
# thread
import threading
from statusGeral import StatusSistemas


app = Flask(__name__)
status_completo_atualiza = None


@app.route('/')
def index():
    return redirect(url_for('status'))


@ app.route('/site/servicos/datasat/status')
def status():

    return render_template('ada_info.html')


@ app.route('/statusCompleto')
def status_completo():

    return status_completo_atualiza


def atualiza_status():
    global status_completo_atualiza
    while(True):
        status_geral2 = StatusSistemas()
        status_completo_atualiza = status_geral2.get_status_completo()
        sleep(0.1)


if __name__ == '__main__':
    threadstatus = threading.Thread(target=atualiza_status)
    threadstatus.start()
    app.run(host='0.0.0.0', port=80, debug=False, threaded=True)

