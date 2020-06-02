#!/bin/python3
from flask import Flask, render_template, request, json, redirect, url_for
from ada_info import AdaInfo
from formata_status import FormataStatus
app = Flask(__name__)


@app.route('/')
def index():
    return redirect(url_for('status'))


@ app.route('/site/servicos/datasat/status')
def status():
    passagens_et1 = []
    status_et1 = []
    passagens_et2 = []
    status_et2 = []
    try:
        passagens_et1 = AdaInfo().get_passagens()[0]
        status_et1 = FormataStatus().formata_status()[0]
        passagens_et2 = AdaInfo().get_passagens()[1]
        status_et2 = FormataStatus().formata_status()[1]
    except:
        pass

    return render_template('ada_info.html', status_et1=status_et1, passagens_et1=passagens_et1, status_et2=status_et2, passagens_et2=passagens_et2)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=81, debug=False, threaded=True)
