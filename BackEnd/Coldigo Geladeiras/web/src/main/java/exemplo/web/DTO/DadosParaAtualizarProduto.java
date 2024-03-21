package exemplo.web.DTO;

import exemplo.web.Entity.Marca;

public record DadosParaAtualizarProduto(Integer categoria,
                                        Marca marca,
                                        String modelo,
                                        Integer capacidade,
                                        Double valor) {
}
