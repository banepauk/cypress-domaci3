class AllGalleriesPage {
    get allGalleriesHeading() {
        return cy.get('h1');
    }
  
    get allGalleries() {
        return cy.get('.grid')
    }
  
    get singleGallery() {
        return cy.get('.cell');
    }
  
    get searchField() {
        return cy.get('input')
    }
  
    get filterBtn() {
        return cy.get('button').first()
    }
  
    get loadMoreBtn() {
        return cy.get('button').last()
    }
  
    search(searchTerm) {
        this.searchField.type(searchTerm)
        this.filterBtn.click()
    }
  }
  
  export const allGalleriesPage = new AllGalleriesPage();