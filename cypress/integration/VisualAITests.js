/// <reference types="cypress" />

import { LoginPage } from "../page-objects/login_page.spec"
import { HomePage } from "../page-objects/home_page.spec"
import { ChartPage } from "../page-objects/chart_page.spec"

// https://eyes.applitools.com/?accountId=Bk-a2AdJQUyF--W8HHnbRg~~&userName=irfan.ahmad@upgrad.com&source=&
// Username: irfan.ahmad@upgrad.com
// API key: bxT0kSRoxAZZgW9EO4tf102RSKtCB76URnVtCvc104ft107A0110

describe('Visual Tests', () => {

    const login = new LoginPage
    const home = new HomePage
    const chart = new ChartPage

    beforeEach(() => cy.eyesOpen({appName: 'Applitools Hackathon Demo App', batchName: 'Applitools Hackathon Visual Tests'}))
    afterEach(() => cy.eyesClose())

    it('Login Page UI Elements Test', () => {
        login.visitLoginPage()
        cy.eyesCheckWindow('Login page')
    })

    it('Data-Driven Test', () => {

        login.loginButton().click()
        cy.eyesCheckWindow('Username/Password error') //a. If user doesn’t enter the username and password and click the login button, it should throw an error

        login.usernameField().type('random')
        login.loginButton().click()
        cy.eyesCheckWindow('Password error')          //b. If user only enters the username and clicks the login button, it should throw an error
 

        login.usernameField().clear()
        login.passwordField().type('random')
        login.loginButton().click()
        cy.eyesCheckWindow('Username error')          //c. If user only enters the password and clicks the login button, it should throw an error


        login.usernameField().type('random')
        login.passwordField().type('random')
        login.loginButton().click()
        cy.eyesCheckWindow('Home page')                //d. If user enters both username (any value) and password (any value), it should log you in.
    })

    it('Table Sort Test', () => {
        //Verify that the column is in ascending order  and Each row’s data stayed in tact after the sorting
        home.tableAmountHeader().click()
        cy.eyesCheckWindow('Table sorted by Amount ascending order')

    })

    it('Canvas Chart Test', () => {
        home.compareExpenses().click()
        cy.eyesCheckWindow('2017/2018 Chart')  // Validate that the bar chart and representing that data 

        chart.showDataForNextYearButton().click()
        cy.eyesCheckWindow('2017/2018/2019 Chart') // Verify that this data set is added for the year 2019.
    })

    it('Dynamic Content Test', () => {
        login.visitLoginPage()  // Test for the existence of a display ad that’s dynamic 
        login.usernameField().type('random')
        login.passwordField().type('random')
        login.loginButton().click()
        cy.eyesCheckWindow('Login page gifs')
    })

})