import React from 'react';
import { ShoppingCart, Truck, CreditCard, Phone } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Sobre VAFood
        </h1>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              ¿Cómo funciona?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <ShoppingCart className="text-vafood-red w-6 h-6 mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">1. Elige tus productos</h3>
                  <p className="text-gray-600">
                    Navega por nuestro catálogo y agrega los productos que desees a tu carrito.
                    Aprovecha nuestros descuentos especiales:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-600">
                    <li>3% de descuento en compras mayores a $500</li>
                    <li>5% de descuento en compras mayores a $1000</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start">
                <CreditCard className="text-vafood-red w-6 h-6 mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">2. Finaliza tu pedido</h3>
                  <p className="text-gray-600">
                    Revisa tu carrito y haz clic en "Finalizar Pedido" cuando estés listo.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="text-vafood-red w-6 h-6 mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">3. Confirma por WhatsApp</h3>
                  <p className="text-gray-600">
                    Serás redirigido a WhatsApp con el detalle de tu pedido para confirmar la compra
                    directamente con nuestro equipo.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Truck className="text-vafood-red w-6 h-6 mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">4. Recibe tu pedido</h3>
                  <p className="text-gray-600">
                    Coordinaremos la entrega de tu pedido a través de WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Sobre nosotros
            </h2>
            <p className="text-gray-600 mb-4">
              VAFood es tu proveedor confiable de alimentos de calidad. Nos especializamos en 
              hamburguesas, salchichas, fiambres y fideos, ofreciendo siempre los mejores 
              productos para tu mesa.
            </p>
            <p className="text-gray-600">
              Nuestro compromiso es brindarte una experiencia de compra fácil y segura, 
              con la comodidad de hacer tu pedido online y coordinar la entrega por WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;