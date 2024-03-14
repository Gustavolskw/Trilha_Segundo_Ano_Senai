package exemplo.web.DTO;


import org.antlr.v4.runtime.misc.NotNull;

import java.math.BigDecimal;

public record DadosCadastroProdutos(
        Integer categoria,
        Long marcaId,
        String modelo,
        Integer capacidade,
        Double valor) {
}
