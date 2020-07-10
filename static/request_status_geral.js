var meuNavegador = navigator.userAgent;

if (meuNavegador.includes("Mobile")) {
    document.getElementById("logotipo").style.display = "none";

}


document.querySelector(".titulo-principal").textContent = "Status DATASAT";
const divPrincipal = document.querySelector("#InicioBlocos");
var ulEt01, pass;
var movimenta = false
var galaxyStatus = null
function createUlList(lista, classeUL) {
    let ul = document.createElement("ol");
    ul.classList.add(classeUL)
    lista.forEach(function (item) {
        li = document.createElement("li");
        li.innerHTML = item;
        ul.appendChild(li);
    });
    return ul

}

function formataStatus(status) {
    let statusFormatado = []
    /* classificaçao Hora */
    if (status['Posicao_Atual']) {
        statusFormatado.push(`Relógio do ADA-Server: <span class="verde">${status['Hora_Atual']}</span>`);
        /* classificaçao SSD */
    } else {
        statusFormatado.push(`Relógio do Servidor: <span class="verde">${status['Hora_Atual']}</span>`);
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


function divCreate(tagFilha, classeDiv) {
    let div = document.createElement("div");
    div.classList.add(classeDiv);
    div.appendChild(tagFilha);
    return div
}

function h1Create(h1Text, className) {
    let tag_Name = document.createElement("h1");
    tag_Name.classList.add(className);
    tag_Name.innerHTML = h1Text;
    return tag_Name
}
function formataGalaxy(lista, idName) {
    let listaFormatada = []
    listaFormatada.push(`<h2><span class="direction">Direction</span><span class="speed">Speed</span></h2>`)
    for (x of Object.keys(lista)) {
        listaFormatada.push(`<span class="direction">${idName} ${x}</span>&#8658;<span id="verde" class="speed">${lista[x]}MB/s</span>`)
        listaFormatada.push(`<span class="direction">${idName} ${x}</span>&#8658;<span id="verde" class="speed">${(lista[x] * 8)}Mb/s</span>`)
    }
    return listaFormatada
}
function formataPassagens(lista, idName) {

    let listaFormatada = []
    listaFormatada.push(`<h2><span class="hora">Hora </span><span class="sat">   Satelite</span></h2>`)
    for (x of Object.keys(lista)) {
        listaFormatada.push(`<span class="hora">${x}</span>&#8658;<span class="sat">${lista[x]}</span>`)
    }
    if (movimenta == true) {
        listaFormatada[1] = listaFormatada[1].replace(/class=/g, `id="${idName}" class=`)
    } else {
        listaFormatada[1] = listaFormatada[1].replace(/class=/g, `id="${idName}" class=`)
    }
    return listaFormatada
}



function movimento(status) {
    if (status['Posicao_Atual'] == "AZ010.00 EL-00.00" || status['Posicao_Atual'] == "AZ075.00 EL-00.00" || status['Posicao_Atual'] == "AZ010.00 EL00.00" || status['Posicao_Atual'] == "AZ075.00 EL00.00") {
        return "parada"
    } else {
        return "movimentando"
    }
}

function checkSheduleds(lista) {
    if (Object.keys(lista).length) {
        return lista
    }
    else {
        return { "XX:XX": "NoSatScheduledYet" }
    }
}

function movimento(status) {
    if (status['Posicao_Atual'] == "AZ010.00 EL-00.00" || status['Posicao_Atual'] == "AZ075.00 EL-00.00" || status['Posicao_Atual'] == "AZ010.00 EL00.00" || status['Posicao_Atual'] == "AZ075.00 EL00.00") {
        return "parada"
    } else {
        return "movimentando"
    }
}


function FetchParser(jsonObj) {

    let statusGeral = jsonObj['DataSAT'];
    divPrincipal.innerHTML = '';
    for (ET of Object.keys(statusGeral)) {
        const estacao = `${ET}`
        const passagens = statusGeral[estacao]["Passagens"];
        const statusSistema = statusGeral[estacao]["Status"]

        const agendaEt = formataPassagens(checkSheduleds(passagens), movimento(statusSistema));
        const statusEt = formataStatus(statusSistema);
        divPrincipal.appendChild(divCreate(divCreate(divCreate(createUlList(statusEt, "status"), estacao), "datasat"), "bloco"))
        ulEt = document.querySelector(`.${estacao}`);
        ulEt.insertAdjacentHTML('beforebegin', `<h1>${estacao}</h1>`);
        ulEt.appendChild(createUlList(agendaEt, "pass"), "pass");

    }
    const servidor = Object.keys(galaxyStatus)
    const statusGalaxy = galaxyStatus[servidor]["Status"]
    const netWork = galaxyStatus[servidor]["Network"];
    const statGalaxy = formataStatus(statusGalaxy);

    divPrincipal.appendChild(divCreate(divCreate(divCreate(createUlList(statGalaxy, "status"), servidor), "server"), "bloco"))
    ulGLaxy = document.querySelector(`.${servidor}`);
    ulGLaxy.insertAdjacentHTML('beforebegin', `<h1>${servidor}</h1>`);
    for (rede of Object.keys(netWork)) {
        const networkList = formataGalaxy(netWork[rede], rede);
        ulGLaxy.appendChild(createUlList(networkList, "pass"), "pass");

    }
}

function atualizaStatus() {
    var url = "/statusCompleto";
    fetch(url).then(r => {
        var error = false;
        if (r.status == 200) {
            r.json().then(json => FetchParser(json)).catch(() => {
                error = true;
                console.log('Error');
            });
        }
        if (error) {
            r.text().then(t => console.log(t));
        }
    });

};
function atualizaGalaxy() {
    const url = '/statusGalaxy'
    fetch(url).then(resp => resp.json()).then(status => {
        galaxyStatus = status
    })
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML = `${h}:${m}:${s}`;
    //var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

setInterval(function () {
    atualizaStatus();
    atualizaGalaxy();
    startTime();
}, 300)

