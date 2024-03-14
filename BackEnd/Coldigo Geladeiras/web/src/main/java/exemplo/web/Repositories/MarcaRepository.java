package exemplo.web.Repositories;

import exemplo.web.Entity.Marca;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarcaRepository extends JpaRepository<Marca, Long > {

}
