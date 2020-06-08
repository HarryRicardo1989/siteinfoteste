import requests
import json


class AdaInfo:
    def __init__(self):
        self.__status = ''
        self.__passagens = ''

    def get_passagens(self):
        list_passagens = [['Nome da ADA: ET-CSS-001 - OFFLINE'],
                          ['Nome da ADA: ET-CSS-002 - OFFLINE'], ]
        try:
            estacao = self.__get_url()[0]
            list_passagens[0] = requests.get(f'{estacao}/passagens').text.replace('"', '').replace(
                '\n', '').replace('{', '').replace('}', '').split(',')
        except:
            pass
        try:
            estacao = self.__get_url()[1]
            list_passagens[1] = requests.get(f'{estacao}/passagens').text.replace('"', '').replace(
                '\n', '').replace('{', '').replace('}', '').split(',')
        except:
            pass
        return list_passagens

    def __get_url(self):
        lista_url = []
        with open(f'/var/local/ada-urls.txt') as ada_urls:
            for url in ada_urls:
                lista_url.append(url.strip('\n'))
        return lista_url

    def get_status_dic(self):
        list_status = [{'Nome da ADA': 'OFFLINE', 'Temperatura do Processador': '0.0', 'Porcentagem do SSD usado': '0.0', 'Posicao Atual da Antena': '000'}, {
            'Nome da ADA': 'OFFLINE', 'Temperatura do Processador': '0.0', 'Porcentagem do SSD usado': '0.0', 'Posicao Atual da Antena': '000', 'Hora': '00:00:00'}]
        try:
            estacao = self.__get_url()[0]
            list_status[0] = requests.get(f'{estacao}/status').json()
        except:
            pass
        try:
            estacao = self.__get_url()[1]
            list_status[1] = requests.get(f'{estacao}/status').json()
        except:
            pass
        return list_status
