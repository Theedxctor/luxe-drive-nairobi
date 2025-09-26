import Hero from '@/components/Hero';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Clock, Award, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: 'Trusted & Secure',
      description: 'Fully insured vehicles with comprehensive coverage and verified professional drivers'
    },
    {
      icon: Clock,
      title: '24/7 Service',
      description: 'Round-the-clock availability for your convenience, whenever luxury calls'
    },
    {
      icon: Award,
      title: 'Premium Experience',
      description: 'Meticulously maintained fleet with exceptional service standards'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title text-foreground mb-6 font-serif">
              Why Choose <span className="text-primary">Luxe Drive</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We deliver more than transportation – we provide an experience of luxury, 
              reliability, and sophistication that matches Nairobi's dynamic lifestyle.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="luxury-shadow hover:scale-105 luxury-transition bg-card border-border">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-card-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto text-center">
          <h2 className="section-title text-secondary-foreground mb-6 font-serif">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Book your premium vehicle today and discover why discerning clients 
            across Nairobi choose Luxe Drive for their most important journeys.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/quote">
              <Button 
                size="lg" 
                className="luxury-button text-lg px-8 py-4 bg-primary hover:bg-primary/90"
              >
                Get Your Quote
              </Button>
            </Link>
            
            <a href="tel:+254700000000" className="flex items-center space-x-2 text-primary hover:text-primary/80 luxury-transition">
              <Phone className="h-5 w-5" />
              <span className="text-lg">+254 700 000 000</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;