import React from 'react';

interface Product {
  id: string;
  name?: string;
  title?: string;
  description: string;
  price: number;
  image?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.name || product.title}</h3>
      {product.image && <img src={product.image} alt={product.name || product.title} />}
      <p>{product.description}</p>
      <p className="price">${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;
