import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
// import '../RedioButton/rediobutton.css';
// import CheckBox from '../CheckBox';

interface PaymentOption {
  id: string;
  label: string;
  imgSrc: string;
}

export interface CardData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface RadioButtonRef {
  getCardData: () => CardData | null;
}

interface RadioButtonProps {
  value: string;
  onChange: (value: string) => void;
}

const gPayOption: PaymentOption = {
  id: 'Google Pay',
  label: 'Google Pay',
  imgSrc: 'https://images.seeklogo.com/logo-png/33/2/google-pay-logo-png_seeklogo-334912.png',
};




const RadioButton = forwardRef<RadioButtonRef, RadioButtonProps>(
  ({ value, onChange }, ref) => {
    
    const [options, setOptions] = useState<PaymentOption[]>([
      {
        id: 'PayPal',
        label: 'PayPal',
        imgSrc: 'https://1000logos.net/wp-content/uploads/2017/05/Paypal-Logo-2022.png',
      },
      {
        id: 'DirectDebit',
        label: 'DirectDebit',
        imgSrc: 'https://webshoptiger.com/wp-content/uploads/2020/11/SEPA-vooraf-overboeken-logo.png',
      },
      {
        id: 'CreditCard',
        label: 'CreditCard',
        imgSrc: 'https://wallpapers.com/images/high/visa-mastercard-logos-wh429a8o742pgm38.png',
      },
    ]);

    const [cardData] = useState<CardData>({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    });

    const [errors, setErrors] = useState({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    });
console.log('errors',errors)
    useImperativeHandle(ref, () => ({
      getCardData: () => {
        if (value === 'CreditCard') {
          const isValid = validateCardData(true);
          return isValid ? cardData : null;
        }
        return null;
      },
    }));

    useEffect(() => {
      const timer = setTimeout(() => {
        setOptions((prev) => [...prev, gPayOption]);
      }, 5000);
      return () => clearTimeout(timer);
    }, []);

    const handleKeyDown = (
      event: React.KeyboardEvent<HTMLDivElement>,
      optionId: string
    ) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onChange(optionId);
      }
    };

    const validateCardData = (validateEmpty: boolean, data: CardData = cardData) => {
      const newErrors = {
        cardNumber: '',
        expiryDate: '',
        cvv: '',
      };

      if (validateEmpty && !data.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (data.cardNumber && !/^\d{16}$/.test(data.cardNumber)) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }

      if (validateEmpty && !data.expiryDate) {
        newErrors.expiryDate = 'Expiration date is required';
      } else if (
        data.expiryDate &&
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)
      ) {
        newErrors.expiryDate = 'Expiration must be in MM/YY format';
      }

      if (validateEmpty && !data.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (data.cvv && !/^\d{3,4}$/.test(data.cvv)) {
        newErrors.cvv = 'CVV must be 3 or 4 digits';
      }

      setErrors(newErrors);

      return !newErrors.cardNumber && !newErrors.expiryDate && !newErrors.cvv;
    };

    return (
      <div className="radio-button-container" role="radiogroup" aria-label="Payment options">
        {options.map((option) => (
          <div
            key={option.id}
            role="radio"
            tabIndex={0}
            aria-checked={value === option.id}
            className={`radio-button ${value === option.id ? 'selected' : ''}`}
            onClick={() => onChange(option.id)}
            onKeyDown={(e) => handleKeyDown(e, option.id)}
            aria-label={option.label}
          >
            <div className="radio-top">
              <div className="radio-left">
                <div className="custom-radio" aria-hidden="true" />
                <span className="label">{option.label}</span>
              </div>
              <img
                src={option.imgSrc}
                alt={`${option.label} logo`}
                className="radio-image"
              />
            </div>

            {/* {value === option.id && (
              <div className="radio-extra">
                {option.id === 'PayPal' && (
                  <CheckBox
                    label="Pay with the PayPal account"
                    linkText="terms and conditions"
                    linkUrl="https://example.com/terms"
                    checked={isChecked}
                    onChange={setIsChecked}
                  />
                )}

                {option.id === 'CreditCard' && (
                  <div className="card-details" aria-live="polite">
                    <div>
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        id="cardNumber"
                        type="text"
                        inputMode="numeric"
                        maxLength={16}
                        value={cardData.cardNumber}
                        onChange={(e) =>
                          handleCardChange('cardNumber', e.target.value)
                        }
                        aria-invalid={!!errors.cardNumber}
                        aria-describedby="cardNumber-error"
                      />
                      {errors.cardNumber && (
                        <p id="cardNumber-error" className="error" role="alert">
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="expiryDate">Expiration Date</label>
                      <input
                        id="expiryDate"
                        type="text"
                        placeholder="MM/YY"
                        value={cardData.expiryDate}
                        onChange={(e) =>
                          handleCardChange('expiryDate', e.target.value)
                        }
                        aria-invalid={!!errors.expiryDate}
                        aria-describedby="expiryDate-error"
                      />
                      {errors.expiryDate && (
                        <p id="expiryDate-error" className="error" role="alert">
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="cvv">CVV</label>
                      <input
                        id="cvv"
                        type="password"
                        maxLength={4}
                        value={cardData.cvv}
                        onChange={(e) =>
                          handleCardChange('cvv', e.target.value)
                        }
                        aria-invalid={!!errors.cvv}
                        aria-describedby="cvv-error"
                      />
                      {errors.cvv && (
                        <p id="cvv-error" className="error" role="alert">
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )} */}
          </div>
        ))}
      </div>
    );
  }
);

export default RadioButton;
