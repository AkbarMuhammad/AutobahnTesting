/// <reference types="cypress" />

const data = require("../../fixtures/account_credentials.json")

context('Autobahn Sign Up Page : Verify Elements are Present', () => {
    beforeEach(() => {
      cy.visit('https://autobahn.security/signup')
     
    })
  
    it('Verify The Attributes of the Pages', function() {
      cy.get('div#signup').should('be.visible')
      cy.get('.header-icons').should('be.visible');
      cy.get('.v2 > .heading').should('have.text', 'Start a free 14-day trial');
      cy.get('.subtitle').should('have.text', 'No credit card required');
      cy.get('.input-set.active > .form-control').should('have.attr', 'placeholder', 'Work email*');
      cy.get('.input-group-icon > .form-control').should('have.attr', 'placeholder', 'Password*');
    });
  
    it('Verify Term and Privacy are Present', function() {
      cy.get('#agree-text').should('have.text', '\n                    By clicking Sign up, I agree to Autobahn\'s Terms of Use and the Privacy Policy.\n                ');
      cy.get('[href="/terms"]').should('have.attr', 'href', '/terms');
      cy.get('[href="/privacy"]').should('have.attr', 'href', '/privacy');
    });
  
    it('Verify Login Option is Present', function() {
      cy.get('#already-registered-text').should('have.id', 'already-registered-text');
      cy.get('#already-registered-text > a').should('have.attr', 'href', '/login');
      cy.get('#already-registered-text > a').click();
      cy.get('.heading', { timeout: 20000 }).should('have.text', 'Login');
      cy.get(':nth-child(1) > :nth-child(1) > .form-control').should('have.attr', 'placeholder', 'User Email');
      cy.get('.password-input > .input-set > .form-control').should('have.attr', 'placeholder', 'Password');
    });
  
    it('Verify Unable to Signup when Field Empty', function() {
      cy.get('.active > .form-control').click();
      cy.get('.input-group-icon > .form-control').click();
      cy.get('#already-registered-text').click();
      cy.get('.error > .label').should('be.visible');
      cy.get('.has-error > label').should('be.visible');
      cy.get('.button-wrapper > .custom-button > .btn.primary.button-large.unclickable.disabled').should('be.visible');
    });
  
  })