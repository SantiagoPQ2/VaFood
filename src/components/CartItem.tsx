import React from 'react';
import { CartItem as CartItemType } from '../types/product';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { Trash, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  const price = product.discountedPrice || product.price;

  return (
    <div className="flex py-4 border-b border-gray-200 last:border-b-0">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-800">
          <h3 className="line-clamp-1">{product.name}</h3>
          <p className="ml-4 text-right">
            {formatCurrency(price * quantity)}
          </p>
        </div>

        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="text-gray-500 hover:text-gray-700 p-1"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            
            <span className="text-gray-500 min-w-[1.5rem] text-center">
              {quantity}
            </span>
            
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="text-gray-500 hover:text-gray-700 p-1"
              aria-label="Increase quantity"
              disabled={quantity >= product.stock}
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={() => removeFromCart(product.id)}
            className="font-medium text-red-600 hover:text-red-700 p-1"
            aria-label="Remove"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;