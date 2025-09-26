import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-car.jpg';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${heroImage})` 
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1 className="hero-text text-white mb-6 font-serif">
          Luxury Cars for<br />
          <span className="text-primary">Nairobi's Finest</span><br />
          Drives
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          Experience premium mobility with Kenya's most exclusive fleet of luxury vehicles. 
          From executive meetings to special occasions, arrive in unmatched style.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/quote">
            <Button 
              size="lg" 
              className="luxury-button text-lg px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground group"
            >
              Request a Quote
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <Link to="/fleet">
            <Button 
              variant="outline" 
              size="lg" 
              className="luxury-button text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10 hover:border-primary"
            >
              View Our Fleet
            </Button>
          </Link>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;