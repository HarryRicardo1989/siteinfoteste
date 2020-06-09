

function atualizaStatus() {
    var xhr = new XMLHttpRequest();
    var url = "/statusSistema"
    xhr.open("GET", url);

    statusSistema = xhr.addEventListener("load", function () {
        if (xhr.status == 200) {
            var statusSistema = xhr.responseText;
            geraListas(statusSistema)
        }
    })

    xhr.send();

};