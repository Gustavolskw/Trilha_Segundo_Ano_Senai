create schema mercado_adm;

use mercado_adm;

create table vendedor(
idvendedor INT NOT NULL auto_increment,
nome VARCHAR(45),
salario FLOAT,
data_nasci DATE,
idendereco INT UNIQUE,
primary key(idvendedor),
CONSTRAINT fkendereco foreign key(idendereco)
REFERENCES endereco(idendereco)
);

create table endereco(
idendereco INT NOT NULL auto_increment,
rua VARCHAR(45),
bairro VARCHAR(45),
numero INT,
cidade VARCHAR(45),
primary key(idendereco)
);

create view `user_acess_vendedor` as 
select idvendedor, nome, data_nasci; 


use mercado_2;


SELECT v.data_venda, p.descricao FROM vendas v 
INNER JOIN vendas_has_produto vhp ON vhp.idvenda = v.idvenda
INNER JOIN produto p ON p.idproduto = vhp.idproduto
ORDER BY v.data_venda;

SELECT * FROM mercado_2.`vendas recentes`;

select SUM(quantidade) as quant_vendas from vendas_has_produto;

create view `total_de_vendas` as 
select SUM(quantidade) as quant_vendas from vendas_has_produto;

create view `vendas_realizada` as 
select distinct v.idvenda, p.descricao, v.data_venda 
from produto p
inner  join vendas_has_produto vhp on vhp.idproduto = p.idproduto
inner join vendas v on v.idvenda = vhp.idvenda

