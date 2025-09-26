import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, Mountain, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import sClassImage from '@/assets/s-class.jpg';
import gleImage from '@/assets/gle.jpg';
import lx570Image from '@/assets/lx570.jpg';
import gWagonImage from '@/assets/g-wagon.jpg';

const Fleet = () => {
  const categories = [
    {
      title: 'Executive SUVs',
      description: 'Command respect with our premium SUV collection',
      icon: Briefcase,
      vehicles: [
        {
          name: 'Mercedes G-Wagon',
          image: gWagonImage,
          seats: '5 Passengers',
          style: 'Iconic Luxury',
          occasions: 'VIP Events, Executive Travel',
          features: ['Premium Leather', 'Advanced Safety', 'All-Terrain Capable']
        },
        {
          name: 'Lexus LX 570',
          image: lx570Image,
          seats: '8 Passengers',
          style: 'Refined Power',
          occasions: 'Airport Transfers, Corporate Events',
          features: ['Spacious Interior', 'Premium Sound', 'Superior Comfort']
        }
      ]
    },
    {
      title: 'Luxury Sedans',
      description: 'Elegance and sophistication in every mile',
      icon: Users,
      vehicles: [
        {
          name: 'Mercedes S-Class',
          image: sClassImage,
          seats: '4 Passengers',
          style: 'Ultimate Luxury',
          occasions: 'Business Meetings, Special Events',
          features: ['Massage Seats', 'Executive Rear', 'Premium Technology']
        }
      ]
    },
    {
      title: 'Adventure Luxury',
      description: 'Luxury meets capability for every terrain',
      icon: Mountain,
      vehicles: [
        {
          name: 'Mercedes GLE',
          image: gleImage,
          seats: '7 Passengers',
          style: 'Versatile Elegance',
          occasions: 'Safari Tours, Family Events',
          features: ['Off-Road Ready', 'Panoramic Roof', 'Premium Comfort']
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto">
          <h1 className="section-title text-foreground mb-6 font-serif">
            Our <span className="text-primary">Premium Fleet</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from Kenya's most exclusive collection of luxury vehicles. 
            Each car is meticulously maintained and detailed to perfection.
          </p>
        </div>
      </section>

      {/* Fleet Categories */}
      {categories.map((category, categoryIndex) => (
        <section key={categoryIndex} className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <category.icon className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-4xl font-light text-foreground mb-4 font-serif">{category.title}</h2>
              <p className="text-lg text-muted-foreground">{category.description}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {category.vehicles.map((vehicle, vehicleIndex) => (
                <Card key={vehicleIndex} className="luxury-shadow hover:scale-105 luxury-transition bg-card border-border overflow-hidden">
                  <div className="relative">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-3 text-card-foreground">{vehicle.name}</h3>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Capacity:</span>
                        <span className="text-card-foreground font-medium">{vehicle.seats}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Style:</span>
                        <span className="text-card-foreground font-medium">{vehicle.style}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Best For:</span>
                        <span className="text-card-foreground font-medium text-right max-w-[150px]">{vehicle.occasions}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-muted-foreground mb-2">Key Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {vehicle.features.map((feature, featureIndex) => (
                          <span 
                            key={featureIndex}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link to="/quote" state={{ selectedCar: vehicle.name }}>
                      <Button className="w-full luxury-button bg-primary hover:bg-primary/90 group">
                        Request Quote
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto text-center">
          <h2 className="section-title text-secondary-foreground mb-6 font-serif">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            We have additional vehicles available for special requests. 
            Contact us to discuss your specific requirements.
          </p>
          
          <Link to="/contact">
            <Button 
              size="lg" 
              className="luxury-button text-lg px-8 py-4 bg-primary hover:bg-primary/90"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Fleet;