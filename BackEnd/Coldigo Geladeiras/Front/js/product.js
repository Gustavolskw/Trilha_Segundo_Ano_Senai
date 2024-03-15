COLDIGO.produto = new Object();

$(document).ready(function () {

    COLDIGO.produto.carregaMarcas = function () {
        alert("trying to get marcas");
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/rest/marca/buscar",
            success: function (marcas) {
                if (marcas != "") {

                    $("#selMarca").html("");
                    var option = document.createElement("option"); option.setAttribute("value", ""); option.innerHTML = ("Escolha"); $("#selMarca").append(option);
                    for (var i = 0; i < marcas.length; i++) {
                        var option = document.createElement("option"); option.setAttribute("value", marcas[i].id); option.innerHTML = (marcas[i].nome); $("#selMarca").append(option);
                    }
                } else {
                    $("#selMarca").html("");
                    var option = document.createElement("option");
                    option.setAttribute("value", "");
                    option.innerHTML = ("Cadastre uma marca primeiro!");
                    $("#selMarca").append(option);
                    $("#selMarca").addClass("aviso");
                }
            },
            error: function (info) {
                COLDIGO.exibirAviso("Erro ao buscar as marcas: " + info.status + " - " + info.statusText);
                $("#selMarca").html("");
                var option = document.createElement("option");
                option.setAttribute("value", "");
                option.innerHTML = ("Erro ao carregar marcas!");
                $("#selMarca").append(option);
                $("#selMarca").addClass("aviso");
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
            url: "http://localhost:8080/produtos/all",
            data: "valorBusca=" + valorBusca,
            success: function () {
            },
            error: function (info) {
                COLDIGO.exibirAviso("erro ao consultar os produtos" + info.status + "-" + info.statusText);
            }
        });

    }





























});