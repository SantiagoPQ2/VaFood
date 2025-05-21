// src/utils/whatsapp.ts

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}
export interface OrderData {
  phone: string;
  items: OrderItem[];
  total: number;
}

// URL donde corre bot-server.js
const BOT_URL = 'http://localhost:3000';

export async function sendOrder(order: OrderData): Promise<boolean> {
  try {
    const res = await fetch(`${BOT_URL}/new-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    return res.ok;
  } catch {
    return false;
  }
}
