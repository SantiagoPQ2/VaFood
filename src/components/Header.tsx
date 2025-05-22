import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenCart: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  currentPage: 'home' | 'about';
  onPageChange: (page: 'home' | 'about') => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onOpenCart, 
  onSearch, 
  searchQuery, 
  currentPage,
  onPageChange 
}) => {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(searchQuery);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-30 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img src="/vafood-logo.png" alt="VAFood" className="h-8 mr-2" />
              <span className="text-xl font-bold text-vafood-red">VAFood</span>
            </a>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            <nav className="flex space-x-6 mr-6">
              <button
                onClick={() => onPageChange('home')}
                className={`text-gray-700 hover:text-vafood-red transition-colors ${
                  currentPage === 'home' ? 'font-semibold text-vafood-red' : ''
                }`}
              >
                Productos
              </button>
              <button
                onClick={() => onPageChange('about')}
                className={`text-gray-700 hover:text-vafood-red transition-colors ${
                  currentPage === 'about' ? 'font-semibold text-vafood-red' : ''
                }`}
              >
                Acerca de
              </button>
            </nav>

            {currentPage === 'home' && (
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-vafood-red focus:border-transparent"
                />
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </form>
            )}

            <button
              onClick={onOpenCart}
              className="relative p-2 text-vafood-red hover:text-vafood-black transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-vafood-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={onOpenCart}
              className="relative p-2 mr-2 text-vafood-red hover:text-vafood-black transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-vafood-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 focus:outline-none"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden bg-white shadow-lg transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-40' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <nav className="flex flex-col space-y-2 mb-3">
            <button
              onClick={() => {
                onPageChange('home');
                toggleMobileMenu();
              }}
              className={`text-left text-gray-700 hover:text-vafood-red transition-colors ${
                currentPage === 'home' ? 'font-semibold text-vafood-red' : ''
              }`}
            >
              Productos
            </button>
            <button
              onClick={() => {
                onPageChange('about');
                toggleMobileMenu();
              }}
              className={`text-left text-gray-700 hover:text-vafood-red transition-colors ${
                currentPage === 'about' ? 'font-semibold text-vafood-red' : ''
              }`}
            >
              Acerca de
            </button>
          </nav>

          {currentPage === 'home' && (
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-vafood-red focus:border-transparent"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </form>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
