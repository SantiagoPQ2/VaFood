import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import Header from '../components/Header';
import Cart from '../components/Cart';
import ProductDetail from '../components/ProductDetail';
import products from '../data/products';
import categories from '../data/categories';
import { Product } from '../types/product';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPromos, setShowPromos] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let filtered = [...products];
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.categories.includes(selectedCategory)
      );
    }
    
    // Apply promo filter
    if (showPromos) {
      filtered = filtered.filter(product => 
        product.discountedPrice !== undefined
      );
    }
    
    // Apply search filter
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

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo(0, 0);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onOpenCart={handleOpenCart} 
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />
      
      <main className="container mx-auto px-4 py-8">
        {selectedProduct ? (
          <ProductDetail product={selectedProduct} onBack={handleBackToProducts} />
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Shop Our Products
            </h1>
            
            <div className="md:grid md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
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
                      No products found matching your criteria.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      
      <Cart isOpen={isCartOpen} onClose={handleCloseCart} />
    </div>
  );
};

export default Home;