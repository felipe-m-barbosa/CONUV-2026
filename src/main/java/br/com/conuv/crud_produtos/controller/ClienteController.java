package br.com.conuv.crud_produtos.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import br.com.conuv.crud_produtos.entity.Cliente;
import br.com.conuv.crud_produtos.service.ServicoClientes;

@RestController
@RequestMapping("/clientes")
public class ClienteController {
    private final ServicoClientes servicoClientes;

    public ClienteController(ServicoClientes servicoClientes) {
        this.servicoClientes = servicoClientes;
    }

    @PostMapping
    List<Cliente> create(@RequestBody Cliente cliente) {
        return servicoClientes.create(cliente);
    }

    @GetMapping
    List<Cliente> list() {
        return servicoClientes.list();
    }

    @PutMapping
    List<Cliente> update(@RequestBody Cliente cliente) {
        return servicoClientes.update(cliente);
    }

    @DeleteMapping("{id}")
    List<Cliente> delete(@PathVariable("id") Long id) {
        return servicoClientes.delete(id);
    }
}