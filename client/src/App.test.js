import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GeneralContextProvider from './context/GeneralContext';
import App from './App';

test('renders ShopEZ navbar logo', () => {
  render(
    <MemoryRouter>
      <GeneralContextProvider>
        <App />
      </GeneralContextProvider>
    </MemoryRouter>
  );
  const brandElement = screen.getAllByText(/ShopEZ/i)[0];
  expect(brandElement).toBeInTheDocument();
});
