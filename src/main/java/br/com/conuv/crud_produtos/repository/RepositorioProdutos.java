package br.com.conuv.crud_produtos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.conuv.crud_produtos.entity.Produto;

// Repositório é interface de interação com o banco de dados, que permite realizar operações de CRUD (Create, Read, Update, Delete) em entidades do tipo Produto.

public interface RepositorioProdutos extends JpaRepository<Produto, Long> {

}

