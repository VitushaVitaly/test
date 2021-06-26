import { useEffect, useState } from 'react';
import './App.css';
import ProductsList from './components/product-list/ProductList';
import Cart from './components/cart/Cart'
import axios from 'axios';
import {
  ApiGoodsEntry,
  ApiProducts,
  ApiNames,
  ProductList,
  Product
} from './types';

function App() {
  const [products, setProducts] = useState<Array<ApiGoodsEntry>>([]);
  const [names, setNames] = useState<ApiNames>({});
  const [productGroups, setProductGroups] = useState<ProductList>([]);
  const [productCart, setProductCart] = useState<Product[]>([]);
  const [rate, setRate] = useState(72);
  const [cart, setCart] = useState<{ [id: number]: number }>({});

  const setProductQuantity = (id: number, quanity: number) => {
    let currentCart: { [id: number]: number } = {}
    if (quanity === 0) {
      currentCart = { ...cart };
      delete currentCart[id];
    }
    else {
      currentCart = { ...cart, [id]: quanity };
    }
    setCart(currentCart);
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }

  const addProduct = (product: Product): void => {
    if (productCart.find(elem => elem.id === product.id) === undefined) {
      setProductQuantity(product.id, 1);
      setProductCart([...productCart, product]);
    }
  };

  const removeProduct = (product: Product): void => {
    const remaningProducts = productCart.filter(elem => elem.id !== product.id);
    if (remaningProducts.length !== productCart.length) {
      setProductQuantity(product.id, 0);
      setProductCart(remaningProducts);
    };
  };

  async function makeRequest<Type>(url: string, setState: (state: Type) => void) {
    try {
      const res = await axios(url);
      setState(res.data as Type);
      console.log(res);
    }
    catch (error) {
      console.error(`Error while fetchig data: ${error}`);
    }
  };

  function fetchData() {
    makeRequest('/products.json', (o: ApiProducts) => setProducts(o.Value.Goods));
    makeRequest('/names.json', setNames);
  };

  function rateUpdate() {
    function randomInteger(min: number, max: number) {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }
    setRate(randomInteger(50, 80));
  };

  useEffect(() => {
    const currentCart = localStorage.getItem('cart');
    if (currentCart) setCart(JSON.parse(currentCart));
    fetchData();
    const interval = setInterval(fetchData, 15000);
    const rateUpdateInteval = setInterval(rateUpdate, 20000);
    return () => {
      clearInterval(interval);
      clearInterval(rateUpdateInteval);
    };
  }, []);

  useEffect(() => {
    if (Object.keys(names).length === 0 || products.length === 0) return;

    const list: ProductList = [];
    const productCart: Array<Product> = [];

    for (const groupKey in names) {
      const groupId = parseInt(groupKey);
      const group = names[groupKey];
      const groupProducts: Array<Product> = [];

      for (const productKey in group.B) {
        const productId = parseInt(productKey);

        const productInfo = products.find(p => p.G === groupId && p.T === productId);
        if (productInfo !== undefined) {
          const product: Product = {
            id: productId,
            name: group.B[productKey].N,
            price: productInfo.C,
            quantity: productInfo.P
          };
          groupProducts.push(product);
          if (productId in cart)
            productCart.push(product);
        }
      };

      list.push({ id: groupId, name: group.G, products: groupProducts });
    };

    setProductCart(productCart);
    setProductGroups(list);
  }, [products, names]);

  return (
    <div className="background">
      <div className="App">
        <ProductsList products={productGroups} addProduct={addProduct} />
        <Cart
          products={productCart}
          removeProduct={removeProduct}
          setProductQuantity={setProductQuantity}
          rate={rate}
          currentQuantites={cart}
        />
      </div>
    </div>
  );
}

export default App;