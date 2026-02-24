import { render, screen } from '@testing-library/react';
import PaymentForm from '@/components/PaymentForm';

jest.mock('@stripe/react-stripe-js', () => ({
  Elements: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PaymentElement: () => <div>Payment Element</div>,
  useElements: () => ({}),
  useStripe: () => ({ confirmPayment: jest.fn() })
}));

describe('PaymentForm', () => {
  it('renders starter button before initializing intent', () => {
    render(<PaymentForm amount={4999} />);
    expect(screen.getByText('Start embedded checkout')).toBeInTheDocument();
  });
});
