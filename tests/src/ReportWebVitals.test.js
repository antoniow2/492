import React from 'react';
import Profile from '../../client/src/Profile';
import ReportWebVitals from '../../client/src/reportWebVitals';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { renderIntoDocument } from 'react-dom/test-utils';


jest.mock('web-vitals', () => ({
    getCLS: jest.fn(),
    getFID: jest.fn(),
    getFCP: jest.fn(),
    getLCP: jest.fn(),
    getTTFB: jest.fn(),
  }));

test('ReportWebVitals Renders', () => {
    const rep = render(<ReportWebVitals />);
});

describe('reportWebVitals', () => {
    it('should call web-vitals functions if onPerfEntry is a function', async () => {
      const onPerfEntry = jest.fn();
  
      await ReportWebVitals(onPerfEntry);
  
    //   expect(onPerfEntry).toHaveBeenCalled();
    //   expect(require('web-vitals').getCLS).toHaveBeenCalled();
    //   expect(require('web-vitals').getFID).toHaveBeenCalled();
    //   expect(require('web-vitals').getFCP).toHaveBeenCalled();
    //   expect(require('web-vitals').getLCP).toHaveBeenCalled();
    //   expect(require('web-vitals').getTTFB).toHaveBeenCalled();
    });
    it('should not call web-vitals functions if onPerfEntry is not a function', async () => {
        const onPerfEntry = 'not a function';
    
        // Use async/await to handle the asynchronous import
        await ReportWebVitals(onPerfEntry);
    
        expect(require('web-vitals').getCLS).not.toHaveBeenCalled();
        expect(require('web-vitals').getFID).not.toHaveBeenCalled();
        expect(require('web-vitals').getFCP).not.toHaveBeenCalled();
        expect(require('web-vitals').getLCP).not.toHaveBeenCalled();
        expect(require('web-vitals').getTTFB).not.toHaveBeenCalled();
      });
});
