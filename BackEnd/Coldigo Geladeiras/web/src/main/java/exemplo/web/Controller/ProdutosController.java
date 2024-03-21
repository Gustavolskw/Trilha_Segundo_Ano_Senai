package exemplo.web.Controller;

import exemplo.web.DTO.DadosAtualizacaoProduto;
import exemplo.web.DTO.DadosCadastroProdutos;
import exemplo.web.DTO.DadosDetalhamentoProdutosComMarca;
import exemplo.web.Entity.Produto;
import exemplo.web.Mensagens.Mensagem;
import exemplo.web.Repositories.ProdutosRepository;
import exemplo.web.services.MercadoServices;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("produtos")
public class ProdutosController {
    @Autowired
    private MercadoServices mercadoServices;
    @Autowired
    private ProdutosRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/")
    public ResponseEntity<List<DadosDetalhamentoProdutosComMarca>> getAllProdutos(){
        List<DadosDetalhamentoProdutosComMarca> produtoList = repository.findAll().stream().map(DadosDetalhamentoProdutosComMarca::new).toList();
        return ResponseEntity.ok().body(produtoList);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/add")
    @Transactional
    public ResponseEntity cadastrar (@RequestBody DadosCadastroProdutos dadosCadastro) {
        System.out.println(dadosCadastro);
        String  resposta =  mercadoServices.cadastrar(dadosCadastro);
        System.out.println(resposta);
        return ResponseEntity.ok(new Mensagem(resposta));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    @GetMapping("/{modelo}")
    public ResponseEntity getProdutoByModelo(@PathVariable String modelo) {
        var produtoList = repository.procuraProdutoOndeModeloLike("%"+modelo+"%").stream().map(DadosDetalhamentoProdutosComMarca::new);
        return ResponseEntity.status(200).body(produtoList);
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    @GetMapping("/busca/{id}")
    public ResponseEntity getProdutoByID(@PathVariable Long id) {
        Produto produto = repository.getReferenceById(id);
        return ResponseEntity.status(200).body(new DadosDetalhamentoProdutosComMarca(produto));
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    @DeleteMapping("/delete/{id}")
    public ResponseEntity getProdutoByModelo(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.status(200).body(new Mensagem("Produto Deletado com sucesso"));
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/update/{id}")
    @Transactional
    public ResponseEntity updatePorduto(@PathVariable Long id, @RequestBody DadosAtualizacaoProduto dadosAtualizacaoProduto){
        try{
            mercadoServices.atualizar(id , dadosAtualizacaoProduto);
        }catch (Exception e){
            return ResponseEntity.status(400).body(new Mensagem("Produto Não Atualizado!!!"));
        }
        return ResponseEntity.status(200).body(new Mensagem("Produto Atualizado com sucesso!"));
    }

//Rota de Erro para Testes
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/busca/erro")
    public ResponseEntity pegaStringErro() {
        String nula = "";
        return ResponseEntity.ok().body(nula);
    }











}
