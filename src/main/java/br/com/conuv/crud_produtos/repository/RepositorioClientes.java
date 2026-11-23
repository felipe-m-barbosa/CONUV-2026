package br.com.conuv.crud_produtos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.conuv.crud_produtos.entity.Cliente;

public interface RepositorioClientes extends JpaRepository<Cliente, Long> {
}