function formataStatus(status) {
    let statusFormatado = []
    /* classificaçao Hora */
    statusFormatado.push(`Hora do ADA-Server: <span class="verde">${status['Hora_Atual']}</span>`);
    /* classificaçao SSD */
    if (status['SSD_used'] < "50%") {
        statusFormatado.push(`Porcentagem do SSD usado: <span class="verde">${status['SSD_used']}</span>`);
    } else if (status['SSD_used'] >= "50%" || status['SSD_used'] <= "80%") {
        statusFormatado.push(`Porcentagem do SSD usado: <span class="amarelo">${status['SSD_used']}</span>`);
    } else if (status['SSD_used'] < "80%") {
        statusFormatado.push(`<span class="vermelho">Porcentagem do SSD usado: ${status['SSD_used']}</span>`);
    }
    /* classificaçao Temperatura Processador */
    if (status['Temp_CPU'] < "+65.0") {
        statusFormatado.push(`Temperatura do Processador:  <span class="verde">${status['Temp_CPU']}ºC</span>`);
    } else if (status['Temp_CPU'] >= "+65.0" || status['Temp_CPU'] <= "+75.0") {
        statusFormatado.push(`Temperatura do Processador: <span class="amarelo"> ${status['Temp_CPU']}ºC</span>`);
    } else if (status['Temp_CPU'] > "+75.0") {
        statusFormatado.push(`<span class="vermelho">Temperatura do Processador:  ${status['Temp_CPU']}ºC</span>`);
    }
    /* classificaçao posiçao */
    if (status['Posicao_Atual'] == "AZ010.00 EL-00.00" || status['Posicao_Atual'] == "AZ075.00 EL-00.00" || status['Posicao_Atual'] == "AZ010.00 EL00.00" || status['Posicao_Atual'] == "AZ075.00 EL00.00") {
        statusFormatado.push(`Posição da Antena:  <span class="verde">${status['Posicao_Atual']}</span>`);
    } else {
        statusFormatado.push(`Posição da Antena:  <span class="amarelo">${status['Posicao_Atual']}</span>`);
    }
    return statusFormatado
}