package exemplo.web.Entity;

import exemplo.web.DTO.DadosCadastroMarca;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private Boolean status;


    public Marca(DadosCadastroMarca dados, Boolean status){
        this.nome = dados.nome();
        this.status = status;
    }
    public void softDeleteMarca(){
        this.status = false;
    }

    public void reativaMarca() {
        this.status = true;
    }
}
