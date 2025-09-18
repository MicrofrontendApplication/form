
import { useState, useRef } from 'react';
import RadioButton, { RadioButtonRef } from './RadioButton';
// import CheckBox from '../components/CheckBox';

export const PaymentWidget: React.FC<{
  onClickCallback: (data: {
    paymentMethod: string;
    acceptedTerms: boolean;
    cardData: any;
  }) => void;
}> = ({ onClickCallback }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [paymentMethodError, setPaymentMethodError] = useState('');

  const radioButtonRef = useRef<RadioButtonRef>(null);

  const handleSubmit = () => {
    if (!selectedPayment) {
      setPaymentMethodError('Please select a payment method.');
      return;
    }

    const cardData =
      selectedPayment === 'CreditCard'
        ? radioButtonRef.current?.getCardData()
        : null;

    if (selectedPayment === 'CreditCard' && !cardData) {
      return;
    }

    onClickCallback({
      paymentMethod: selectedPayment,
      acceptedTerms: isChecked,
      cardData,
    });
  };

  return (
    <div className="payment-widget space-y-4">
      <RadioButton
        ref={radioButtonRef}
        value={selectedPayment}
        onChange={(value:any) => {
          setSelectedPayment(value);
          setPaymentMethodError('');
        }}
      />

      {paymentMethodError && (
        <p className="text-red-500 text-sm" role="alert">
          {paymentMethodError}
        </p>
      )}

      {/* <CheckBox
        label="I agree to the"
        linkText="Terms and Conditions"
        linkUrl="https://example.com/terms"
        checked={isChecked}
        onChange={setIsChecked}
      /> */}

      <button
        type="submit"
        onClick={handleSubmit}
        className="submit-button bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Buy Now
      </button>
    </div>
  );
};