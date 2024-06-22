COLDIGO.marca = new Object();

$(document).ready(function () {
    COLDIGO.marca.cadastrar = async function () {
        var marca = new Object();
        marca.nome = document.frmAddMarca.nome.value;

        console.log(marca.nome)
        console.log(marca);
        if ((marca.nome == "")) {
            COLDIGO.exibirAviso("Preencha o campo nome!");
        } else {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/marca/add",
                headers: {
                    "Content-type": "application/json"
                },
                data: JSON.stringify(marca), // Sending the data as part of 'data' property
                success: function (mensagem) {
                    COLDIGO.exibirAviso(mensagem.mensagem);
                    $("#addMarca").trigger("reset");
                    COLDIGO.marca.buscar();
                },
                error: function (info) {
                    COLDIGO.exibirAviso("Erro ao cadastrar um novo marca: " + info.status + " " + info.mensagem);
                }
            });
        }
    }

    COLDIGO.marca.buscar = function () {
        var valorBusca = $("#campoBuscaMarca").val();

        $.ajax({
            type: "GET",
            url: `http://localhost:8080/marca/all`,// Use an object for data to let jQuery handle encoding
            success: function (dados) {
                //console.log(dados)
                $("#listaMarcas").html(COLDIGO.marca.exibir(dados))


            },
            error: function (info) {
                COLDIGO.exibirAviso("Erro ao consultar os marcas: " + info.status + " - " + info.statusText);
            }
        });
    }


    COLDIGO.marca.exibir = function (listaDemarcas) {

        var tabela = "<table>" +
            "<tr>" +
            "<th>Id</th>"
            + "<th>Marca</th>"
            + "<th>Status</th>"
            + "<th class='acoes'>Ações</th>"
            + "</tr>";

        if (listaDemarcas != undefined && listaDemarcas.length > 0) {
            for (var i = 0; i < listaDemarcas.length; i++) {



                var statusMarca = listaDemarcas[i].status ? "Ativo" : "Inativo";



                tabela += `
                <tr>
                    <td> ${listaDemarcas[i].id}</td>
                    <td>${listaDemarcas[i].nome}</td >
                    <td>${statusMarca}</td >
                    <td>
                        <a onclick="COLDIGO.marca.exibirEdicao(${listaDemarcas[i].id})"><img src='/img/764599.png' alt='Editar registro'></a>
                        <a onclick="COLDIGO.marca.excluir(${listaDemarcas[i].id})"> <img src='/img/delete-button.svg' alt='Excluir registro'></a>
                        <label class="switch">
                            <input  class="btn_ativa" type="checkbox" onchange="COLDIGO.marca.checkboxClicado(${listaDemarcas[i].id}, this.checked)"
                             ${listaDemarcas[i].status ? 'checked' : ''}>
                        <span class="slider round"></span>
                        </label >
                    </td >
                    </tr > `
            }





        } else if (listaDemarcas == []) {
            tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
        }
        tabela += "</table>";

        return tabela;
    };
    COLDIGO.marca.checkboxClicado = function (idMarca, isChecked) {
        if (isChecked) {
            // Se o checkbox foi marcado, chama a função para reativar a marca
            COLDIGO.marca.reativa(idMarca);
        }
    }




    COLDIGO.marca.buscar();

    COLDIGO.marca.excluir = function (id) {

        console.log(id)
        $.ajax({
            type: "DELETE",
            url: `http://localhost:8080/marca/delete/${id}`,
            success: function (mensagem) {
                COLDIGO.exibirAviso(mensagem.mensagem);
                COLDIGO.marca.buscar();
            },
            error: function (info) {
                COLDIGO.exibirAviso("Erro ao excluir marca: " + info.status + " - " + info.statusText);
            }
        });
    };

    COLDIGO.marca.exibirEdicao = function (id) {
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/marca/busca/${id}`,
            success: function (marca) {
                console.log(marca);
                document.frmEditaMarca.id.value = marca.id;
                document.frmEditaMarca.nome.value = marca.nome;

                var modalEditamarca = {
                    title: "Editar marca",
                    height: 400,
                    width: 550,
                    modal: true,
                    buttons: {
                        "Salvar": function () {
                            COLDIGO.marca.editar();
                        },
                        "Cancelar": function () {
                            $(this).dialog("close");
                        }
                    },
                    close: function () {
                        //caso o usuário simplesmente feche a caixa de edição
                        //não deve acontecer nada
                    }
                };
                $("#modalEditaMarca").dialog(modalEditamarca);
            },
            error: function (info) {
                COLDIGO.exibirAviso("Erro ao buscar marca para edição: " + info.status + " " + info.statusText);
            }
        });
    };

    COLDIGO.marca.editar = function () {
        var marca = new Object();
        marca.id = document.frmEditaMarca.id.value;
        marca.nome = document.frmEditaMarca.nome.value;
        console.log(marca);
        $.ajax({
            type: "PUT",
            url: `http://localhost:8080/marca/update/${marca.id}`,
            headers: {
                "Content-type": "application/json"
            },
            data: JSON.stringify(marca),
            success: function (mensagem) {
                $("#modalEditaMarca").dialog("close");
                COLDIGO.exibirAviso(mensagem.mensagem);
                COLDIGO.marca.buscar();
            },
            error: function (info) {
                COLDIGO.exibirAviso("Erro ao editar marca: " + info.status + " - " + info.mensagem);
            }
        });


    };

    COLDIGO.marca.reativa = function (id) {
        console.log(id)
        $.ajax({
            type: "DELETE",
            url: `http://localhost:8080/marca/reativa/${id}`,
            success: function (mensagem) {
                COLDIGO.exibirAviso(mensagem.mensagem);
                COLDIGO.marca.buscar();
            },
            error: function (info) {
                COLDIGO.exibirAviso("Erro ao excluir marca: " + info.status + " - " + info.mensagem);
            }
        });
    };

});