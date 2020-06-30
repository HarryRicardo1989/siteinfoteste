document.querySelector(".titulo-principal").textContent = "Status DATASAT";
const divPrincipal = document.querySelector("#InicioBlocos");
var ulEt01, pass;
var movimenta = false
<<<<<<< HEAD
=======
var galaxyStatus = null
>>>>>>> galaxyStatus
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

function formataPassagens(lista, idName) {
<<<<<<< HEAD
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
=======
    if (idName == 'galaxy') {
        let listaFormatada = []
        listaFormatada.push(`<h2><span class="direction">Direction</span><span class="speed">Speed</span></h2>`)
        for (x of Object.keys(lista)) {
            listaFormatada.push(`<span class="direction">${x}</span>&#8658;<span id="verde" class="speed">${lista[x]}</span>`)
        }
        return listaFormatada
    } else {

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
>>>>>>> galaxyStatus
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
        return { "00:00": "NoSatScheduledYet" }
    }
}

function FetchParser(jsonObj) {

<<<<<<< HEAD
    let statusGeral = jsonObj["statusSistema"];
    let passagens = statusGeral["Passagens"];
    let statusSistema = statusGeral["Status"];
    let agendaEt1 = formataPassagens(checkSheduleds(passagens[1]["Passagens ET-CSS-001"]), movimento(statusSistema[1]["Status ET-CSS-001"]));
    let agendaEt2 = formataPassagens(checkSheduleds(passagens[2]["Passagens ET-CSS-002"]), movimento(statusSistema[2]["Status ET-CSS-002"]));
    let statusEt1 = formataStatus(statusSistema[1]["Status ET-CSS-001"]);
    let statusEt2 = formataStatus(statusSistema[2]["Status ET-CSS-002"]);
    divPrincipal.innerHTML = '';
    divPrincipal.appendChild(divCreate(divCreate(divCreate(createUlList(statusEt1, "status"), "ET-CSS-001"), "datasat"), "bloco"))
    divPrincipal.appendChild(divCreate(divCreate(divCreate(createUlList(statusEt2, "status"), "ET-CSS-002"), "datasat"), "bloco"))
    ulEt01 = document.querySelector(".ET-CSS-001");
    ulEt01.insertAdjacentHTML('beforebegin', '<h1>ET-CSS-001</h1>');
    ulEt01.appendChild(createUlList(agendaEt1, "pass"), "pass");
    ulEt01 = document.querySelector(".ET-CSS-002");
    ulEt01.appendChild(createUlList(agendaEt2, "pass"), "pass");
    ulEt01.insertAdjacentHTML('beforebegin', '<h1>ET-CSS-002</h1>');
=======
    let statusGeral = jsonObj['DataSAT'];
    divPrincipal.innerHTML = '';
    for (ET of Object.keys(statusGeral)) {
        const estacao = `${ET}`
        const passagens = statusGeral[estacao]["Passagens"];
        const statusSistema = statusGeral[estacao]["Status"]

>>>>>>> galaxyStatus


        const agendaEt = formataPassagens(checkSheduleds(passagens), movimento(statusSistema));
        const statusEt = formataStatus(statusSistema);
        divPrincipal.appendChild(divCreate(divCreate(divCreate(createUlList(statusEt, "status"), estacao), "datasat"), "bloco"))
        ulEt = document.querySelector(`.${estacao}`);
        ulEt.insertAdjacentHTML('beforebegin', `<h1>${estacao}</h1>`);
        ulEt.appendChild(createUlList(agendaEt, "pass"), "pass");

    }
    const statusGalaxy = galaxyStatus["GALAXY"]["Status"]
    const netWork = galaxyStatus["GALAXY"]["Network"];
    const statGalaxy = formataStatus(statusGalaxy);
    const networkList = formataPassagens(netWork, "galaxy");
    divPrincipal.appendChild(divCreate(divCreate(divCreate(createUlList(statGalaxy, "status"), "GALAXY"), "server"), "bloco"))
    ulGLaxy = document.querySelector(`.GALAXY`);
    ulGLaxy.insertAdjacentHTML('beforebegin', `<h1>GALAXY</h1>`);
    ulGLaxy.appendChild(createUlList(networkList, "pass"), "pass");
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
<<<<<<< HEAD
}, 300)
=======
    atualizaGalaxy();
}, 300)

>>>>>>> galaxyStatus
