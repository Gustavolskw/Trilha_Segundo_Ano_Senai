package exemplo.web.Controller;

import exemplo.web.DTO.DadosAtualizacaoMarca;
import exemplo.web.DTO.DadosCadastroMarca;
import exemplo.web.DTO.DadosDetalhamentoMarcas;
import exemplo.web.DTO.DadosDetalhamentoProdutosComMarca;
import exemplo.web.Entity.Marca;
import exemplo.web.Entity.Produto;
import exemplo.web.Mensagens.Mensagem;
import exemplo.web.Repositories.MarcaRepository;
import exemplo.web.services.MercadoServices;
import jakarta.transaction.Transactional;
import org.apache.logging.log4j.message.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("marca")
public class MarcaController {
    @Autowired
    private MarcaRepository repository;

    @Autowired
    private MercadoServices mercadoServices;
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/")
    public ResponseEntity<List<DadosDetalhamentoMarcas>> getAllMarcasAtivas(){
        List<DadosDetalhamentoMarcas> marcasList = repository.buscaDeMarcasAtivas().stream().map(DadosDetalhamentoMarcas::new).toList();
        return ResponseEntity.ok().body(marcasList);
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/all")
    public ResponseEntity<List<DadosDetalhamentoMarcas>> getAllMarcas(){
        List<DadosDetalhamentoMarcas> marcasList = repository.findAll().stream().map(DadosDetalhamentoMarcas::new).toList();
        return ResponseEntity.ok().body(marcasList);
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    @GetMapping("/busca/{id}")
    @Transactional
    public ResponseEntity getMarcaByID(@PathVariable Long id) {
        Marca marca = repository.getReferenceById(id);
        return ResponseEntity.status(200).body(new DadosDetalhamentoMarcas(marca));
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/add")
    @Transactional
    public ResponseEntity cadastroMarca(@RequestBody DadosCadastroMarca dados){
       String  resposta =  mercadoServices.cadastrarMarca(dados);
        return  ResponseEntity.status(200).body(new Mensagem(resposta));
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity DeleteMarca(@PathVariable Long id){
        try{
          String resposta = mercadoServices.deletarMarca(id);
            return ResponseEntity.ok().body(new Mensagem(resposta));
        }catch (Exception e){
            return ResponseEntity.ok().body(new Mensagem("erro ao Deletar marca ERRO do servidor"));
        }


    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/update/{id}")
    @Transactional
    public ResponseEntity alterarMarca (@PathVariable Long id, @RequestBody DadosAtualizacaoMarca dados){
        try{
        mercadoServices.atualizarMarca(id, dados);
        }catch (Exception e ){
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok().body(new Mensagem("Marca Alterada com sucesso!!!"));
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/reativa/{id}")
    @Transactional
    public ResponseEntity reativaMarca (@PathVariable Long id){
        try{
            mercadoServices.reativaMarca(id);
        }catch (Exception e ){
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok().body(new Mensagem("Marca Reativada com sucesso!!!"));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/buscar/erro")
    public ResponseEntity pegaStringErro(){
        String nula = "";
        return ResponseEntity.ok().body(nula);
    }

}
