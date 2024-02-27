function validaFormulario() {

    var fone = document.facaparte.telefone.value;
    var expRegFone = new RegExp("^[(]{1}[1-9]{2}[)]{1}[0-9]{4,5}[-]{1}[0-9]{4}$");
    if (!expRegFone.test(fone)) {
        alert("Preencha o campo Telefone corretamente.");
        document.facaparte.telefone.focus();
        return false;
    }
    var cep = document.facaparte.Cep.value;
    var expRegCep = new RegExp("^[0-9]{5}[-]{1}[0-9]{3}$");
    if (!expRegCep.test(cep)) {
        alert("Preencha o campo CEP corretamente.");
        document.facaparte.telefone.focus();
        return false;
    }

    var data = document.facaparte.data.value;
    var expRegData = new RegExp("^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$");
    if (!expRegData.test(data)) {
        alert("Preencha o campo de Data de nascimento corretamente!!!");
        document.facaparte.data.focus();
        return false;
    }

    var nome = document.facaparte.nome.value;
    var expRegNome = new RegExp("^[A-zÀ-ü]{3,}([ ]{1}[A-zÀ-ü]{2,}) $")
    if (!expRegNome.test(nome)) {
        alert("Preencha o campo de Nome corretamente!!!");
        document.facaparte.nome.focus();
        return false;
    }

    if (document.facaparte.nome.value == "") {
        alert("Preencha o nome!!!");
        document.facaparte.nome.focus();
        return false;
    }
    if (document.facaparte.email.value == "") {
        alert("Preencha o Email!!!");
        document.facaparte.email.focus();
        return false;
    }
    if (document.facaparte.data.value == "") {
        alert("Preencha sua data de nascimento!!!");
        document.facaparte.data.focus();
        return false;
    }


    return true;
}

$(document).ready(function () {
    //Carrega cabeçalho, menu e rodapé aos respectivos locais
    $("header").load("/components/header.html");
    $("footer").load("/components/footer.html");
});