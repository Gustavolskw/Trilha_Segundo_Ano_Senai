package exemplo.web.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="marcas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of="id")
public class Marca {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String nome;
}
