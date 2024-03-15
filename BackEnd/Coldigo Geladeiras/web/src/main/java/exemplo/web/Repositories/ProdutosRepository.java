package exemplo.web.Repositories;

import exemplo.web.Entity.Marca;
import exemplo.web.Entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProdutosRepository extends JpaRepository<Produto, Long > {
@Query("SELECT p, m.nome AS marca FROM produtos p INNER JOIN marca m ON p.marca = marca WHERE p.modelo LIKE '%frios%' ORDER BY p.categoria ASC, m.nome ASC, p.modelo ASC")
List<Produto> procuraProdutoOndeModeloLike(String modelo);
//    List<Produto> findProdutoWithMarcaNameByModeloContaining(String modelo);



}
