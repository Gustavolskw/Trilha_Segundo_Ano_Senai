COLDIGO.produto = new Object();

$(document).ready(function () {
	
    COLDIGO.produto.carregaMarcas = function () {
        alert("trying to get marcas");
        $.ajax({
            type: "GET",
            url: "/exemploWeb/rest/marca/buscar",
            success: function () {
                alert("sucesso");
            },
            error: function (info) {
               COLDIGO.exibirAviso ("Erro ao buscar as marcas: "+ info.status +" - "+info.statusText);
				$("#selMarca").html("");
				var option = document.createElement("option");
				option.setAttribute ("value", "");
				option.innerHTML =("Erro ao carregar marcas!");
				$("#selMarca").append(option);
				$("#selMarca").addClass("aviso");
            }
        });
    }

    COLDIGO.produto.carregaMarcas();
});