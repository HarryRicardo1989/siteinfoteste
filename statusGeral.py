import requests
import json
from network_status import SpeedTest
from status import GalaxyStatus


class StatusSistemas:

    def get_status_completo(self):
        status_completo = {}
        for i in range(0, len(self.__get_url())):
            try:
                estacao = self.__get_url()[i]
                status_completo.update(requests.get(
                    f"{estacao}/statusSistema").json())
            except:
                pass

        # status_completo.update(self.get_galaxy_stat())
        return {"DataSAT": status_completo}

    def __get_url(self):
        lista_url = []
        with open(f"/var/local/ada-urls.txt") as ada_urls:
            for url in ada_urls:
                lista_url.append(url.strip("\n"))
        return lista_url

    def get_galaxy_stat(self):
        status_galaxy = {}
        status = {}
        network = {}
        eth0 = {}
        tun0 = {}
        status_servidor = GalaxyStatus()
        eth0.update(SpeedTest().speed("tx", "enp1s0"))
        eth0.update(SpeedTest().speed("rx", "enp1s0"))
        tun0.update(SpeedTest().speed("tx", "tun0"))
        tun0.update(SpeedTest().speed("rx", "tun0"))
        network.update({"eth0": eth0})
        network.update({"tun0": tun0})
        hostname, temperatura_processador, hora, armazenamento = status_servidor.get_status_galaxy()
        status.update({"Temp_CPU": temperatura_processador})
        status.update({"Hora_Atual": hora})
        dict_discos = {}
        for item in armazenamento:
            item.split(' ')
            dict_discos.update(
                {item.split()[0]: f'{item.split()[1]} de {item.split()[2]}'})
        status.update({'Discos': dict_discos})
        status_galaxy.update({"Network": network})
        status_galaxy.update({"Status": status})

        return {f"{hostname}": status_galaxy}


print(StatusSistemas().get_galaxy_stat())
