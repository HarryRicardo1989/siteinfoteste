document.querySelector(".titulo-principal").textContent = "Status do Sistema";
var div, li, ul, tag_Name;
function montaUl(liItens, classe) {
    div = document.createElement("div");
    div.classList.add('bloco')
    ul = document.createElement("ul");
    ul.classList.add(classe)
    div.appendChild(ul);
    liItens.forEach(function (item) {
        li = document.createElement("li");
        li.innerHTML = item;
        ul.appendChild(li);
    });
    return div
}
function createUlList(lista, classeUL) {
    ul = document.createElement("ul");
    ul.classList.add(classeUL)
    lista.forEach(function (item) {
        li = document.createElement("li");
        li.innerHTML = item;
        ul.appendChild(li);
    });
    return ul

}

function divCreate(tagFilha, classeDiv) {
    div = document.createElement("div");
    div.classList.add(classeDiv);
    div.appendChild(tagFilha);
    return div
}

function tagCreate(tagText) {
    tag_Name = document.createElement("h1");
    tag_Name.classList.add("");
    tag_Name.innerHTML = tagText;
    return tag_Name
}
function formataPassagens(lista) {
    listaFormatada = []
    for (x of Object.keys(lista)) {
        listaFormatada.push(`${x}  -  ${lista[x]}`)
    }
    return listaFormatada
}
function formataStatus(status) {
    var statusFormatado = []
    statusFormatado.push("Hora Server: " + status['Hora_Atual']);
    statusFormatado.push("Porcentagem do SSD usado: " + status['SSD_used']);
    statusFormatado.push("Temperatura do Processador: " + status['Temp_CPU'] + "ºC");
    statusFormatado.push("Posição da Antena: " + status['Posicao_Atual']);
    return statusFormatado
}
function concatLists(listMain, listaSec) {

    for (item of Object.keys(listaSec)) {
        listMain.push(listaSec[item])
    }
    return listMain
}

function FetchParser(jsonObj) {

    var statusGeral = jsonObj["statusSistema"];
    var passagens = statusGeral["Passagens"];
    var statusSistema = statusGeral["Status"];
    var agendaEt1 = formataPassagens(passagens[1]["Passagens ET-CSS-001"]);
    var agendaEt2 = formataPassagens(passagens[2]["Passagens ET-CSS-002"]);
    var statusEt1 = formataStatus(statusSistema[1]["Status ET-CSS-001"]);
    var statusEt2 = formataStatus(statusSistema[2]["Status ET-CSS-002"]);

    var divPrincipal = document.querySelector("#InicioBlocos");
    divPrincipal.innerHTML = '';
    divPrincipal.appendChild(montaUl(concatLists(statusEt1, agendaEt1), "pass"));
    divPrincipal.appendChild(montaUl(concatLists(statusEt2, agendaEt2), "pass"));
    divPrincipal.appendChild(createUlList(agendaEt1, "Bloco"))


}

function atualizaStatus() {
    var url = "/statusSistema";
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


setInterval(function () {
    atualizaStatus();

}, 5000)
