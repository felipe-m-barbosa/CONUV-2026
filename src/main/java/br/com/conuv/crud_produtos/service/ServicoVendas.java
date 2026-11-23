package br.com.conuv.crud_produtos.service;

import java.util.List;
import org.springframework.stereotype.Service;
import br.com.conuv.crud_produtos.entity.Cliente;
import br.com.conuv.crud_produtos.entity.Produto;
import br.com.conuv.crud_produtos.entity.Venda;
import br.com.conuv.crud_produtos.repository.RepositorioClientes;
import br.com.conuv.crud_produtos.repository.RepositorioProdutos;
import br.com.conuv.crud_produtos.repository.RepositorioVendas;

@Service
public class ServicoVendas {
    private final RepositorioVendas repositorioVendas;
    private final RepositorioClientes repositorioClientes;
    private final RepositorioProdutos repositorioProdutos;

    public ServicoVendas(RepositorioVendas repositorioVendas, 
                         RepositorioClientes repositorioClientes, 
                         RepositorioProdutos repositorioProdutos) {
        this.repositorioVendas = repositorioVendas;
        this.repositorioClientes = repositorioClientes;
        this.repositorioProdutos = repositorioProdutos;
    }

    public List<Venda> create(Venda venda) {
        // Valida se o cliente existe
        Cliente cliente = repositorioClientes.findById(venda.getCliente().getId())
            .orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));

        // Valida se o produto existe
        Produto produto = repositorioProdutos.findById(venda.getProduto().getId())
            .orElseThrow(() -> new RuntimeException("Produto não encontrado!"));

        venda.setCliente(cliente);
        venda.setProduto(produto);

        // Calcula o valor total automaticamente (preço x quantidade)
        double total = produto.getPreco() * venda.getQuantidade();
        venda.setValorTotal(total);

        repositorioVendas.save(venda);
        return list();
    }

    public List<Venda> update(Venda venda) {
        // Valida se o cliente existe
        Cliente cliente = repositorioClientes.findById(venda.getCliente().getId())
            .orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));

        // Valida se o produto existe
        Produto produto = repositorioProdutos.findById(venda.getProduto().getId())
            .orElseThrow(() -> new RuntimeException("Produto não encontrado!"));

        venda.setCliente(cliente);
        venda.setProduto(produto);

        // Recalcula o valor total automaticamente
        double total = produto.getPreco() * venda.getQuantidade();
        venda.setValorTotal(total);

        repositorioVendas.save(venda);
        return list();
    }

    public List<Venda> list() {
        return repositorioVendas.findAll();
    }

    public List<Venda> delete(Long id) {
        repositorioVendas.deleteById(id);
        return list();
    }
}