/// <reference types="Cypress" />
import { create } from '../page_objects/createGallery'
const faker = require ('@faker-js/faker')

describe('create gallery', () =>{
  let email = 'test2223@gmail.com'
  let password = 'test22232' 
  let validTitle = faker.random.alpha({ count: 5 });
  let invalidTitle = faker.random.alpha({ count: 1500 })
  let shortTitle = faker.random.alpha({ count: 1})
  let validDescription = faker.random.alpha({ count: 10 })
  let invalidDescription = faker.random.alpha({ count: 1500 })
  let validUrl = 'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg'
  let wrongUrl = 'https://upload.mp3'

  beforeEach('login and create', () =>{
    cy.visit('/create')
    create.login(email, password)
    cy.url().should('not.contain', '/login')
   // cy.visit('/create')
    //create.createHeading.should('be.visible')
    
  })

  it('descrption > 1500 characters', () =>{ 
    cy.visit('/create')
    create.descriptionWith1000Char(validTitle, invalidDescription, validUrl);
    cy.url().should('include', '/create');
    create.createHeading.should('be.visible')
      .and('have.text', 'Create Gallery')
      .and('have.css', 'color', 'rgb(72, 73, 75)')
    create.titleInput.should('be.visible')
  })

  it('without title', () =>{
    cy.visit('/create')
    create.withoutTitle(validDescription,validUrl);
    cy.url().should('include', '/create');
    create.createHeading.should('be.visible')
      .and('have.text', 'Create Gallery')
      .and('have.css', 'color', 'rgb(72, 73, 75)')
    create.titleInput.should('be.visible')
  })

  it('title < 2 character', () =>{
    cy.visit('/create')
    create.titleContainLess2character(shortTitle, validDescription, validUrl);
    cy.url().should('include', '/create');
    create.createHeading.should('be.visible')
      .and('have.text', 'Create Gallery')
      .and('have.css', 'color', 'rgb(72, 73, 75)')
    create.errorMessage.should('be.visible')
      .and('have.text', 'The title must be at least 2 characters.')
      .and('have.css', 'background-color', 'rgb(248, 215, 218)')
    create.titleInput.should('be.visible')
  })

  it('wrong url format', () =>{
    cy.visit('/create')
    create.wrongUrlFormat(validTitle, validDescription, wrongUrl);
    cy.url().should('include', '/create');
    create.createHeading.should('be.visible')
      .and('have.text', 'Create Gallery')
      .and('have.css', 'color', 'rgb(72, 73, 75)')
    create.titleInput.should('be.visible')
  })

  it('all empty fields', () =>{
    cy.visit('/create')
    create.allEmptyFields();
    cy.url().should('include', '/create');
    create.createHeading.should('be.visible')
      .and('have.text', 'Create Gallery')
      .and('have.css', 'color', 'rgb(72, 73, 75)')
    create.titleInput.should('be.visible')
  })

  it('add one image without description', () =>{
    cy.visit('/create')
    create.oneImgWithoutDescription(validTitle, validUrl);
    create.createHeading.should('be.visible')
      .and('have.text', 'All Galleries')
      .and('have.css', 'color', 'rgb(72, 73, 75)')
    cy.url().should('not.include', '/create');
  })

  it('add one image with description', () =>{
    cy.visit('/create')
    create.oneImgWithDescription(validTitle, validDescription, validUrl);
    create.createHeading.should('be.visible')
      .and('have.text', 'All Galleries')
      .and('have.css', 'color', 'rgb(72, 73, 75)')
    cy.url().should('not.include', '/create');
  })

  it('two images', () => {
    cy.visit('/create')
    create.twoImage(validTitle,validDescription,validUrl);
    create.createHeading.should('be.visible')
      .and('have.text', 'All Galleries')
      .and('have.css', 'color', 'rgb(72, 73, 75)')
    cy.url().should('not.include', '/create');
  })

  it.only('moving second img', () =>{
    cy.visit('/create')
    create.getSecondImageOnFirstPlaceUsingArrow(validTitle,validDescription,validUrl);
    create.createHeading.should('be.visible')
      .and('have.text', 'All Galleries')
      .and('have.css', 'color', 'rgb(72, 73, 75)')
    cy.url().should('not.include', '/create');
  })
})