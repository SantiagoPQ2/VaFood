import React from 'react';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/Header';
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('home');
  };

  return (
    <CartProvider>
      <Header 
        onOpenCart={handleOpenCart}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      {currentPage === 'home' ? (
        <Home isCartOpen={isCartOpen} onCloseCart={() => setIsCartOpen(false)} searchQuery={searchQuery} />
      ) : (
        <About />
      )}
    </CartProvider>
  );
}

export default App;