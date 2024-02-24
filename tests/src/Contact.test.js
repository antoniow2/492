import React from 'react';
import Contact from '../../client/src/Contact';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// jest.mock('./Header', () => () => <div data-testid="mock-header">Mock Header</div>);
// jest.mock('./Footer', () => () => <div data-testid="mock-footer">Mock Footer</div>);

test('Can find email link', () => {
    //render(<Router><Contact /></Router>);
    const expected = Contact();
    // expect(expected).toBe(expected);
    // const letstalkElement = screen.getByText("Let's Talk");
    // expect(letstalkElement).toBeInTheDocument();
    //expect(cont).toBe();
//     const result = Contact();
//     const linkRegex = /<Link to="(.*?)"/;
//     // const match = result.match(linkRegex);
//     // // Extract the link from the match
//     // const link = match ? match[1] : null;
//     // console.log(link);
//     // const linkExpect = 'https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSHwCsBHCNkLDWHFHhbgzTLvtCxtfnMlMKnbPhsGbRqxLTMDqqgDMvGjjHrPPtcwgrkpSGKn';
//     // expect(linkExpect).toBeInTheDocument();
//     // Assuming your Link component has a data-testid attribute
// const emailLink = screen.getByTestId('email-link');

// expect(emailLink).toHaveAttribute('href', 'https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSHwCsBHCNkLDWHFHhbgzTLvtCxtfnMlMKnbPhsGbRqxLTMDqqgDMvGjjHrPPtcwgrkpSGKn');

    //expect(result).toBe(<div style={{"font": "cursive", "textAlign": "center"}}><Header /><h1 style={{"fontSize": "35px"}}> Let's Talk</h1><h2>Email us at </h2><h2 style={{"fontSize": "30px"}}> <Link to="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSHwCsBHCNkLDWHFHhbgzTLvtCxtfnMlMKnbPhsGbRqxLTMDqqgDMvGjjHrPPtcwgrkpSGKn"> systembreakersusc@gmail.com</Link></h2><Footer /></div>);
});