/// <reference types="cypress" />

describe("synopsis", () =>{

    
    it.skip('Deve realizar uma busca pela lista', () => {
        cy.visit("localhost:8080")
        cy.get("[data-cy=cookie]").click()
        // cy.get buscando elemento
        // type escrevendo nele
        cy.get("[data-cy=search]").type("Dom casmurro")
        cy.get("[data-cy=search0]").click()
    })
    it('Deve realizar uma busca pela lista', () => {
        cy.visit("localhost:8080")
        cy.get("[data-cy=cookie]").click()
        // cy.get buscando elemento
        // type escrevendo nele
        cy.get("[data-cy=search]").type("dom")
        
        
        cy.get("[data-cy=button-search]").click()

    })
    it("Deve abrir ver mais de um livro", () => {
        
    })
    it("Deve ver mais detalhes de livro recomendado", () => {
        
    })
})