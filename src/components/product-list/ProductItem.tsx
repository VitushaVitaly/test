import { Product } from '../../types';
import './ProductItem.css';

interface ProductItemProps {
  product: Product;
  addProduct: (product: Product) => void;
};

function ProductItem(props: ProductItemProps) {
  const { product, addProduct } = props;
  return (
    <div className="item" onClick={() => addProduct(product)}>
      <div className="name">
        {`${product.name} (${product.quantity})`}
      </div>
      <div className="price">{product.price}</div>
    </div>
  );
}

export default ProductItem;