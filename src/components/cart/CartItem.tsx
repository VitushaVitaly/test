import { useEffect, useState } from 'react';
import { Product } from '../../types';
import './CartItem.css'

interface CartItemProps {
  product: Product;
  removeProduct: (product: Product) => void;
  setProductQuantity: (id: number, quanity: number) => void;
  rate: number;
  initialQuantity: number;
};

function CartItem(props: CartItemProps) {
  const {
    product,
    removeProduct,
    setProductQuantity,
    rate,
    initialQuantity
  } = props;

  const validateQuantity = (value: string): number => Math.max(1, Math.min(parseInt(value) || 1, product.quantity));

  const [currentPrice, setRate] = useState(product.price * rate);
  const [rateClass, setRateClass] = useState('');

  useEffect(() => {
    setRate(product.price * rate);

    if (product.price * rate > currentPrice) {
      setRateClass('rate-up');
    }
    else if (product.price * rate < currentPrice) {
      setRateClass('rate-down');
    }
    else {
      setRateClass('');
    }

    setTimeout(() => setRateClass(''), 2000);
  }, [rate]);

  return (
    <tr>
      <td>{product.name}</td>
      <td>
        <input
          type="number"
          min="1"
          max={product.quantity}
          value={initialQuantity}
          onChange={(e) => setProductQuantity(product.id, validateQuantity(e.target.value))}
        /> шт.
      </td>
      <td className={rateClass}>{`${(currentPrice).toLocaleString('ru-RU', { minimumFractionDigits: 2 })} руб. / шт.`}</td>
      <td><button onClick={() => removeProduct(product)}>Удалить</button></td>
    </tr>
  )
}

export default CartItem;