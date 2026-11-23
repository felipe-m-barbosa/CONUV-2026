package br.com.conuv.crud_produtos.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import br.com.conuv.crud_produtos.entity.Venda;
import br.com.conuv.crud_produtos.service.ServicoVendas;

@RestController
@RequestMapping("/vendas")
public class VendaController {
    private final ServicoVendas servicoVendas;

    public VendaController(ServicoVendas servicoVendas) {
        this.servicoVendas = servicoVendas;
    }

    @PostMapping
    List<Venda> create(@RequestBody Venda venda) {
        return servicoVendas.create(venda);
    }

    @GetMapping
    List<Venda> list() {
        return servicoVendas.list();
    }

    @PutMapping
    List<Venda> update(@RequestBody Venda venda) {
        return servicoVendas.update(venda);
    }

    @DeleteMapping("{id}")
    List<Venda> delete(@PathVariable("id") Long id) {
        return servicoVendas.delete(id);
    }
}