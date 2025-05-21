import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import { formatCurrency } from '../utils/formatCurrency';
import { ShoppingBag, ArrowRight, X } from 'lucide-react';
import { sendToWhatsApp } from '../utils/whatsapp';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();

  const handleFinishOrder = () => {
    if (cartItems.length === 0) return;
    
    // Send to WhatsApp with empty customer info - it will be filled by the customer in the message
    sendToWhatsApp(cartItems, '', '', '', '');
    clearCart();
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-40 ${isOpen ? 'visible' : 'invisible'}`}>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`} 
        onClick={onClose}
      ></div>
      
      {/* Cart panel */}
      <div 
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <ShoppingBag className="mr-2" size={20} />
              Tu Carrito
              {totalItems > 0 && (
                <span className="ml-2 text-sm text-gray-600">({totalItems} items)</span>
              )}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Cart content */}
          <div className="flex-grow overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag size={48} className="mb-4 opacity-30" />
                <p className="text-center">Tu carrito está vacío</p>
              </div>
            ) : (
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            )}
          </div>
          
          {/* Footer with total and finish button */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="flex justify-between text-base font-medium text-gray-800 mb-4">
                <p>Total</p>
                <p>{formatCurrency(totalPrice)}</p>
              </div>
              <button
                onClick={handleFinishOrder}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700"
              >
                Finalizar Pedido
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;