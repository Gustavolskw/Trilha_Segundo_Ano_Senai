package exemplo.web.DTO;


public record DadosAtualizacaoProduto(Long id,
                                      Integer categoria,
                                      Long marcaId,
                                      String modelo,
                                      Integer capacidade,
                                      Double valor) {
}
