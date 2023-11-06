
describe('open homepage, PLP, search for item', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.fixture('pdp.json').as('elementsPdp')
    cy.fixture('homepage.json').as('elements')
    cy.get('@elements').then((element)=>{
      cy.clickOnButton(element.cookieBlock,element.cookieAccept)
      cy.clickOnButton(element.newsletterModal,element.newsletterModalClose)
     })      
})  

  it('open product page and add to cart and go to checkout', () => {
   cy.visit('/just-right-hairspray') 
   cy.get('@elementsPdp').then((element)=>{
    cy.get(element.upsellProducts).should('be.visible')
    cy.get(element.relatedProducts).should('be.visible')
    cy.get(element.addToCart).should('be.enabled').click()
   })   
   cy.visit('/checkout/cart')
   cy.get('div.cart-empty').should('not.exist')
   cy.get('.cart.item').should('be.visible')
   cy.get('ul.checkout.methods.items.checkout-methods-items>li>button').should('be.enabled').click()
   cy.visit('/checkout/klarna')
   cy.url().then((url =>{
    expect(url).to.contain('checkout/klarna')
    }))
  })
})