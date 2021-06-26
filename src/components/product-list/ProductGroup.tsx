import { Group, Product } from '../../types';
import ProductItem from './ProductItem';
import './ProductGroup.css';

interface ProductGroupProps extends Group {
  addProduct: (product: Product) => void
};

function ProductGroup(props: ProductGroupProps) {
  const { id, name, products, addProduct } = props;
  return (
    <div className="group">
      <div className="title">{name}</div>
      <div className="content">
        {
          products.map(product => <ProductItem key={product.id} addProduct={addProduct} product={product} />)
        }
      </div>
    </div>
  );
}

export default ProductGroup;