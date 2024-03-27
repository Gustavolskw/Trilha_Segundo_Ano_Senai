SELECT vendas.idvenda, vendas.data_venda FROM vendas INNER JOIN vendas_has_produto ON vendas.idvenda = vendas_has_produto.idvenda 
INNER JOIN produto ON produto.idproduto = vendas_has_produto.idproduto WHERE produto.descricao LIKE "%Escova Dental%";
.
SELECT vendas.data_venda FROM vendas INNER JOIN vendas_has_produto ON vendas.idvenda = vendas_has_produto.idvenda 
INNER JOIN produto ON produto.idproduto = vendas_has_produto.idproduto WHERE produto.descricao LIKE "%Creme dental%";
.
select produto.descricao, vendas.data_venda from vendas inner join vendas_has_produto 
ON vendas_has_produto.idvenda = vendas.idvenda inner join produto 
on vendas_has_produto.idproduto = produto.idproduto where vendas.data_venda = '2021-07-07';
.
SELECT DISTINCT produto.descricao
FROM produto
INNER JOIN vendas_has_produto ON vendas_has_produto.idproduto = produto.idproduto
INNER JOIN vendas ON vendas.idvenda = vendas_has_produto.idvenda
WHERE vendas_has_produto.idproduto = produto.idproduto;
.
select vendas.idvenda, vendas.data_venda from vendas 
inner join vendas_has_produto on vendas.idvenda = vendas_has_produto.idvenda 
inner join produto on produto.idproduto = vendas_has_produto.idproduto
inner join categoria on produto.idcategoria = categoria.idcategoria
where categoria.descricao !="Higiene pessoal"
























