import React from 'react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { ShoppingCart, Tag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();
  const isOnSale = !!product.discountedPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    addToCart(product, 1);

    // Create and animate notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-vafood-red text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-notification';
    notification.textContent = '¡Producto agregado al carrito!';
    document.body.appendChild(notification);

    // Remove notification after animation
    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {isOnSale && (
          <div className="absolute top-0 right-0 bg-vafood-red text-white px-2 py-1 text-sm font-semibold">
            <div className="flex items-center gap-1">
              <Tag size={14} />
              <span>OFERTA</span>
            </div>
          </div>
        )}
        {product.featured && (
          <div className="absolute top-0 left-0 bg-vafood-black text-white px-2 py-1 text-sm font-semibold">
            Destacado
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
        
        <div className="mb-2 h-12 overflow-hidden">
          <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <div>
            {isOnSale ? (
              <div className="flex items-center">
                <span className="text-gray-400 line-through text-sm mr-2">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-vafood-red font-bold">
                  {formatCurrency(product.discountedPrice!)}
                </span>
              </div>
            ) : (
              <span className="font-bold text-gray-800">{formatCurrency(product.price)}</span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center bg-vafood-red hover:bg-vafood-black text-white p-2 rounded-full transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;