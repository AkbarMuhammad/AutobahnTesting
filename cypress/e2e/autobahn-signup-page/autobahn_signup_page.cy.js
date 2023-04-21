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

  context('Autobahn Sign Up Page : Happy Path', () => { // Account Exist
    beforeEach(() => {
      cy.visit('https://autobahn.security/signup')
    })
  
    it('SignUp Happy Path : Account 1', function() {
      cy.get('.active > .form-control').click();
      cy.get('.active > .form-control').type(data.credentials.valid_account_1.email);
      cy.get('.input-group-icon > .form-control').click();
      cy.get('.bar-text').should('have.text', 'Weak');
      cy.get('.double-columns > :nth-child(1)').should('have.text', '\n                        At least 8 characters\n                ');
      cy.get('.double-columns > :nth-child(2)').should('have.text', '\n                        One uppercase letter\n                ');
      cy.get('.double-columns > :nth-child(3)').should('have.text', '\n                        One lowercase letter\n                ');
      cy.get('.double-columns > :nth-child(4)').should('have.text', '\n                        One number\n                ');
      cy.get('.double-columns > :nth-child(5)').should('have.text', '\n                        One special character\n                ');
      cy.get('.double-columns > :nth-child(6)').should('have.text', '\n                        No empty space\n                ');
      cy.get('.input-group-icon > .form-control').type(data.credentials.valid_account_1.password);
      cy.get('.bar').should('have.text', 'Very Strong');
      cy.get('.button-wrapper > .custom-button > .btn > .button-text').click();
      cy.get('.spinner > .fa').should('be.visible');
      cy.get('.error > .label', { timeout: 20000 }).should('have.text', 'Account already exists.');
    });
  
    it('SignUp Happy Path : Account 2 - Welcome!', function() {
      cy.get('.active > .form-control').click();
      cy.get('.active > .form-control').type(data.credentials.valid_account_2.email);
      cy.get('.input-group-icon > .form-control').click();
      cy.get('.bar-text').should('have.text', 'Weak');
      cy.get('.double-columns > :nth-child(1)').should('have.text', '\n                        At least 8 characters\n                ');
      cy.get('.double-columns > :nth-child(2)').should('have.text', '\n                        One uppercase letter\n                ');
      cy.get('.double-columns > :nth-child(3)').should('have.text', '\n                        One lowercase letter\n                ');
      cy.get('.double-columns > :nth-child(4)').should('have.text', '\n                        One number\n                ');
      cy.get('.double-columns > :nth-child(5)').should('have.text', '\n                        One special character\n                ');
      cy.get('.double-columns > :nth-child(6)').should('have.text', '\n                        No empty space\n                ');
      cy.get('.input-group-icon > .form-control').type(data.credentials.valid_account_2.password);
      cy.get('.bar').should('have.text', 'Strong');
      cy.get('.button-wrapper > .custom-button > .btn > .button-text').click();
      cy.get('.spinner > .fa').should('be.visible');
      cy.get('.v2 > .heading', { timeout: 20000 }).should('have.text', 'Welcome!');
      cy.get('.button-wrapper > .custom-button').should('have.text', ' Start using Autobahn');
    });
  
    it('Verify Password Eye Slash', function() {
      cy.get('.active > .form-control').click();
      cy.get('.active > .form-control').type(data.credentials.valid_account_1.email);
      cy.get('.input-group-icon > .form-control').click();
      cy.get('.input-group-icon > .form-control').type(data.credentials.valid_account_1.password);
      cy.get('.input-group-icon > .fa').should('have.class', 'fa-eye');
      cy.get('.input-group-icon > .fa').click();
      cy.get('.input-group-icon > .fa').should('have.class', 'fa-eye-slash');
      cy.get('.input-group-icon > .fa').click();
      cy.get('.input-group-icon > .fa').should('have.class', 'fa-eye');
    });
  
  })

  context('Autobahn Sign Up Page : Test Email Field', () => {
    beforeEach(() => {
      cy.visit('https://autobahn.security/signup')
    })
  
    it('Verify Email Format Must be Valid : Without @', function() {
      cy.get('.form-group > .active').click();
      cy.get('.form-group > .active').type(data.credentials.dummy_email_no_extention.email); // email without @bugfoo.com
      cy.get('.input-group-icon > .form-control').click();
      cy.get('.input-group-icon > .form-control').type(data.credentials.dummy_email_no_extention.password);
      cy.get('.error > .label').should('have.text', 'Must be a valid email');
      cy.get('.button-wrapper > .custom-button > .btn.primary.button-large.unclickable.disabled').should('be.visible');
    });
  
    it('Verify Email Format Must be Valid : With Space', function() {
      cy.get('.form-group > .active').click();
      cy.get('.form-group > .active').type(data.credentials.dummy_email_with_space.email); // email with space
      cy.get('.input-group-icon > .form-control').click();
      cy.get('.input-group-icon > .form-control').type(data.credentials.dummy_email_with_space.password);
      cy.get('.error > .label').should('have.text', 'Must be a valid email');
      cy.get('.button-wrapper > .custom-button > .btn.primary.button-large.unclickable.disabled').should('be.visible');
    });
  
    it('Verify Email Format Must be Valid : With Wrong Email', function() {
      cy.get('.form-group > .active').click();
      cy.get('.form-group > .active').type(data.credentials.dummy_wrong_email.email); // with wrong email
      cy.get('.input-group-icon > .form-control').click();
      cy.get('.input-group-icon > .form-control').type(data.credentials.dummy_wrong_email.password);
      cy.get('.button-wrapper > .custom-button > .btn > .button-text').click();
      cy.get('.error > .label', { timeout: 20000 }).should('have.text', 'Email domain is not allowed. You must use a company email.');
    });
  
  })