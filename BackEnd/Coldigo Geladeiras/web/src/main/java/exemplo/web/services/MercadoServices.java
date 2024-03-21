package exemplo.web.services;

import exemplo.web.DTO.*;
import exemplo.web.Entity.Marca;
import exemplo.web.Entity.Produto;
import exemplo.web.Repositories.MarcaRepository;
import exemplo.web.Repositories.ProdutosRepository;
import exemplo.web.validacao.ValidacaoException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MercadoServices {
    @Autowired
    private ProdutosRepository produtosRepository;

    @Autowired
    private MarcaRepository marcaRepository;


    public String cadastrar(DadosCadastroProdutos dadosDeCadastro) {
        if (!marcaRepository.existsById(dadosDeCadastro.marcaId())) {
           return "Id de Marca não Encontrado";
        }
        
        var marca = marcaRepository.getReferenceById(dadosDeCadastro.marcaId());
        List<Produto> produtos = produtosRepository.VerificaProdutoExistenteComParametrosDeCadastro(dadosDeCadastro.categoria(), dadosDeCadastro.modelo(), dadosDeCadastro.capacidade(), dadosDeCadastro.valor(), marca.getId());
        if(produtos.isEmpty()){
            var produto = new Produto(null, dadosDeCadastro.categoria(), dadosDeCadastro.modelo(), dadosDeCadastro.capacidade(), dadosDeCadastro.valor(), marca);
            produtosRepository.save(produto);
            return "Sucesso ao cadastrar Produto!";
        }
return "Produto ja existente";
    }
    public void atualizar(Long id, DadosAtualizacaoProduto dadosAtualizacao) {
        if (!marcaRepository.existsById(dadosAtualizacao.marcaId())) {
            throw new ValidacaoException("Id de Marca não Encontrado");
        }
        var produto = produtosRepository.getReferenceById(id);
        var marca = marcaRepository.getReferenceById(dadosAtualizacao.marcaId());

        produto.atualizaProduto(new DadosParaAtualizarProduto(dadosAtualizacao.categoria(), marca, dadosAtualizacao.modelo(), dadosAtualizacao.capacidade(), dadosAtualizacao.valor()));
        produtosRepository.save(produto);

    }
    public String deletarMarca(Long id){
        if (!marcaRepository.existsById(id)) {
            return "Id de Marca não Encontrado";
        }
        var marca = marcaRepository.getReferenceById(id);
        List<Produto> produtos = produtosRepository.econtrePordutosComIdIgualAoDaMarca(marca.getId());
        if(produtos.isEmpty()){
            marca.softDeleteMarca();
//            marcaRepository.softDeleteMarca(id);
            return "sucesso ao deletar marca";
        }
        return "Marca sendo usada em um ou mais produtos";
    }


    public String cadastrarMarca(DadosCadastroMarca dados) {
        if(marcaRepository.existsByNome(dados.nome())){
            return "Marca ja existente";
        }
        var marcaNova = new Marca(dados, true);
        marcaRepository.save(marcaNova);
        return "Marca Cadastrada com sucesso";
    }

    public void atualizarMarca(Long id , DadosAtualizacaoMarca dados) {
        if(!marcaRepository.existsById(id)){
            throw new ValidacaoException("Id Marca não existe");
        }
        var marca = marcaRepository.getReferenceById(id);
        marca.setNome(dados.nome());
    }

    public String reativaMarca(Long id) {
        if (!marcaRepository.existsById(id)) {
            return "Id de Marca não Encontrado";
        }
        var marca = marcaRepository.getReferenceById(id);
            marca.reativaMarca();
            return "sucesso ao Reativar marca";

    }
}
