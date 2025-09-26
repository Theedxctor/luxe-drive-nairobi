import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Plane, Briefcase, Clock, Shield, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: 'Wedding Services',
      description: 'Make your special day unforgettable with our luxury wedding transportation',
      features: [
        'Bridal car decoration with ribbons and flowers',
        'Professional chauffeur in formal attire',
        'Red carpet service for the bride and groom',
        'Multiple vehicles for wedding party',
        'Photography-friendly luxury vehicles',
        'Flexible timing for ceremony and reception'
      ],
      popular: true
    },
    {
      icon: Plane,
      title: 'Airport Transfers',
      description: 'Seamless, punctual transfers to and from Jomo Kenyatta International Airport',
      features: [
        'Flight tracking for arrival delays',
        'Meet and greet service at arrivals',
        'Complimentary waiting time',
        'Luggage assistance',
        '24/7 availability for all flights',
        'Fixed rates with no hidden charges'
      ],
      popular: false
    },
    {
      icon: Briefcase,
      title: 'Corporate Chauffeur',
      description: 'Professional transportation solutions for businesses and executives',
      features: [
        'Dedicated account management',
        'Monthly billing and reporting',
        'Executive-level vehicles',
        'Professionally trained chauffeurs',
        'Confidentiality and discretion assured',
        'Multi-city and long-distance trips'
      ],
      popular: false
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Punctual Service',
      description: 'Always on time, every time'
    },
    {
      icon: Shield,
      title: 'Fully Insured',
      description: 'Comprehensive coverage for peace of mind'
    },
    {
      icon: Star,
      title: 'Premium Experience',
      description: 'Luxury service that exceeds expectations'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto">
          <h1 className="section-title text-foreground mb-6 font-serif">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From intimate celebrations to corporate events, we provide luxury transportation 
            solutions tailored to your specific needs across Nairobi and beyond.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className={`luxury-shadow hover:scale-105 luxury-transition bg-card border-border relative ${service.popular ? 'ring-2 ring-primary' : ''}`}>
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-serif text-card-foreground">{service.title}</CardTitle>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-card-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/quote">
                    <Button className="w-full luxury-button bg-primary hover:bg-primary/90 group">
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title text-secondary-foreground mb-6 font-serif">
              Why Choose Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every service we provide is backed by our commitment to excellence, 
              reliability, and the highest standards of luxury transportation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-secondary-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Service CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="section-title text-foreground mb-6 font-serif">
            Need Something <span className="text-primary">Special?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            We understand that every occasion is unique. Let us create a 
            customized transportation solution that perfectly matches your needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/quote">
              <Button 
                size="lg" 
                className="luxury-button text-lg px-8 py-4 bg-primary hover:bg-primary/90"
              >
                Request Custom Quote
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="lg" 
                className="luxury-button text-lg px-8 py-4 border-border hover:bg-secondary"
              >
                Speak to Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;