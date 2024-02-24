// setupTests.js
import '@testing-library/jest-dom';

jest.mock('jspdf', () => {
    const mockJspdf = jest.fn();
    mockJspdf.prototype.addImage = jest.fn();
    // Add other mocked methods as needed
    return mockJspdf;
  });