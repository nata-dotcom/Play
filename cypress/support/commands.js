// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('clickOnButton',(element,button) => {
    cy.get(element).should('exist');
    cy.get(button).click()
    cy.get(element).should('not.be.visible') })

Cypress.Commands.add('getListArray',(locatorlist)=>{
        (locatorlist)
        .should(($els) => {const resultat = $els.toArray().map(el => el.innerText)
            console.log('THIS array we have read',resultat)
        return resultat
        })  
})    

Cypress.Commands.add('newsletterModalClose',()=>{
    cy.get('body')
    .then(($body)=>{
        const newsletterModal = 'aside.modal-popup.flexible-forms__modal.newsletter-popup._show'
        if ($body.find(newsletterModal)) {
               cy.get(newsletterModal).find('button.action-close').click()  
               cy.log('modal IS closed')
              }
              else {
                cy.log('havent found newsletter modal')
              }
     })  
})

Cypress.Commands.add('deleteAllFromCart', ()=>{
    cy.get('tbody tr').each(($ele) => {
        if ($ele.find('a.action.action-delete')){
        cy.get('a.action.action-delete').as('deleteButton')
        cy.wrap($ele).then(() => {
            cy.get('@deleteButton').first().click()
        })
        }
      })
      cy.get('div.cart-empty').should('exist')
})

Cypress.Commands.add('modalAccept',(modalWrapper,acceptButton)=>{
    cy.get(modalWrapper).then(($modal)=>{
        if (!$modal.children('._show')){
          cy.log('no modal detected')
        }
        else {
          cy.get(modalWrapper).find(acceptButton).click()
          cy.log('modal detected and accepted')
        }
        cy.get(modalWrapper).children('._show').should('not.exist')
          })
})

Cypress.Commands.add('cleanupRequisitionList',(env,modalWrapper,acceptButton)=>{
    cy.get('table.data-grid.table').then(($table)=>{
        let records = $table.find('tbody tr')
        if (records.hasClass('data-row')){
          cy.get('a.action-menu-item').each(($el) => {
            const links = [$el.attr('href')]
            links.forEach((link)=>{
              cy.visit(link)
              cy.get('button[data-action="remove-list"]').then((button)=>{
                button.click()
                cy.get(modalWrapper).then(($modal)=>{
                    $modal.find(acceptButton).click()
                })
              })
            })
          })
        }
        else {
          cy.log('no shopping list records available')
          cy.get('tr.data-grid-tr-no-data').should('exist')
        } 
        cy.visit(env+'americas_en/requisition_list/requisition/index/')
        cy.wait('@requisitionList')
        cy.get('tr.data-grid-tr-no-data').should('exist')  
      })
})

