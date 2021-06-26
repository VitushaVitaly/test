interface ApiGoodsEntry {
  B: boolean;
  C: number;
  CV: null;
  G: number;
  P: number;
  Pl: null;
  T: number;
};

interface ApiProducts {
  Error: string;
  Id: number;
  Success: boolean;
  Value: { Goods: Array<ApiGoodsEntry> };
};

interface ApiProduct {
  N: string;
  T: number | string;
};

interface ApiGroup {
  G: string;
  C?: number;
  B: {[key: string]: ApiProduct};
};

interface ApiNames {
  [key: string]: ApiGroup;
};

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

interface Group {
  id: number;
  name: string;
  products: Array<Product>;
};

type ProductList = Array<Group>;

export type {
  ApiGoodsEntry,
  ApiProducts,
  ApiProduct,
  ApiGroup,
  ApiNames,
  Product,
  Group,
  ProductList
};