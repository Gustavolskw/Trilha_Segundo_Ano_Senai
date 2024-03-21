package exemplo.web.DTO;

import exemplo.web.Entity.Marca;
import exemplo.web.Entity.Produto;

public record DadosDetalhamentoProdutosComMarca(Long id, Integer categoria, String modelo, Integer capacidade, Double valor, String marca, Long marcaId ) {
    public DadosDetalhamentoProdutosComMarca(Produto produtos){
        this(produtos.getId(), produtos.getCategoria(), produtos.getModelo(), produtos.getCapacidade(), produtos.getValor(), produtos.getMarca().getNome(), produtos.getMarca().getId());
    }
}
