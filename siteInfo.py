#!/bin/python3
from flask import Flask, render_template, redirect, url_for
from time import sleep
# thread
import threading
from statusGeral import StatusSistemas


app = Flask(__name__)
status_completo_atualiza = None
status_galaxy = None


# @app.route('/')
# def index():
#    return redirect(url_for('status'))


# @ app.route('/site/servicos/datasat/status')
# def status():

#    return render_template('ada_info.html')


@ app.route('/statusCompleto')
def status_completo():
    return status_completo_atualiza


@ app.route('/statusGalaxy')
def status_galaxy():
    return status_galaxy


def atualiza_status():
    global status_completo_atualiza
    while(True):

        status_completo_atualiza = StatusSistemas().get_status_completo()

        sleep(0.5)


def atualiza_galaxy():
    global status_galaxy
    while(True):
        try:
            status_galaxy = StatusSistemas().get_galaxy_stat()
        except:
            pass

        sleep(0.5)


if __name__ == '__main__':
    threadstatus = threading.Thread(target=atualiza_status)
    threadGalaxy = threading.Thread(target=atualiza_galaxy)
    threadstatus.start()
    threadGalaxy.start()
    app.run(host='127.0.0.1', port=8000, debug=False, threaded=True)
