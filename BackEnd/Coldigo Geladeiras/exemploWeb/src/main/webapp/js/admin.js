
//Cria o objeto COLDIGO, que será usado como identificador do projeto 
COLDIGO = new Object();

$(document).ready(function () {
    $("header").load("/exemploWeb/pages/admin/general/header.html");
    $("footer").load("/exemploWeb/pages/admin/general/footer.html");
});


COLDIGO.carregaPagina = function (pagename) {  
    $("section").empty();
    $("section").load(pagename + "/", function (response, status, info) {
        if (status == "error") {
            var msg = "Houve um erro ao encontrar a página: " + info.status + " " + info.statusText; $("section").html(msg);
        }
    });
}