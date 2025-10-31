class paginaProdutos {
    visitarUrl() {
        cy.visit('produtos')
    }
    visitarLogin() {
        cy.visit('minha-conta')
    }
    buscarProduto(nomeProduto) {
        cy.get('input[type="search"], input[name="s"], .search-field').first().clear({ force: true }).type(nomeProduto, { force: true })
        cy.get('.button-search').first().click({ force: true })
        cy.contains('.product', nomeProduto, { matchCase: false }).first().find('a').first().click({ force: true })
    }

    adicionarProdutosCarrinho(tamanho, cor, quantidade) {
        cy.get('.button-variable-item-' + tamanho).scrollIntoView().click({ force: true })
        cy.get('.button-variable-item-' + cor).scrollIntoView().click({ force: true })
        cy.get('body').then($body => {
            if ($body.find('.pswp__top-bar').length) {

                cy.get('.pswp__button--close').click({ force: true })
            }
        })

        cy.get('.input-text, input.qty, .quantity .qty').first().scrollIntoView().clear({ force: true }).type(quantidade, { force: true })
        cy.get('.single_add_to_cart_button').scrollIntoView().click({ force: true })
    }
}

module.exports = new paginaProdutos()