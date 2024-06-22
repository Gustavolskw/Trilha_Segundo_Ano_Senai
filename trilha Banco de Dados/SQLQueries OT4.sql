select Count(vendas.idvenda) as total_vendas_escovas from vendas 
inner join vendas_has_produto on vendas_has_produto.idvenda = vendas.idvenda
inner join produto on produto.idproduto = vendas_has_produto.idproduto 
where produto.descricao Like "%escova dental%";
.
select vendas_has_produto.idvenda, Sum(vendas_has_produto.quantidade * produto.preco) as total_da_venda
from vendas_has_produto 
inner join vendas on vendas_has_produto.idvenda = vendas.idvenda
inner join produto on produto.idproduto = vendas_has_produto.idproduto
where vendas_has_produto.idvenda = 2
.
select produto.*, categoria.descricao as descricao from produto 
inner join categoria on categoria.idcategoria = produto.idcategoria
where categoria.descricao Like "%higiene pessoal%" and produto.descricao Like "%dental%"
.
select produto.*, categoria.descricao as descricao from produto 
inner join categoria on categoria.idcategoria = produto.idcategoria
where categoria.descricao Like "%higiene pessoal%" or categoria.descricao like "%limpeza%"
.
select FORMAT(avg(produto.preco),2) as media_produtos from vendas_has_produto
 inner join produto on produto.idproduto = vendas_has_produto.idproduto 
 inner join vendas on vendas.idvenda = vendas_has_produto.idvenda
 where DAY(vendas.data_venda) = "21"
 and month(vendas.data_venda) = "01";
 
 select prod.idproduto, prod.descricao, prod.preco, prod.idcategoria, cat.descricao from produto prod
 left join categoria cat on prod.idcategoria = cat.idcategoria 
 where cat.descricao NOT LIKE "%casa%";
 
select prod.preco as maior_preco, prod.descricao
from produto prod
where prod.preco = (select MAX(preco) from produto prod);

SELECT vend_p.idproduto, SUM(vend_p.quantidade) AS total_de_vendas 
FROM vendas_has_produto vend_p
INNER JOIN produto prod ON prod.idproduto = vend_p.idproduto
GROUP BY vend_p.idproduto
HAVING SUM(vend_p.quantidade) = (
    SELECT MAX(total_vendas) 
    FROM (
        SELECT SUM(quantidade) AS total_vendas 
        FROM vendas_has_produto 
        GROUP BY idproduto
    ) AS max_vendas
);

SELECT vendas.idvenda, vendas.data_venda, SUM(vendas_has_produto.quantidade) as quantidade_vendida
from vendas_has_produto  
INNER JOIN vendas ON vendas_has_produto.idvenda = vendas.idvenda
GROUP BY vendas.idvenda, vendas.data_venda
HAVING SUM(vendas_has_produto.quantidade) = (
	SELECT  MIN(total_quantidade)
	FROM (
	SELECT SUM(quantidade) as total_quantidade
	FROM vendas_has_produto 
	GROUP BY idvenda
	) AS quantidades_por_venda
);

SELECT DISTINCT p.idproduto, cat.descricao as nome_categoria 
FROM produto p
INNER JOIN categoria cat ON cat.idcategoria = p.idcategoria 
INNER JOIN vendas_has_produto vhp ON vhp.idproduto = p.idproduto
INNER JOIN vendas v ON v.idvenda = vhp.idvenda ;


SELECT SUM(vhp.quantidade) as quantidade_vendida
FROM vendas_has_produto vhp
INNER JOIN vendas v ON v.idvenda = vhp.idvenda
WHERE DAY(v.data_venda) BETWEEN "20" AND "22"
AND MONTH(v.data_venda) = "11";
 