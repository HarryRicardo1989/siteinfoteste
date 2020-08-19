import requests
import json
from network_status import SpeedTest
from status import GalaxyStatus
import os


class StatusSistemas:

    def get_status_completo(self):
        status_completo = {}
        nomeEstacao = ''
        for i in range(0, len(self.__get_url())):
            estacao = self.__get_url()[i]
            try:
                r = requests.get(
                    f"{estacao}/statusSistema")
                status_completo.update(r.json())
            except:
                pass

            finally:
                r.close()

        return {"DataSAT": status_completo}

    def __get_url(self):
        lista_url = []
        with open(f"/var/local/ada-urls.txt") as ada_urls:
            for url in ada_urls:
                lista_url.append(url.strip("\n"))
        return lista_url

    def verifica_adas(self):
        lista_adas = []
        lista_adas_out = []
        with open(f"/var/local/ada-list.txt") as ada_list:
            for ada in ada_list:
                lista_adas.append(ada.strip("\n"))

        for ada in lista_adas:
            stream = os.system(f"ping -c 1 -w1 {ada.replace('http://','')}")
            if stream == 0:
                lista_adas_out.append(ada.strip("\n"))
        with open(f"/var/local/ada-urls.txt", 'w') as f:
            for item in lista_adas_out:
                f.write("%s\n" % item)

    def get_galaxy_stat(self):
        status_galaxy = {}
        status = {}
        network = {}
        eth0 = {}
        tun0 = {}
        status_servidor = GalaxyStatus()
        eth0.update(SpeedTest().speed("tx", "enp2s0"))
        eth0.update(SpeedTest().speed("rx", "enp2s0"))
        tun0.update(SpeedTest().speed("tx", "tun0"))
        tun0.update(SpeedTest().speed("rx", "tun0"))
        network.update({"eth0": eth0})
        network.update({"tun0": tun0})
        hostname, temperatura_processador, hora, armazenamento, cpu_load = status_servidor.get_status_galaxy()
        status.update({"Temp_CPU": temperatura_processador})
        status.update({"Hora_Atual": hora})
        dict_discos = {}
        for item in armazenamento:
            item.split(' ')
            dict_discos.update(
                {item.split()[0]: f'{item.split()[1]} de {item.split()[2]}'})
        status.update({'Discos': dict_discos})
        status.update({'CPU_Load': round((float(cpu_load))*10, 3)})
        status_galaxy.update({"Network": network})
        status_galaxy.update({"Status": status})

        return {f"{hostname}": status_galaxy}


StatusSistemas().verifica_adas2()
