COLDIGO.produto = new Object();

$(document).ready(function () {

    COLDIGO.produto.carregaMarcas = function (id) {
        let select;
        if (id != undefined) {
            select = "#selMarcaEdicao"
        } else {
            select = "#selMarca"
        }
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/marca/",
            success: function (marcas) {
                if (marcas != "") {

                    $(select).html("");
                    var option = document.createElement("option"); option.setAttribute("value", ""); option.innerHTML = ("Escolha"); $(select).append(option);
                    for (var i = 0; i < marcas.length; i++) {
                        var option = document.createElement("option");

                        option.setAttribute("value", marcas[i].id);

                        if ((id != undefined) && (id == marcas[i].id))
                            option.setAttribute("selected", "selected");

                        option.innerHTML = (marcas[i].nome);
                        $(select).append(option);
                    }
                } else {
                    $(select).html("");
                    var option = document.createElement("option");
                    option.setAttribute("value", "");
                    option.innerHTML = ("Cadastre uma marca primeiro!");
                    $(select).append(option);
                    $(select).addClass("aviso");
                }
            },
            error: function (info) {
                COLDIGO.exibirAviso("Erro ao buscar as marcas: " + info.status + " - " + info.statusText);
                $(select).html("");
                var option = document.createElement("option");
                option.setAttribute("value", "");
                option.innerHTML = ("Erro ao carregar marcas!");
                $(select).append(option);
                $(select).addClass("aviso");
            }
        });


    }

    COLDIGO.produto.carregaMarcas();
    COLDIGO.produto.cadastrar = async function () {
        var produto = new Object();
        produto.categoria = document.frmAddProduto.categoria.value;
        produto.marcaId = document.frmAddProduto.marcaId.value;
        produto.modelo = document.frmAddProduto.modelo.value;
        produto.capacidade = document.frmAddProduto.capacidade.value;
        produto.valor = document.frmAddProduto.valor.value;

        console.log(produto.categoria)
        console.log(produto.marcaId);
        console.log(produto.modelo);
        console.log(produto);
        if ((produto.categoria == "") || (produto.marcaId == "") || (produto.modelo == "")
            || (produto.capacidade == "") || (produto.valor == "")) {
            COLDIGO.exibirAviso("Preencha todos os campos!");
        } else {
            /*
                        const connex = await fetch("http://localhost:8080/produtos/add", {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify(produto),
                            success: function (msg) {
                                COLDIGO.exibirAviso(msg);
                                $("#addProduto").trigger("reset");
                            },
                            error: function (info) {
                                COLDIGO.exibirAviso("Erro ao cadastrar um novo produto: " + info.status + " " + info.statusText);
                            }
                        });
            */
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/produtos/add",
                headers: {
                    "Content-type": "application/json"
                },
                data: JSON.stringify(produto), // Sending the data as part of 'data' property
                success: function (mensagem) {
                    COLDIGO.exibirAviso(mensagem.mensagem);
                    $("#addProduto").trigger("reset");
                    COLDIGO.produto.buscar();
                },
                error: function (info) {
                    COLDIGO.exibirAviso("Erro ao cadastrar um novo produto: " + info.status + " " + info.statusText);
                }
            });
        }
    }

    COLDIGO.produto.buscar = function () {
        var valorBusca = $("#campoBuscaProduto").val();

        $.ajax({
            type: "GET",
            url: `http://localhost:8080/produtos/${valorBusca}`,
            data: { valorBusca: valorBusca }, // Use an object for data to let jQuery handle encoding
            success: function (dados) {
                //console.log(dados)
                $("#listaProdutos").html(COLDIGO.produto.exibir(dados))


            },
            error: function (info) {
                COLDIGO.exibirAviso("Erro ao consultar os produtos: " + info.status + " - " + info.statusText);
            }
        });
    }

    COLDIGO.produto.exibir = function (listaDeProdutos) {

        var tabela = "<table>" +
            "<tr>" +
            "<th>Categoria</th>"
            + "<th>Marca</th>"
            + "<th>Modelo</th>"
            + "<th>Cap.(1)</th>"
            + "<th>Valor</th>"
            + "<th class='acoes'>Ações</th>"
            + "</tr>";

        if (listaDeProdutos != undefined && listaDeProdutos.length > 0) {
            for (var i = 0; i < listaDeProdutos.length; i++) {
                if (listaDeProdutos[i].categoria == 1) {
                    listaDeProdutos[i].categoria = "Geladeira"
                } else if (listaDeProdutos[i].categoria == 2) {
                    listaDeProdutos[i].categoria = "Freezer"
                }
                tabela += `
                <tr>
                    <td> ${listaDeProdutos[i].categoria}</td>
                    <td> ${listaDeProdutos[i].marca}</td>
                    <td> ${listaDeProdutos[i].modelo}</td>
                    <td> ${listaDeProdutos[i].capacidade}</td>
                    <td>R$${listaDeProdutos[i].valor}</td >
                    <td>
                        <a onclick="COLDIGO.produto.exibirEdicao(${listaDeProdutos[i].id})"><img src='/img/764599.png' alt='Editar registro'></a>
                        <a onclick="COLDIGO.produto.excluir(${listaDeProdutos[i].id})"> <img src='/img/delete-button.svg' alt='Excluir registro'></a>
                    </td >
                    </tr > `
            }



        } else if (listaDeProdutos == []) {
            tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
        }
        tabela += "</table>";
        return tabela;
    };

    COLDIGO.produto.buscar();

    COLDIGO.produto.excluir = function (id) {

        console.log(id)
        $.ajax({
            type: "DELETE",
            url: `http://localhost:8080/produtos/delete/${id}`,
            success: function (mensagem) {
                COLDIGO.exibirAviso(mensagem.mensagem);
                COLDIGO.produto.buscar();
            },
            error: function (info) {
                COLDIGO.exibirAviso("Erro ao excluir produto: " + info.status + " " + info.statusText);
            }
        });
    };

    COLDIGO.produto.exibirEdicao = function (id) {
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/produtos/busca/${id}`,
            success: function (produto) {
                console.log(produto);
                document.frmEditaProduto.idProduto.value = produto.id;
                document.frmEditaProduto.modelo.value = produto.modelo;
                document.frmEditaProduto.capacidade.value = produto.capacidade;
                document.frmEditaProduto.valor.value = produto.valor;

                var selCategoria = document.getElementById('selCategoriaEdicao');
                for (var i = 0; i < selCategoria.length; i++) {
                    if (selCategoria.options[i].value == produto.categoria) {
                        selCategoria.options[i].setAttribute("selected", "selected");
                    } else {
                        selCategoria.options[i].removeAttribute("selected");
                    }
                }

                COLDIGO.produto.carregaMarcas(produto.marcaId);
                var modalEditaProduto = {
                    title: "Editar Produto",
                    height: 400,
                    width: 550,
                    modal: true,
                    buttons: {
                        "Salvar": function () {
                            COLDIGO.produto.editar();
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
                $("#modalEditaProduto").dialog(modalEditaProduto);
            },
            error: function (info) {
                COLDIGO.exibirAviso("Erro ao buscar produto para edição: " + info.status + " " + info.statusText);
            }
        });
    };

    COLDIGO.produto.editar = function () {
        var produto = new Object();
        produto.id = document.frmEditaProduto.idProduto.value;
        produto.categoria = document.frmEditaProduto.categoria.value;
        produto.marcaId = document.frmEditaProduto.marcald.value;
        produto.modelo = document.frmEditaProduto.modelo.value;
        produto.capacidade = document.frmEditaProduto.capacidade.value;
        produto.valor = document.frmEditaProduto.valor.value;
        console.log(produto);
        $.ajax({
            type: "PUT",
            url: `http://localhost:8080/produtos/update/${produto.id}`,
            headers: {
                "Content-type": "application/json"
            },
            data: JSON.stringify(produto),
            success: function (mensagem) {
                $("#modalEditaProduto").dialog("close");
                COLDIGO.exibirAviso(mensagem.mensagem);
                COLDIGO.produto.buscar();
            },
            error: function (info) {
                COLDIGO.exibirAviso("Erro ao editar produto: " + info.status + " - " + info.mensagem);
            }
        });


    };
});