import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import Cart from '../components/Cart';
import ProductDetail from '../components/ProductDetail';
import products from '../data/products';
import categories from '../data/categories';
import { Product } from '../types/product';

interface HomeProps {
  isCartOpen: boolean;
  onCloseCart: () => void;
  searchQuery: string;
}

const Home: React.FC<HomeProps> = ({ isCartOpen, onCloseCart, searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPromos, setShowPromos] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    let filtered = [...products];
    
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.categories.includes(selectedCategory)
      );
    }
    
    if (showPromos) {
      filtered = filtered.filter(product => 
        product.discountedPrice !== undefined
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, showPromos, searchQuery]);

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const handleTogglePromos = () => {
    setShowPromos(!showPromos);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo(0, 0);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {selectedProduct ? (
          <ProductDetail product={selectedProduct} onBack={handleBackToProducts} />
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Nuestros Productos
            </h1>
            
            <div className="md:grid md:grid-cols-4 gap-6">
              <div className="md:col-span-1 mb-6 md:mb-0">
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleCategorySelect}
                  showPromos={showPromos}
                  onTogglePromos={handleTogglePromos}
                />
              </div>
              
              <div className="md:col-span-3">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-500">
                      No se encontraron productos que coincidan con tu búsqueda.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => handleProductClick(product)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Cart isOpen={isCartOpen} onClose={onCloseCart} />
    </div>
  );
};

export default Home;