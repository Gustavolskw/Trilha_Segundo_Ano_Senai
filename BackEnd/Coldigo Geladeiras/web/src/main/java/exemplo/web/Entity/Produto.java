package exemplo.web.Entity;

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


}
