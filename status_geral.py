import requests
import json


class StatusSistemasAda:

    def get_statusgeral(self):
        list_passagens = []

        for i in range(0, len(self.__get_url())):
            try:
                estacao = self.__get_url()[i]
                list_passagens.append(requests.get(
                    f'{estacao}/passagens').text.replace('\n', '').replace('\"', '').replace('{', '').replace('}', '').split(','))
            except:
                pass
            try:
                estacao = self.__get_url()[i]
                list_passagens.append(requests.get(f'{estacao}/status').json())
            except:
                pass

        return {"statusSistema": list_passagens}

    def __get_url(self):
        lista_url = []
        with open(f'/var/local/ada-urls.txt') as ada_urls:
            for url in ada_urls:
                lista_url.append(url.strip('\n'))
        return lista_url
