package br.com.conuv.crud_produtos.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.conuv.crud_produtos.entity.Produto;
import br.com.conuv.crud_produtos.service.ServicoProdutos;

// O controller é responsável por receber as requisições HTTP, processá-las e retornar as respostas apropriadas. Ele atua como uma camada intermediária entre o cliente (front-end) e a lógica de negócios (serviço), delegando as operações para o serviço correspondente.

@RestController
@RequestMapping("/produtos") // aqui, a anotação @RequestMapping define o caminho base para todas as rotas do controller, que neste caso é "/produtos". Isso significa que todas as requisições HTTP que chegarem a esse caminho serão tratadas por este controller.
public class ProdutoController {
    ServicoProdutos servicoProdutos;

    public ProdutoController(ServicoProdutos servicoProdutos) {
        this.servicoProdutos = servicoProdutos;
    }

    // Preciso expor essas operações para criar endpoints REST (pontos de acesso), para que o front-end possa interagir com a aplicação. Para isso, vou utilizar as anotações do Spring Boot, como @GetMapping, @PostMapping, @PutMapping e @DeleteMapping, que correspondem aos métodos HTTP GET, POST, PUT e DELETE, respectivamente. Essas anotações permitem mapear as requisições HTTP para os métodos do controller, facilitando a criação de endpoints RESTful.

    @PostMapping
    List<Produto> create(@RequestBody Produto produto){ //RequestBody é uma anotação que indica que o corpo da requisição HTTP deve ser mapeado para o objeto Produto, permitindo que os dados enviados pelo cliente sejam convertidos automaticamente em uma instância da classe Produto.
        // Implementar a lógica para criar um novo produto
        return servicoProdutos.create(produto);
    }

    @GetMapping
    List<Produto> list(){
        // Implementar a lógica para listar todos os produtos
        return servicoProdutos.list();
    }

    @PutMapping
    List<Produto> update(@RequestBody Produto produto){
        // Implementar a lógica para atualizar um produto existente
        return servicoProdutos.update(produto);
    }

    @DeleteMapping("{id}") // isso significa que passamos um parâmetro na rota, que é o ID do produto a ser deletado. O valor do ID será extraído da URL da requisição e passado para o método delete como argumento.
    List<Produto> delete(@PathVariable("id") Long id){ //PathVariable é uma anotação que indica que o valor do parâmetro "id" na URL da requisição HTTP deve ser mapeado para o parâmetro "id" do método delete. Isso permite que o valor do ID do produto a ser deletado seja extraído diretamente da URL da requisição.
        // Implementar a lógica para deletar um produto existente
        return servicoProdutos.delete(id);
    }
}
