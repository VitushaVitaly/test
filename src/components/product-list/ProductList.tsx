import { Product, ProductList } from '../../types';
import './ProductList.css'
import ProductGroup from './ProductGroup'

interface ProductListProps {
  products: ProductList;
  addProduct: (product: Product) => void
};

function List(props: ProductListProps) {
  const {products, addProduct} = props;
  return (
    <div className="list">
      {
        products.map(group => group.products.length !== 0 && <ProductGroup key={group.id} addProduct={addProduct} {...group}/>)
      }
    </div>
  );
}

export default List;