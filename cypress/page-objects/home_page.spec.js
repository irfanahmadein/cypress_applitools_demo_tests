export class HomePage {

    logoIcon(){
        return cy.get('.logo-element')
    }

    financialOverviewHeader(){
        return cy.get('.compact > .element-header')   
    }

    compareExpenses(){
        return cy.get('#showExpensesChart')
    }

    // Table locators 
    
    tableAmountHeader(){
        return cy.get('#amount')
    }

    amount1(){
        return cy.get(':nth-child(1) > .text-right > .text-danger')
    }

    amount2(){
        return cy.get(':nth-child(2) > .text-right > .text-danger')
    }

    amount3(){
        return cy.get(':nth-child(3) > .text-right > .text-success')
    }

    amount4(){
        return cy.get(':nth-child(4) > .text-right > .text-success')
    }

    amount5(){
        return cy.get(':nth-child(5) > .text-right > .text-success')
    }

    amount6(){
        return cy.get(':nth-child(6) > .text-right > .text-success')
    }

    descriptions(){
        return cy.get('.cell-with-media')
    }
    
}