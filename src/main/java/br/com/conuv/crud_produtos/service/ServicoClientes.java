package br.com.conuv.crud_produtos.service;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import br.com.conuv.crud_produtos.entity.Cliente;
import br.com.conuv.crud_produtos.repository.RepositorioClientes;

@Service
public class ServicoClientes {
    private final RepositorioClientes repositorioClientes;

    public ServicoClientes(RepositorioClientes repositorioClientes) {
        this.repositorioClientes = repositorioClientes;
    }

    public List<Cliente> create(Cliente cliente) {
        repositorioClientes.save(cliente);
        return list();
    }

    public List<Cliente> list() {
        return repositorioClientes.findAll(Sort.by("nome").ascending());
    }

    public List<Cliente> update(Cliente cliente) {
        repositorioClientes.save(cliente);
        return list();
    }

    public List<Cliente> delete(Long id) {
        repositorioClientes.deleteById(id);
        return list();
    }
}