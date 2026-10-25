package br.com.conuv.crud_produtos.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.com.conuv.crud_produtos.entity.Produto;
import br.com.conuv.crud_produtos.repository.RepositorioProdutos;

// A classe de serviço é responsável por implementar a lógica de negócios da aplicação, utilizando o repositório para interagir com o banco de dados e realizar operações relacionadas à entidade Produto.

// para ser passível de injeção de dependência, a classe de serviço deve ser anotada com @Service, indicando que é um componente de serviço gerenciado pelo Spring.
// Injeção de dependência é um padrão de design que permite que objetos sejam fornecidos com suas dependências em vez de criarem ou procurarem por elas, promovendo maior modularidade e testabilidade do código.
// Dependência é um objeto que uma classe precisa para funcionar corretamente, e a injeção de dependência permite que essas dependências sejam fornecidas externamente, facilitando a manutenção e o teste do código.
@Service 
public class ServicoProdutos {

    private RepositorioProdutos repositorioProdutos;

    public ServicoProdutos(RepositorioProdutos repositorioProdutos) {
        this.repositorioProdutos = repositorioProdutos;
    }

    public List<Produto> create(Produto produto) {
        repositorioProdutos.save(produto);
        return list();
    }

    public List<Produto> list() {
        Sort sort = Sort.by("nome").ascending();
        return repositorioProdutos.findAll(sort);
    }

    public List<Produto> update(Produto produto) {
        repositorioProdutos.save(produto);
        return list();

    }

    public List<Produto> delete(Long id) {
        repositorioProdutos.deleteById(id);
        return list();
    }
    
}
