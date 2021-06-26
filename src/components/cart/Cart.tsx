import { Product } from '../../types';
import { useEffect, useState } from 'react';
import CartItem from './CartItem';
import './Cart.css';

interface CartProps {
  products: Product[];
  removeProduct: (product: Product) => void;
  setProductQuantity: (id: number, quanity: number) => void;
  rate: number;
  currentQuantites: { [id: number]: number };
};

function Cart(props: CartProps) {
  const {
    products,
    rate,
    removeProduct,
    setProductQuantity,
    currentQuantites,
  } = props;

  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    const total = products
      .map(product => { return currentQuantites[product.id] * product.price })
      .reduce((a, b) => a + b, 0);

    setTotalCost(total * rate);
  }, [products, rate, currentQuantites]);

  return (
    <div className="cart">
      <div className="title">Корзина</div>
      <div className="content">
        {products.length !== 0 ?
          <table>
            <thead>
              <tr>
                <th>Наименование товара и описание</th>
                <th>Количество</th>
                <th>Цена</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) =>
                <CartItem
                  key={product.id}
                  removeProduct={removeProduct}
                  setProductQuantity={setProductQuantity}
                  rate={rate}
                  product={product}
                  initialQuantity={currentQuantites[product.id]}
                />)}
              <tr>
                <td className="total" colSpan={4}>{`Общая стоимость: ${(totalCost).toLocaleString('ru-RU', { minimumFractionDigits: 2 })} руб.`}</td>
              </tr>
            </tbody>
          </table>
          : <div className="empty">Товары отсутствуют</div>
        }
      </div>
    </div>
  )
};

export default Cart;