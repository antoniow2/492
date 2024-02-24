// NEED TO CHECK NEGATIVES
describe('My Web Application', () => {
  it('Load Application', () => {
    cy.visit('http://localhost:3001'); // Replace with our domain once it is up
  });
  it('Register and Login', () => {
    cy.visit('http://localhost:3001'); // Replace with our domain once it is up
    cy.contains('Sign Up').click();
    cy.url().should('include', '/register');
    cy.get('h1').should('contain', 'Registration');
    //New for T2
    cy.get('#username').type('testing');
    cy.get('#password').type('testtest');
    cy.get('#email').type('test@email.com'); 
  });
  it('Go to Login Page and login', () => {
    cy.visit('http://localhost:3001'); // Replace with our domain once it is up
    cy.contains('Login').click();
    cy.get('h1').should('contain', 'WhatToCook');
    cy.get('#username').type('colinmanning');
    cy.get('#password').type('cmanning');
    cy.contains('Login').click();
    //Testing non valid
    cy.visit('http://localhost:3001'); // Replace with our domain once it is up
    cy.contains('Login').click();
    cy.get('h1').should('contain', 'WhatToCook');
    cy.get('#username').type('colin');
    cy.get('#password').type('cmanning');
    cy.contains('Login').click();
    cy.get('p').should('contain', 'Error during login');
   });
  it('Navigate page', () => {
    cy.visit('http://localhost:3001/home');
    // New for T2
    //About
    cy.contains('About').click();
    cy.url().should('include', '/about');
    cy.contains('Home').click();
    cy.url().should('include', '/home');
    // Contact
    cy.contains('Contact').click();
    cy.url().should('include', '/contact');
    cy.contains('Home').click();
    cy.url().should('include', '/home');
    // END New for T 2
    // Recipes
    // cy.contains('Recipe').click();
    // cy.url().should('include', '/RecipeGenerator');
    // cy.contains('Home').click();
    // cy.url().should('include', '/home');
    // // Price page doesn't exist
    //New for T2
    cy.contains('Price').click();
    cy.url().should('include', '/PriceComparer');
    cy.contains('Home').click();
    cy.url().should('include', '/home');
    //Dietary
    cy.contains('Dietary').click();
    cy.url().should('include', '/diet');
    cy.contains('Home').click();
    cy.url().should('include', '/home');
    // Profile
    cy.contains('Profile').click();
    cy.url().should('include', '/profile');
    cy.contains('Home').click();
    cy.url().should('include', '/home');
  });
  it('Profile', () => {
    //Login to test profile side
    cy.visit('http://localhost:3001'); // Replace with our domain once it is up
    cy.contains('Login').click();
    cy.get('h1').should('contain', 'WhatToCook');
    cy.get('#username').type('colinmanning');
    cy.get('#password').type('cmanning');
    cy.contains('Login').click();
    cy.contains('Profile').click();
    cy.url().should('include', '/profile');
    cy.get('h1').should('contain', 'Profile');
    //Check User Data
    cy.get('p').should('contain', 'colinmanning');
    cy.get('p').should('contain','c@eemail.com');
    cy.get('h1').should('contain', 'Meal of the Week');
    cy.scrollTo(0, 500)
    cy.get('h1').should('contain', "Your Fridge");
    // Input Ingredients
    cy.get('input[placeholder*="Enter Ingredient Name"]').type("Chicken");
    cy.get('input[placeholder*="Quantity"]').type("2");
    cy.contains('Save').click();
    cy.get('input[placeholder*="Enter Ingredient Name"]').type("Salt");
    cy.get('input[placeholder*="Quantity"]').type("2");
    cy.contains('Save').click();
  });
  // it('Price Comparer', () => {
  //   cy.visit('http://localhost:3001/pricecomparer'); // Replace with our domain once it is up
  //  // cy.get('h1').should('contain', 'Price Comparer');
  //  // Testing Chicken Value
  //   cy.get('input[placeholder*="Search for a product..."]').type("Chicken");
  //   cy.contains('Search').click();
  //   cy.get('h2').should('contain', 'Heritage Farm');
  //   cy.get('h2').should('contain', 'Simple Truth');
  //   cy.get('h2').should('contain', 'Simple Truth Organic');
  //   cy.get('h2').should('contain', 'Tyson');
  //   cy.contains('Tyson').click();
  //   cy.get('h2').should('contain', 'Total Price: $4.99');
  //   cy.contains('Clear').click();
  //   cy.get('h2').should('contain', 'Total Price: $0');
  //   // Checking for multiple 
  //   cy.get('input[placeholder*="Search for a product..."]').clear();
  //   cy.get('input[placeholder*="Search for a product..."]').type("Chicken");
  //   cy.contains('Search').click();
  //   cy.contains('Tyson').click();
  //   cy.get('h2').should('contain', 'Total Price: $4.99');
  //   cy.get('input[placeholder*="Search for a product..."]').clear();
  //   cy.get('input[placeholder*="Search for a product..."]').type("Salt");
  //   cy.contains('Search').click();
  //   cy.contains('McCormick').click();
  //   cy.get('h2').should('contain', 'Total Price: $7.98');
  //   // Test PDF
  //   cy.contains('PDF').click();
  //   //Checking for unavailable  NEED MORE
  //   cy.get('input[placeholder*="Search for a product..."]').clear();
  //   cy.get('input[placeholder*="Search for a product..."]').type("Chicken Apple Sausage");
  //   cy.contains('Search').click();
  //   cy.get('div').should('contain', '');
  // });
  it('Dietary Page', () => {
    cy.visit('http://localhost:3001'); // Replace with our domain once it is up
    cy.contains('Login').click();
    cy.get('h1').should('contain', 'WhatToCook');
    cy.get('#username').type('colinmanning');
    cy.get('#password').type('cmanning');
    cy.contains('Login').click();
    cy.contains('Dietary').click();
    cy.get('h1').should('contain', 'Dietary Restrictions');
    cy.get('h3').should('contain', 'Select your allergy:');
    // Check all restrictions are there
    // cy.get('div').should('contain', 'EggFree');
    // cy.get('div').should('contain', 'Mediterranean');
    // cy.get('div').should('contain', 'DairyFree');
    // cy.get('div').should('contain', 'GlutenFree');
    // cy.get('div').should('contain', 'WheatFree');
    // cy.get('div').should('contain', 'PeanutFree');
    // cy.get('div').should('contain', 'TreeNutFree');
    // cy.get('div').should('contain', 'FishFree');
    // cy.get('div').should('contain', 'SoyFree');
    // cy.get('div').should('contain', 'ShellfishFree');
    // cy.get('div').should('contain', 'PorkFree');
    // cy.get('div').should('contain', 'RedMeatFree');
    // cy.get('div').should('contain', 'CrustaceanFree');
    // cy.get('div').should('contain', 'CeleryFree');
    // cy.get('div').should('contain', 'MustardFree');
    // cy.get('div').should('contain', 'SesameFree');
    // cy.get('div').should('contain', 'LupineFree');
    // cy.get('div').should('contain', 'MolluskFree');
    // cy.get('div').should('contain', 'Kosher');
    // cy.get('div').should('contain', 'SugarConscious');
    // cy.get('div').should('contain', 'AlcoholFree');
    // cy.get('div').should('contain', 'SulfiteFree');
    // cy.get('div').should('contain', 'KetoFriendly');
    // cy.get('div').should('contain', 'Paleo');
    // cy.get('div').should('contain', 'No oil added');
    // cy.get('div').should('contain', 'FODMAPFree');
    // cy.get('div').should('contain', 'KidneyFriendly');
    // cy.get('div').should('contain', 'ImmunoSupportive');
    // cy.get('div').should('contain', 'Low Potassium');
    // cy.get('div').should('contain', 'Low Sugar');
    // cy.get('div').should('contain', 'Pescatarian');
    // cy.get('div').should('contain', 'Vegan');
    // cy.get('div').should('contain', 'Vegetarian');
    //Test Clicking Objects
    //cy.contains('Keto').click();
    // More Clicks
    cy.contains('Save').click();
  });
  // it('Recipe Generator', () => {
  //   cy.visit('http://localhost:3001/RecipeGenerator'); // Replace with our domain once it is up
  //   cy.get('input[placeholder*="Search recipes..."]').type("Chicken");
  // });
    // END New for T2
 });
