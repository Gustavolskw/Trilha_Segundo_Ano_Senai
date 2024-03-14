package exemplo.web.DTO;

import exemplo.web.Entity.Produto;

import java.math.BigDecimal;

public record DadosDetalhamentoProdutos(Long id, Integer categoria, String modelo, Integer capacidade, Double valor, Long IdMarca ) {
    public DadosDetalhamentoProdutos(Produto produtos){
        this(produtos.getId(), produtos.getCategoria(), produtos.getModelo(), produtos.getCapacidade(), produtos.getValor(), produtos.getMarca().getId());
    }
}
