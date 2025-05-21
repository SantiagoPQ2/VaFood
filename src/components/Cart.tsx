import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import { formatCurrency } from '../utils/formatCurrency';
import { ShoppingBag, ArrowRight, X } from 'lucide-react';
import { sendOrder } from '../utils/whatsapp';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();
  const [phone, setPhone] = useState('');

  const handleFinishOrder = async () => {
    if (cartItems.length === 0) return;
    if (!phone) {
      alert('Por favor ingresa tu número de WhatsApp');
      return;
    }

    const items = cartItems.map(i => ({
      name: i.product.title || i.product.name,
      price: i.product.price,
      quantity: i.quantity,
    }));

    const success = await sendOrder({ phone, items, total: totalPrice });
    if (success) {
      alert('¡Pedido enviado! Revisa tu WhatsApp.');
      clearCart();
      onClose();
    } else {
      alert('Hubo un error al enviar el pedido. Intenta de nuevo.');
    }
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
                {cartItems.map(item => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer with total, phone input and finish button */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              {/* Input de WhatsApp */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tu WhatsApp:
                </label>
                <input
                  type="text"
                  placeholder="+54911xxxxxxx"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

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
