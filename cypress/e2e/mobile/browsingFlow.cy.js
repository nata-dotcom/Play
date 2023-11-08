
describe('mobile browsing', () => {
  beforeEach(() => {
    cy.viewport('iphone-8')
    cy.visit('/')
    cy.intercept('POST','https://stats.ksearchnet.com/analytics/n-search/search?*').as('search')
    cy.fixture('homepage.json').as('elements')
    cy.get('@elements').then((element)=>{
      cy.clickOnButton(element.newsletterModal,element.newsletterModalClose)
     })      
})  

  it('open category page and get the list of categories', () => {
   cy.visit('/produkter') 
   const categoriesList = cy.get('ul.ba-product-list.product-items>li>div').children('.sub-category-info__name')
   cy.getListArray(categoriesList)
  })

  it('check if search works and return results', () => {
    cy.get('@elements').then((element)=>{
      cy.get(element.searchIcon).click()
      cy.get(element.searchField).should('be.visible').type('condi')
    })
    cy.wait('@search').its('response.statusCode').should('eq', 200)
    cy.get('div.field.search').type('{enter}')
    cy.url().then((url =>{
      expect(url).contains('catalogsearch/result/?q=condi')
      }))

  });

  it('open product page and get the list of salongs', () => {
    cy.visit('/frisorsalonger') 
    const salongList = cy.get('.ba-salon-list>article>div').children('div.ba-salon-list__name')
    cy.getListArray(salongList)
    cy.log('the list of salongs')
   })
})