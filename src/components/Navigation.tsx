import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Fleet', path: '/fleet' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 luxury-transition hover:opacity-90">
            <img 
              src="/logo.jpeg" 
              alt="Luxe Drive Logo" 
              className="h-12 w-12 rounded-full object-cover border-2 border-primary"
            />
            <span className="font-serif text-2xl md:text-3xl font-bold text-primary">
              Luxe Drive
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`luxury-transition text-lg ${
                  isActive(link.path)
                    ? 'text-primary font-medium'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/quote">
              <Button variant="default" className="luxury-button bg-primary hover:bg-primary/90 text-primary-foreground">
                Request Quote
              </Button>
            </Link>
            <a href="tel:+254700000000" className="text-primary hover:text-primary/80 luxury-transition">
              <Phone className="h-6 w-6" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground hover:text-primary luxury-transition"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-background/98 backdrop-blur border-b border-border">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-lg luxury-transition ${
                    isActive(link.path)
                      ? 'text-primary font-medium'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <Link to="/quote" onClick={() => setIsOpen(false)}>
                  <Button variant="default" className="w-full luxury-button bg-primary hover:bg-primary/90">
                    Request Quote
                  </Button>
                </Link>
                <a 
                  href="tel:+254700000000" 
                  className="flex items-center justify-center space-x-2 text-primary hover:text-primary/80 luxury-transition"
                >
                  <Phone className="h-5 w-5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;