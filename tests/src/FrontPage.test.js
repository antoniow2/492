import React from 'react';
import FrontPage from '../../client/src/FrontPage';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

afterEach(cleanup);

it('Text in state is changed when button clicked', () => {
    const expectedElement = {
        type: 'div',
        props: {
            style: { fontFamily: 'cursive', textAlign: 'center' },
            children: [
                {
                    type: 'div',
                    props: {
                        children: {
                            type: 'h1',
                            props: {
                                children: 'Welcome to What to Cook',
                            },
                        },
                    },
                },
                {
                    type: 'nav',
                    props: {
                        children: {
                            type: 'ul',
                            props: {
                                children: [
                                    {
                                        type: 'a',
                                        props: {
                                            children: {
                                                type: 'button',
                                                props: {
                                                    style: { fontFamily: 'cursive', fontSize: '30px' },
                                                    children: 'Login',
                                                },
                                            },
                                        },
                                    },
                                    {
                                        type: 'a',
                                        props: {
                                            children: {
                                                type: 'button',
                                                props: {
                                                    style: { fontFamily: 'cursive', fontSize: '30px' },
                                                    children: 'Register',
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            ],
        },
    };

    expect(FrontPage()).toEqual(expectedElement);
    
    
    // const getz  = FrontPage();
    // expect(getz).toBe(<div style={{"fontFamily": "cursive", "textAlign": "center"}}><div><h1>Welcome to What to Cook</h1></div><nav><ul><a><Link to="/login"><button style={{"fontFamily": "cursive", "fontSize": "30px"}}>Login</button></Link></a><a><Link to="/register"><button style={{"fontFamily": "cursive", "fontSize": "30px"}}>Register</button></Link></a></ul></nav></div>);
    //expect('Welcome to What to Cook').toBeInTheDocument();

    // const welcomeText = screen.getByText(/Welcome to What to Cook/i);
    // console.log(welcomeText); // Log the received value
    // expect(welcomeText).toBeInTheDocument();
    // expect(getByText.textContent).toBe("Initial State")

    // fireEvent.click(getByText("State Change Button"))

    // expect(getByText(/Initial/i).textContent).toBe("Initial State Changed")
 });

// describe('FrontPage component', () => {
//   it('renders without crashing', () => {
//     render(FrontPage());
//   });
// });


// test('Login Page', () => {
//     render(<FrontPage />);
//     // Access the input element
//     const inputElement = screen.getByRole('textbox');

//     // Simulate user input
//     fireEvent.change(inputElement, { target: { value: 'testUser' } });

//     // Verify that the state has been updated
//     expect(inputElement.value).toBe('testUser');
// });