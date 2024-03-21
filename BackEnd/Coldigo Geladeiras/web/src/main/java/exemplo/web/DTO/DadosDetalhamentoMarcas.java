package exemplo.web.DTO;

import exemplo.web.Entity.Marca;

public record DadosDetalhamentoMarcas(Long id, String nome, Boolean status) {
    public DadosDetalhamentoMarcas(Marca marca){
        this(marca.getId(), marca.getNome(), marca.getStatus());
    }

}
