package exemplo.web.services;

import exemplo.web.DTO.DadosCadastroProdutos;
import exemplo.web.DTO.DadosDetalhamentoProdutos;
import exemplo.web.Entity.Produto;
import exemplo.web.Repositories.MarcaRepository;
import exemplo.web.Repositories.ProdutosRepository;
import exemplo.web.validacao.ValidacaoException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProdutoServices {
    @Autowired
    private ProdutosRepository produtosRepository;

    @Autowired
    private MarcaRepository marcaRepository;



    public DadosDetalhamentoProdutos cadastrar(DadosCadastroProdutos dadosDeCadastro) {
        if(!marcaRepository.existsById(dadosDeCadastro.marcaId())){
            throw new ValidacaoException("Id de paciente não Encontrado");
        }
        var marca = marcaRepository.getReferenceById(dadosDeCadastro.marcaId());
        var produto = new Produto(null, dadosDeCadastro.categoria(), dadosDeCadastro.modelo(), dadosDeCadastro.capacidade(), dadosDeCadastro.valor(), marca);
        produtosRepository.save(produto);
        return new  DadosDetalhamentoProdutos(produto);
    }


}
