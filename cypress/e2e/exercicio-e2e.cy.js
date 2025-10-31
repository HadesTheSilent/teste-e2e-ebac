/// <reference types="cypress" />

const perfil = require('../fixtures/perfil.json')
const paginaProdutos = require('../support/page_objects/paginaProdutos')


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        paginaProdutos.visitarLogin()
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha, { log: false })
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, usertestehades (não é usertestehades? Sair)')

        cy.fixture('produtos').then(dados => {
            paginaProdutos.buscarProduto(dados[0].nomeProduto)
            paginaProdutos.adicionarProdutosCarrinho(dados[0].tamanho, dados[0].cor, dados[0].quantidade)

           
            paginaProdutos.buscarProduto(dados[1].nomeProduto)
            paginaProdutos.adicionarProdutosCarrinho(dados[1].tamanho, dados[1].cor, dados[1].quantidade)
            cy.get('.woocommerce-message').should('contain', dados[1].nomeProduto)

            paginaProdutos.buscarProduto(dados[2].nomeProduto)
            paginaProdutos.adicionarProdutosCarrinho(dados[2].tamanho, dados[2].cor, dados[2].quantidade)
            cy.get('.woocommerce-message').should('contain', dados[2].nomeProduto)

            paginaProdutos.buscarProduto(dados[3].nomeProduto)
            paginaProdutos.adicionarProdutosCarrinho(dados[3].tamanho, dados[3].cor, dados[3].quantidade)
            cy.get('.woocommerce-message').should('contain', dados[3].nomeProduto)

            cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
            cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .view-cart').click()
            cy.get('.checkout-button').click()
            cy.get('#terms').click()
            cy.get('#billing_first_name').clear().type(perfil.nome)
            cy.get('#billing_last_name').clear().type(perfil.sobrenome)
            cy.get('#billing_address_1').clear().type(perfil.endereco)
            cy.get('#billing_city').clear().type(perfil.cidade)
            cy.get('#billing_postcode').clear().type(perfil.cep)
            cy.get('#billing_phone').clear().type(perfil.telefone)

            cy.get('#place_order').click()
            cy.wait(6000)
            cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')

        });


    })
})