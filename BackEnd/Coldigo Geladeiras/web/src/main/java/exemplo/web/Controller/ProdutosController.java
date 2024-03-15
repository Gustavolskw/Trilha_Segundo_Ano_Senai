package exemplo.web.Controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import exemplo.web.DTO.DadosCadastroProdutos;
import exemplo.web.DTO.DadosDetalhamentoProdutos;
import exemplo.web.Entity.Produto;
import exemplo.web.Mensagens.Mensagem;
import exemplo.web.Repositories.ProdutosRepository;
import exemplo.web.services.ProdutoServices;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("produtos")
public class ProdutosController {
    @Autowired
    private ProdutoServices produtoServices;
    @Autowired
    private ProdutosRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/all")
    public ResponseEntity<List<DadosDetalhamentoProdutos>> getAllProdutos(){
        List<DadosDetalhamentoProdutos> produtoList = repository.findAll().stream().map(DadosDetalhamentoProdutos::new).toList();
        return ResponseEntity.ok().body(produtoList);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/add")
    @Transactional
    public ResponseEntity cadastrar (@RequestBody DadosCadastroProdutos dadosCadastro) {
        System.out.println(dadosCadastro);
        var cadastro =  produtoServices.cadastrar(dadosCadastro);
        System.out.println(dadosCadastro);
        return ResponseEntity.ok(new Mensagem("Produto Criado com sucesso"));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    @GetMapping("/{modelo}")
    public ResponseEntity getProdutoByModelo(@PathVariable String modelo) {
        var produtoList = repository.procuraProdutoOndeModeloLike(modelo).stream().map(DadosDetalhamentoProdutos::new);
        return ResponseEntity.status(200).body(produtoList);
    }







}
