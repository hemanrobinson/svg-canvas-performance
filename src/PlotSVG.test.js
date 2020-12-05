import { render, screen } from '@testing-library/react';
import PlotSVG from './PlotSVG';

test('renders link', () => {
  render(<PlotSVG />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
