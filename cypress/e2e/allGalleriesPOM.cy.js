/// <reference types="Cypress" />
import {allGalleriesPage} from '../page_objects/allGalleries'

describe('all galleries page test', () => {
    beforeEach('visit', () => {
        cy.visit('/');
        cy.url().should('contains', 'gallery-app');
        allGalleriesPage.allGalleriesHeading.should('be.visible')
        allGalleriesPage.searchField.should('be.visible')
        
    })

    xit('test pagination', () => {
        allGalleriesPage.singleGallery.should('have.length', 10)
        allGalleriesPage.loadMoreBtn.click()
        allGalleriesPage.singleGallery.should('have.length', 20)
        allGalleriesPage.allGalleries.children().first().should('have.class', 'cell');
        allGalleriesPage.loadMoreBtn.click();
        allGalleriesPage.allGalleries.children().should('have.length', 20);
    })    
    
    it('test search', ()=>{
        allGalleriesPage.search('test');
        allGalleriesPage.singleGallery.should('have.length',10)
        allGalleriesPage.allGalleriesHeading.should('be.visible')
        allGalleriesPage.searchField.should('be.visible')
        allGalleriesPage.loadMoreBtn.click()
        allGalleriesPage.singleGallery.should('have.length', 13)
    })
  
    
})