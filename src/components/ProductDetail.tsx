import React, { useState } from 'react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { ShoppingCart, ChevronLeft, Plus, Minus, Tag, Box } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const isOnSale = !!product.discountedPrice;
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-teal-600 hover:text-teal-700 mb-6 transition-colors"
      >
        <ChevronLeft size={20} />
        <span>Back to Products</span>
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="relative h-64 md:h-full">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {isOnSale && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  <div className="flex items-center gap-1">
                    <Tag size={14} />
                    <span>ON SALE</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 md:w-1/2">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              {isOnSale ? (
                <div className="flex items-center">
                  <span className="text-gray-400 line-through text-lg mr-2">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-red-600 font-bold text-2xl">
                    {formatCurrency(product.discountedPrice!)}
                  </span>
                </div>
              ) : (
                <span className="font-bold text-gray-800 text-2xl">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            <div className="flex items-center mb-4">
              <Box size={18} className="text-gray-600 mr-2" />
              <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>
            
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="p-2 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  readOnly
                  className="p-2 w-16 text-center border-y border-gray-300"
                />
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className="p-2 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="mr-2" size={20} />
              Add to Cart
            </button>
            
            <div className="mt-4 text-sm text-gray-500">
              Categories: {product.categories.join(', ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;