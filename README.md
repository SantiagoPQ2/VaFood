# ShopEasy - Simple E-commerce

A simple e-commerce application that allows customers to browse products, add them to cart, and send orders via WhatsApp.

## Features

- Product catalog with categories
- Special offers filter
- Shopping cart
- WhatsApp integration for order processing
- Responsive design
- Search functionality

## Technologies

- React
- TypeScript
- Tailwind CSS
- Vite
- Lucide React Icons

## Getting Started

1. Clone the repository
```bash
git clone <your-repo-url>
```

2. Install dependencies
```bash
npm install
```

3. Update WhatsApp number
Edit `src/utils/whatsapp.ts` and replace the `phoneNumber` variable with your business WhatsApp number.

4. Start the development server
```bash
npm run dev
```

## Customizing Products

Edit `src/data/products.ts` to modify the product catalog. Each product should follow the Product interface defined in `src/types/product.ts`.

## License

MIT