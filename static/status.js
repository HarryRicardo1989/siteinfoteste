function formataStatus(status) {
    let statusFormatado = []
    /* classificaçao Hora */
    if (status['Posicao_Atual']) {
        statusFormatado.push(`Hora do ADA-Server: <span class="verde">${status['Hora_Atual']}</span>`);
        /* classificaçao SSD */
    } else {
        statusFormatado.push(`Hora do Server: <span class="verde">${status['Hora_Atual']}</span>`);
    }

    for (disc of Object.keys(status['Discos'])) {
        const discos = status['Discos']
        if (parseInt(discos[disc]) < 50) {
            statusFormatado.push(`Porcentagem do ${disc} usado: <span class="verde">${discos[disc]}</span>`);
        } else if (parseInt(discos[disc]) <= 80) {
            statusFormatado.push(`Porcentagem do ${disc} usado: <span class="amarelo">${discos[disc]}</span>`);
        } else {
            statusFormatado.push(`<span class="vermelho">Porcentagem do ${disc} usado: ${discos[disc]}</span>`);
        }
    }

    /*     if (parseInt(status['sda1']) < 50) {
            statusFormatado.push(`Porcentagem do SSD usado: <span class="verde">${status['sda1']}</span>`);
        } else if (parseInt(status['sda1']) <= 80) {
            statusFormatado.push(`Porcentagem do SSD usado: <span class="amarelo">${status['sda1']}</span>`);
        } else {
            statusFormatado.push(`<span class="vermelho">Porcentagem do SSD usado: ${status['sda1']}</span>`);
        } */





    /* classificaçao Temperatura Processador */
    if (parseInt(status['Temp_CPU']) < 65) {
        statusFormatado.push(`Temperatura do Processador:  <span class="verde">${status['Temp_CPU']}ºC</span>`);
    } else if (parseInt(status['Temp_CPU']) < 75) {
        statusFormatado.push(`Temperatura do Processador: <span class="amarelo"> ${status['Temp_CPU']}ºC</span>`);
    } else {
        statusFormatado.push(`<span class="vermelho">Temperatura do Processador:  ${status['Temp_CPU']}ºC</span>`);
    }






    /* classificaçao posiçao */
    if (status['Posicao_Atual']) {

        if (status['Posicao_Atual'] == "AZ010.00 EL-00.00" || status['Posicao_Atual'] == "AZ075.00 EL-00.00" || status['Posicao_Atual'] == "AZ010.00 EL00.00" || status['Posicao_Atual'] == "AZ075.00 EL00.00") {
            statusFormatado.push(`Posição da Antena:  <span class="verde">${status['Posicao_Atual']}</span>`);
        } else {
            statusFormatado.push(`Posição da Antena:  <span class="amarelo">${status['Posicao_Atual']}</span>`);
        }
        return statusFormatado
    } else {
        return statusFormatado
    }
}
