
from request_os import RequestCommands


class GalaxyStatus:
    def __init__(self):
        self.__comando = RequestCommands()
        self.__temperature_processor = ''
        self.__hostename = ''
        self.__hora = ''
        self.__armazenamento = ''
        self.__cpu_load = ''

    def get_status_galaxy(self):
        self.__hostename = self.__comando.comand('hostname').replace("\n", '')
        self.__temperature_processor = self.__comando.comand(
            "sensors | grep Package | awk '{print $4}'").replace('°C', '').replace("\n", '')
        self.__hora = self.__comando.comand("date +%H:%M:%S").replace("\n", '')
        self.__armazenamento = self.__comando.comand(
            "df -h | grep /dev/sd |awk '{print$1, $5, $2}' | xargs").replace("\n", '')[5:].split('/dev/')
        self.__cpu_load = float(self.__comando.comand(
            "top -bn1 | grep load | awk '{printf$(NF-2)}'").replace(',', ''))*10
        return self.__hostename, self.__temperature_processor, self.__hora, self.__armazenamento, self.__cpu_load
