package exemplo.web.Entity;

import exemplo.web.DTO.DadosAtualizacaoProduto;
import exemplo.web.DTO.DadosParaAtualizarProduto;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;


@Entity(name = "produtos")
@Table(name = "produtos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of="id")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer categoria;
    private String modelo;
    private Integer capacidade;
    private Double valor;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "marcas_id")
    private Marca marca;

    public void atualizaProduto(DadosParaAtualizarProduto dados){

        if(dados.categoria()!=null){
            this.categoria = dados.categoria();
        }
        if(dados.marca()!=null){
            this.marca = dados.marca();
        }
        if(dados.modelo()!=null){
            this.modelo = dados.modelo();
        }
        if(dados.capacidade()!=null){
            this.capacidade = dados.capacidade();
        }
        if(dados.valor()!=null){
            this.valor = dados.valor();
        }

    }

}
