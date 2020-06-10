document.querySelector(".titulo-principal").textContent = "Status do Sistema";

function montaUl(liItens) {
    div = document.createElement("div");
    div.classList.add('bloco')
    ul = document.createElement("ul");
    ul.classList.add('pass')
    div.appendChild(ul);
    liItens.forEach(function (item) {
        var li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
    });
    return div
}

function geraStatus(status) {
    hora = "Hora Server: " + status['Hora']
    nomeDaAda = "Nome da Estação: " + status['Nome da ADA']
    ssdUsed = "Porcentagem do SSD usado: " + status['Porcentagem do SSD usado']
    posAtual = "Posição da Antena: " + status['Posicao Atual da Antena']
    tempProcess = "Temperatura do Processador: " + status['Temperatura do Processador'] + "ºC"
    return [nomeDaAda, hora, ssdUsed, tempProcess, posAtual]
}



function FetchParser(jsonObj) {
    statusGeral = jsonObj['statusSistema']
    passET01 = statusGeral[0]
    passET02 = statusGeral[2]

    var divPrincipal = document.querySelector("#InicioBlocos");
    divPrincipal.innerHTML = '';
    divPrincipal.appendChild(montaUl(geraStatus(statusGeral[1])));
    divPrincipal.appendChild(montaUl(geraStatus(statusGeral[3])));
    divPrincipal.appendChild(montaUl(passET01));
    divPrincipal.appendChild(montaUl(passET02));
    bloco = document.querySelector(".bloco")
}



function atualizaStatus() {
    var url = "/statusSistema";
    fetch(url).then(r => {
        let error = false;
        if (r.status == 200) {
            r.json().then(json => FetchParser(json)).catch(() => {
                error = true;
                console.log('Error');
            });
        }
        if (error) {
            r.text().then(t => console.log('t'));
        }
    });

};


setInterval(function () {
    atualizaStatus();

}, 1000)
