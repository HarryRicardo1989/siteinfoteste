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
setInterval(function () {
    atualizaStatus();
    atualizaGalaxy();
}, 300)

