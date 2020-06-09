document.querySelector(".titulo-principal").textContent = "Status do Sistema";


atualizaStatus()

function geraListas(listastatus) {
    var passagens = []
    var status = []
    var statusSistema = JSON.parse(listastatus);
    console.log(statusSistema["statusSistema"])

}
