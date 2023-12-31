
describe('open homepage, PDP, add to cart and go to checkout', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.intercept('POST','**/checkout/cart/add/**').as('toCart')
    cy.fixture('pdp.json').as('elementsPdp')
    cy.fixture('cart.json').as('elementsCart')
    cy.fixture('homepage.json').as('elements')
    cy.get('@elements').then((element)=>{
      cy.clickOnButton(element.cookieBlock,element.cookieAccept)
      cy.clickOnButton(element.newsletterModal,element.newsletterModalClose)
     })      
})  

  it('C201661 open product page and add to cart and go to checkout', () => {
   cy.visit('/just-right-hairspray') 
   cy.get('@elementsPdp').then((element)=>{
    cy.get(element.upsellProducts).should('be.visible')
    cy.get(element.relatedProducts).should('be.visible')
    cy.get(element.addToCart).should('be.enabled').click()
   })   
   cy.wait('@toCart').its('response.statusCode').should('eq', 200)
   cy.visit('/checkout/cart')
   cy.get('@elementsCart').then((element)=>{
    cy.get(element.emptyCart).should('not.exist')
    cy.get(element.cartItem).should('be.visible')
    cy.get(element.toCheckoutButton).should('be.enabled').click()
   })
  
   cy.visit('/checkout/klarna')
   cy.url().then((url =>{
    expect(url).to.contain('checkout/klarna')
    }))
  })
})