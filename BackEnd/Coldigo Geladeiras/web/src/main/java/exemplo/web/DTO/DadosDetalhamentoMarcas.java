package exemplo.web.DTO;

import exemplo.web.Entity.Marca;

public record DadosDetalhamentoMarcas(Long id, String nome) {
    public DadosDetalhamentoMarcas(Marca marca){
        this(marca.getId(), marca.getNome());
    }

}
