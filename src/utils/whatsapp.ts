import { CartItem } from '../types/product';
import { formatCurrency } from './formatCurrency';

export const sendToWhatsApp = (
  cartItems: CartItem[],
  customerName: string,
  customerPhone: string,
  customerEmail: string,
  customerAddress: string
): void => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product.discountedPrice || item.product.price) * item.quantity,
    0
  );

  // Calculate discount
  let discount = 0;
  if (subtotal >= 1000) {
    discount = subtotal * 0.05; // 5% discount
  } else if (subtotal >= 500) {
    discount = subtotal * 0.03; // 3% discount
  }

  const total = subtotal - discount;
  
  let message = `¡Hola! He realizado una compra en VAFood.\n\n`;
  message += `*Detalle del Pedido:*\n`;
  
  cartItems.forEach((item) => {
    const price = item.product.discountedPrice || item.product.price;
    message += `• ${item.product.name} (${item.quantity}x) - ${formatCurrency(price)} c/u\n`;
  });
  
  message += `\n*Subtotal: ${formatCurrency(subtotal)}*`;
  
  if (discount > 0) {
    message += `\n*Descuento: -${formatCurrency(discount)}*`;
  }
  
  message += `\n*Total Final: ${formatCurrency(total)}*\n\n`;
  
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = '5493515296307'; // Edit this with your WhatsApp number
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
};
