package exemplo.web.Controller;

import exemplo.web.DTO.DadosDetalhamentoMarcas;
import exemplo.web.Repositories.MarcaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("rest/marca")
public class MarcaController {
    @Autowired
private MarcaRepository repository;
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/buscar")
    public ResponseEntity<List<DadosDetalhamentoMarcas>> getAllMarcas(){
        List<DadosDetalhamentoMarcas> marcasList = repository.findAll().stream().map(DadosDetalhamentoMarcas::new).toList();
        return ResponseEntity.ok().body(marcasList);
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/buscar/erro")
    public ResponseEntity pegaStringErro(){
        String nula = "";
        return ResponseEntity.ok().body(nula);
    }

}
