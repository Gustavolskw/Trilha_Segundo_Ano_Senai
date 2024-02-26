


function validaFaleConosco() {
    if (document.frmfaleconosco.txtnome.value == "") {
        alert("Preencha o campo Nome.");
        document.frmfaleconosco.txtnome.focus();
        return false;
    }
    if (document.frmfaleconosco.txtfone.value == "") {
        alert("Preencha o campo Telefone.");
        document.frmfaleconosco.txtfone.focus();
        return false;

    }
    if (document.frmfaleconosco.txtemail.value == "") {
        alert("Preencha o campo Email.");
        document.frmfaleconosco.txtemail.focus();
        return false;

    }
    if (document.frmfaleconosco.selmotivo.value == "") {
        alert("Escolha o motivo.");
        document.frmfaleconosco.selmotivo.focus();
        return false;

    }
    if (document.frmfaleconosco.txacomentario.value == "") {
        alert("Deixe seu comentario!");
        document.frmfaleconosco.txacomentario.focus();
        return false;

    }
    if (document.frmfaleconosco.selProduto.value == "") {
        alert("Slecione o Produto!!!!");
        document.frmfaleconosco.selProduto.focus();
        return false;

    }

    return true;
}



function verificaProduto(motivo) {
    var elemento = document.getElementById("opcaoDeProduto")

    if (motivo == "PR") {
        elemento.innerHTML = `
        <select name="selProduto">
            <option value="">Escolha</option>
            <option value="FR">Freezer</option>
            <option value="GE">Geladeira</option>
        </select>`;
        /*
                var select = document.createElement("select");
                var option = document.createElement("option");
                select.setAttribute("name", "selProduto") // resoluçao do desafio
                option.setAttribute("value", "");
                var texto = document.createTextNode("Escolha");
                option.appendChild(texto);
                select.appendChild(option);
                var option = document.createElement("option");
                option.setAttribute("value", "FR");
                var texto = document.createTextNode("Freezer");
                option.appendChild(texto);
                select.appendChild(option);
                var option = document.createElement("option");
                option.setAttribute("value", "GE");
                var texto = document.createTextNode("Geladeira");
                option.appendChild(texto);
                select.appendChild(option);
                elemento.appendChild(select);
        */

    } else {
        if (elemento.firstChild)
            elemento.removeChild(elemento.firstChild);
    }
}


