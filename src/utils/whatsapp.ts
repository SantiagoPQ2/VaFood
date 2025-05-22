import { CartItem } from '../types/product';
import { formatCurrency } from './formatCurrency';

export const sendToWhatsApp = (
  cartItems: CartItem[],
  customerName: string,
  customerPhone: string,
  customerEmail: string,
  customerAddress: string
): void => {
  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + (item.product.discountedPrice || item.product.price) * item.quantity,
    0
  );
  
  // Create order message
  let message = `¡Hola! He realizado una compra en VAFood.\n\n`;
  message += `*Detalle del Pedido:*\n`;
  
  cartItems.forEach((item) => {
    const price = item.product.discountedPrice || item.product.price;
    message += `• ${item.product.name} (${item.quantity}x) - ${formatCurrency(price)} c/u\n`;
  });
  
  message += `\n*Total: ${formatCurrency(total)}*\n\n`;
  
  // Encode for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Replace with your business phone number
  const phoneNumber = '5493415979346'; // Edit this with your WhatsApp number
  
  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  // Open in new tab
  window.open(whatsappUrl, '_blank');
};
