/// <reference types="cypress" />

import { LoginPage } from "../page-objects/login_page.spec"
import { HomePage } from "../page-objects/home_page.spec"
import { ChartPage } from "../page-objects/chart_page.spec"

describe('Traditional tests', () => {

    const login = new LoginPage
    const home = new HomePage
    const chart = new ChartPage

    before(() => {
        login.visitLoginPage()
    })

    it('Login page UI elements test', () => {
        
        login.authWrapper().should('be.visible')
        login.logo().should('be.visible')
        login.logoArea().should('be.visible')
        login.loginFormHeader().should('be.visible').should('contain.text', 'Login Form') //Bug#1 : bug in V2
        login.alertEmpty().should('be.visible')
        login.formArea().should('be.visible')
        login.usernameLabel().should('be.visible').should('contain.text', 'Username')
        login.usernameField().should('be.visible').should('be.enabled')
        login.passwordLabel().should('be.visible').should('contain.text', 'Password') //Bug#2 : bug in V2
        login.passwordField().should('be.visible').should('be.enabled')
        login.loginButton().should('be.visible').should('contain.text', 'Log In')
        login.rememberMeLabel().should('be.visible').should('contain.text', 'Remember Me')
        login.rememberMeCheckbox().should('be.visible').should('not.be.checked')
        login.buttonArea().should('be.visible')
        login.socialButtonArea().should('be.visible')
        login.twitterIcon().should('be.visible')
        login.facebookIcon().should('be.visible')
    })

    it('Data-driven test', () => {
        login.loginButton().click()
        login.errorUsernamePassword().should('be.visible').should('have.text', 'Please enter both username and password') //a.If you don’t enter the username and password and click the login button, it should throw an error


        login.usernameField().type('random')
        login.loginButton().click()
        login.errorUsernamePassword().should('be.visible').should('have.text', 'Password must be present')         //b.If you only enter the username and click the login button, it should throw an error

        login.usernameField().clear()
        login.passwordField().type('random')
        login.loginButton().click()
        login.errorUsernamePassword().should('be.visible').should('have.text', 'Username must be present')         //c.If you only enter the password and click the login button, it should throw an error

 
        login.usernameField().type('random')
        login.passwordField().type('random')
        login.loginButton().click()
        home.financialOverviewHeader().should('be.visible').should('contains.text', 'Financial Overview')                //d.If you enter both username (any value) and password (any value), it should log you in
    })

    it('Table sort test', () => {
        home.tableAmountHeader().click()   // Click and verify that the column is in ascending order below
        home.amount1().should('be.visible').should('have.text', '- 320.00 USD') //Bug#3: Bug in V2 where table foes not sort correctly
        home.amount2().should('be.visible').should('have.text', '- 244.00 USD') 
        home.amount3().should('be.visible').should('have.text', '+ 17.99 USD')
        home.amount4().should('be.visible').should('have.text', '+ 340.00 USD')
        home.amount5().should('be.visible').should('have.text', '+ 952.23 USD')
        home.amount6().should('be.visible').should('have.text', '+ 1,250.00 USD')

        // Verify that the column is in ascending order and that each row’s data stayed in tact after the sorting
        // Unable to do in traditional tests 
        // 
    })

    it('Canvas chart test', () => {
        home.compareExpenses().click()

        // Validate that the bar chart and representing that data (number of bars and their heights)
        // Unable to do in traditional tests 

        chart.showDataForNextYearButton().click()

        //Verify that this data set is added for the year 2019.
        // Unable to do in traditional tests

    })

    it('Dynamic content test', () => {

        login.visitLoginPage()
        login.usernameField().type('random')
        login.passwordField().type('random')
        login.loginButton().click()
        login.flashSaleImage1().should('be.visible')
        login.flashSaleImage2().should('be.visible') //Bug#4 : Bug in V2 where one gif is not visible
    })

})