import requests
import json


class StatusSistemas:

    def get_statusgeral(self):
        passagens = {}
        status = {}
        for i in range(0, len(self.__get_url())):
            try:
                estacao = self.__get_url()[i]
                passagens.update({i+1: requests.get(
                    f'{estacao}/passagens').json()})
            except:
                pass
            try:
                estacao = self.__get_url()[i]
                status.update({i+1: requests.get(
                    f'{estacao}/status').json()})
            except:
                pass

        return {"statusSistema": {"Passagens": passagens, "Status": status}}

    def get_status_completo(self):
        status_completo = {}
        for i in range(0, len(self.__get_url())):
            try:
                estacao = self.__get_url()[i]
                status_completo.update(requests.get(f'{estacao}/statusSistema').json())
            except:
                pass

        return {"DataSAT": status_completo}

    def __get_url(self):
        lista_url = []
        with open(f'/var/local/ada-urls.txt') as ada_urls:
            for url in ada_urls:
                lista_url.append(url.strip('\n'))
        return lista_url
