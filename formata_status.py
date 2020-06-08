from ada_info import AdaInfo


class FormataStatus:
    def __init__(self):
        pass

    def __formata_temp(self, temp):
        temperature = float(temp.strip('+'))
        return temperature

    def __formata_ssd(self, porcentagem):
        percent = float(porcentagem.strip('%'))

        return percent

    def __formata_pos(self, pos):
        return pos.replace('-', '')

    def __formata_estacao(self, estacao):
        return f'Nome da ADA: {estacao}'

    def __formata_hora(self, hora):
        return f'Hora: {hora}'

    def formata_status(self):
        info = AdaInfo()
        temp1 = self.__formata_temp(
            info.get_status_dic()[0]['Temperatura do Processador'])
        ssd1 = self.__formata_ssd(info.get_status_dic()[
                                  0]['Porcentagem do SSD usado'])
        pos1 = self.__formata_pos(info.get_status_dic()[
                                  0]['Posicao Atual da Antena'])
        estacao1 = self.__formata_estacao(
            info.get_status_dic()[0]['Nome da ADA'])
        horaEt01 = self.__formata_hora(info.get_status_dic()[0]['Hora'])

        temp2 = self.__formata_temp(
            info.get_status_dic()[1]['Temperatura do Processador'])
        ssd2 = self.__formata_ssd(info.get_status_dic()[
                                  1]['Porcentagem do SSD usado'])
        pos2 = self.__formata_pos(info.get_status_dic()[
                                  1]['Posicao Atual da Antena'])
        estacao2 = self.__formata_estacao(
            info.get_status_dic()[1]['Nome da ADA'])
        #horaEt02 = self.__formata_hora(info.get_status_dic()[1]['Hora'])

        status_et1_list = [estacao1, temp1, ssd1, pos1, horaEt01]
        status_et2_list = [estacao2, temp2, ssd2, pos2]
        return [status_et1_list, status_et2_list]
