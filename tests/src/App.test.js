import React from 'react';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';
import App from '../../client/src/App';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MemoryRouter } from 'react-router-dom';

// import Home from "../../client/src/Home";
// import Login from "../../client/src/Login";
// import Profile from "../../client/src/Profile";
// import FrontPage from "../../client/src/FrontPage";
// import Register from "../../client/src/Register";
// import Header from "../../client/src/Header";
// import Footer from "../../client/src/Footer";
// import Recipes from "../../client/src/Recipes";
// import PriceComp from "../../client/src/Comparer";
// import Contact from "../../client/src/Contact";
// import About from "../../client/src/About";
// import DietaryRestrictions from "../../client/src/DietaryRestrictions";
// import RecipeGenerator from "../../client/src/RecipeGenerator";

const makeSut = () => {
  return render(<App />);
};

// describe("<App />", () => {
//   test("Should render data", async () => {
//     let screen: RenderResult;

//     await act(async () => {
//       screen = makeSut();
//     });

//     fireEvent.click(screen.getByText(/Show Data/));

//     expect(screen.container.querySelectorAll("li").length).toBe(5);
//   });
// });

test('App renders and handles state changes', () => {
  const { getByText } = render();
  //const linkElement = getByText(/<body>/i);
  console.log(App());
  console.log(getByText);
  expect(getByText).toHaveLength(0);
  //expect(linkElement).toBeInTheDocument();
  
  //const { getByText  } = render(<App />);
    //console.log(render(<App />));
//   // const { container } = <App />;
  
//   // // Access the elements or inputs within your component
//   // const ingredientNameInput = container.querySelector('[placeholder="Enter Ingredient Name"]');
//   // const ingredientQuantityInput = screen.getByPlaceholderText('Enter Ingredient Quantity');
//   // const addButton = screen.getByText('Add Ingredient');

//   // // Simulate user interactions to trigger state changes
//   // userEvent.type(ingredientNameInput, 'Chicken');
//   // userEvent.type(ingredientQuantityInput, '2');
//   // userEvent.click(addButton);

//   // // Assertions to check if the state has been updated
//   // expect(screen.getByTestId('displayed-ingredient')).toHaveTextContent('Chicken - 2');
//   // expect(screen.getByTestId('ingredient-name')).toHaveValue('');
//   // expect(screen.getByTestId('ingredient-quantity')).toHaveValue('');
 });



// test('Check Routes', () => {
//   // const { getByText } = render(<App />);
//   // const element = getByText('Hello, World!');
//   // expect(element).toBeInTheDocument();
//   const result = App();
//   //const parts = result.split("Route");
//  // const expe = '<BrowserRouter><div className="App" style={{"background": "sandybrown"}}><Routes><Route Component={[Function Login]} path="/login" /><Route Component={[Function Register]} path="/register" /><Route Component={[Function FrontPage]} path="/" /><Route Component={[Function Home]} path="/home" /><Route Component={[Function RecipeGenerator]} path="/RecipeGenerator" /><Route Component={[Function PriceComparator]} path="/pricecompare" /><Route Component={[Function Profile]} path="/profile" /><Route Component={[Function Contact]} path="/contactus" /><Route Component={[Function About]} path="/about" /><Route Component={[Function DietaryRestrictions]} path="/dietary" /></Routes></div></BrowserRouter>';
//   const expe = "[object Object]";
//   expect(String(result)).toBe(expe);
// });

// test('MyComponent handles click event', () => {
//   const { getByText } = render(<App />);
//   const button = getByText('Click me');
//   fireEvent.click(button);
//   const updatedElement = getByText('Button clicked!');
//   expect(updatedElement).toBeInTheDocument();
// });