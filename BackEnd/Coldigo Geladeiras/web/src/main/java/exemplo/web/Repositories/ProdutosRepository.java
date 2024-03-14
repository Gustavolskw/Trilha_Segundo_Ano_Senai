package exemplo.web.Repositories;

import exemplo.web.Entity.Marca;
import exemplo.web.Entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutosRepository extends JpaRepository<Produto, Long > {
}
