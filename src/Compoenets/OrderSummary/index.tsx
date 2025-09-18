import React from 'react';

interface OrderItem {
  id: string;
  title: string;
  price: number;
  isMainItem?: boolean;
}

interface OrderSummaryProps {
  styles: { [key: string]: string };
  items: OrderItem[];
  showAuthorizationText?: boolean;
  authorizationText?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  styles,
  items,
  showAuthorizationText = true,
  authorizationText = "Ich bin (wir sind) zu vorgenannter Beauftragung berechtigt und im Falle der Vertretung ordnungsgemäß bevollmächtigt"
}) => {
  const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const mainItems = items.filter(item => item.isMainItem);
  const additionalItems = items.filter(item => !item.isMainItem);

  return (
    <>
      <hr />
      <div className={styles.summaryContainer}>
        {/* Main Items */}
        {mainItems.map((item) => (
          <div key={item.id} className={styles.amountInfo}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.price}>{formatPrice(item.price)}</div>
          </div>
        ))}

        {/* Additional Items */}
        {additionalItems.map((item) => (
          <div key={item.id} className={styles.amountInfo}>
            <div className={styles.desc}>{item.title}</div>
            <div className={styles.desc}>{formatPrice(item.price)}</div>
          </div>
        ))}

        {/* Total Section */}
        {items.length > 1 && (
          <>
            <hr />
            <div className={styles.amountInfo}>
              <div className={styles.title}>Gesamtbetrag</div>
              <div className={styles.price}>{formatPrice(totalAmount)}</div>
            </div>
          </>
        )}
      </div>

      {/* Authorization Text */}
      {showAuthorizationText && (
        <p className={styles.desc}>
          {authorizationText}
        </p>
      )}
    </>
  );
};

export default OrderSummary;