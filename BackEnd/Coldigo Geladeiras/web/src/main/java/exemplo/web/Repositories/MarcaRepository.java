package exemplo.web.Repositories;

import exemplo.web.Entity.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;

public interface MarcaRepository extends JpaRepository<Marca, Long > {
    Marca findByNomeLike(String nome);
@Query("SELECT m FROM Marca m  WHERE m.status = true")
    List<Marca> buscaDeMarcasAtivas();
    @Query("UPDATE Marca m SET m.status = false WHERE m.id = :id ")
    void softDeleteMarca(Long id);

    Boolean existsByNome(String nome);
}



