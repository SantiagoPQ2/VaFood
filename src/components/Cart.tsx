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
  const { cartItems, totalItems, totalPrice, subtotal, discount, clearCart } = useCart();

  const handleFinishOrder = () => {
    if (cartItems.length === 0) return;
    
    if (totalPrice < 30000) {
      alert('El monto mínimo de compra es $30.000');
      return;
    }
    
    sendToWhatsApp(cartItems);
    clearCart();
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-40 ${isOpen ? 'visible' : 'invisible'}`}>
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`} 
        onClick={onClose}
      ></div>
      
      <div 
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
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
          
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-base text-gray-600">
                  <p>Subtotal</p>
                  <p>{formatCurrency(subtotal)}</p>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-base text-green-600">
                    <p>Descuento</p>
                    <p>-{formatCurrency(discount)}</p>
                  </div>
                )}
                <div className="flex justify-between text-lg font-medium text-gray-800 pt-2 border-t">
                  <p>Total</p>
                  <p>{formatCurrency(totalPrice)}</p>
                </div>
                {totalPrice < 30000 && (
                  <p className="text-red-600 text-sm mt-2">
                    El monto mínimo de compra es {formatCurrency(30000)}
                  </p>
                )}
              </div>
              <button
                onClick={handleFinishOrder}
                className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                  totalPrice >= 30000 ? 'bg-vafood-red hover:bg-vafood-black' : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={totalPrice < 30000}
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