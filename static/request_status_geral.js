var xhr = new XMLHttpRequest();

xhr.addEventListener("load", function () {
    if (xhr.status == 200) {
        var statusSistema = xhr.responseText;
        var listastatus = JSON.parse(statusSistema)["statusSistema"];
        geraListas(listastatus)
    }
    else { console.log("falhou") }
})

function myTimer() {
    var timer = setTimeout(function () {
        atualizaStatus();
        myTimer();

    }, 1000)
};


function atualizaStatus() {
    var url = "/statusSistema";
    xhr.open("GET", url);
    xhr.send();
};