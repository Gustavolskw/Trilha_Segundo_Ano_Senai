package exemplo.web.Repositories;

import exemplo.web.Entity.Marca;
import exemplo.web.Entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface ProdutosRepository extends JpaRepository<Produto, Long > {
@Query("SELECT p, m.nome AS marca FROM produtos p INNER JOIN marca m ON p.marca = marca WHERE p.modelo LIKE :modelo ORDER BY p.categoria ASC, m.nome ASC, p.modelo ASC")
List<Produto> procuraProdutoOndeModeloLike(String modelo);
@Query("SELECT p FROM produtos p INNER JOIN marca m  WHERE p.marca.id = :id")
    List<Produto> econtrePordutosComIdIgualAoDaMarca(Long id);
@Query("SELECT p FROM produtos p INNER JOIN marca m WHERE p.categoria = :categoria AND p.modelo = :modelo AND p.capacidade = :capacidade AND p.valor = :valor AND m.id = :id ")
List<Produto> VerificaProdutoExistenteComParametrosDeCadastro(Integer categoria, String modelo, Integer capacidade, Double valor, Long id);
}
