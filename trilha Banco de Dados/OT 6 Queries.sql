use mercado_adm;

DELIMITER //
CREATE TRIGGER verifica_salario_minimo
BEFORE UPDATE ON vendedor
FOR EACH ROW
BEGIN
    IF NEW.salario < OLD.salario THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'O salário não pode ser alterado para um valor menor do que o já cadastrado.';
    END IF;
END;
//
DELIMITER ;


insert into endereco(idendereco, rua, bairro, numero, cidade) values(8, "jaose fredo", "jailson", 556, "Sao Paulo");

update endereco set rua = "sai fora", bairro = "nada" where idendereco = 8;

insert into vendedor(nome, salario, data_nasci, idendereco) values ("gustavo", 4500, '2003-10-08', 1);
/*teste */
update vendedor set salario = 4601;

DELIMITER //
CREATE TRIGGER verifica_salario_menor
BEFORE INSERT ON vendedor
FOR EACH ROW
BEGIN
    IF NEW.salario < 1200 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'O salário não pode ser menor que R$1200,00.';
    END IF;
END;
//
DELIMITER ;

insert into vendedor(nome, salario, data_nasci, idendereco) values ("joao", 1200, '2003-11-02', 2);

create table vendedor_deletado(
idvendedor INT NOT NULL auto_increment,
nome VARCHAR(45),
salario FLOAT,
data_nasci DATE,
idendereco INT ,
primary key(idvendedor)
);

DELIMITER //
CREATE TRIGGER verifica_salva_usuario_deletado_na_memoria
BEFORE DELETE ON vendedor
FOR EACH ROW
BEGIN
    INSERT INTO vendedor_deletado(nome, salario, data_nasci, idendereco) values (OLD.nome, OLD.salario, OLD.data_nasci, OLD.idendereco);
END;
//
DELIMITER ;
DELETE FROM vendedor WHERE idvendedor = 1;