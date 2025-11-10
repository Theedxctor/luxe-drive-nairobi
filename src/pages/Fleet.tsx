import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, Bus, ArrowRight, Star, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useFleet } from '@/hooks/useFleet';

type CategoryIcon = {
  [key: string]: React.ComponentType<{ className?: string }>;
};

const categoryIcons: CategoryIcon = {
  'Executive SUVs': Briefcase,
  'Luxury Sedans': Users,
  'Executive Vans & Transfers': Bus,
};

// Executive SUVs
import landCruiserLc200Image from '@/assets/land-cruiser-lc200.jpg';
import landCruiserPradoImage from '@/assets/land-cruiser-prado.jpg';
import lx570Image from '@/assets/lx570.jpg';
import mercedesGlcImage from '@/assets/mercedes-glc.jpg';
import mercedesGleImage from '@/assets/mercedes-gle.jpeg';

const Fleet = () => {
  const navigate = useNavigate();
  const { categories, loading, error } = useFleet();

  if (loading) {
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
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div 
                className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
                data-aos="fade-up"
                data-aos-duration="600"
              >
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h2 
                className="text-4xl font-light text-foreground mb-4 font-serif"
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="600"
              >
                Executive SUVs
              </h2>
              <p 
                className="text-lg text-muted-foreground"
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="600"
              >
                Command respect with our premium SUV collection
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="p-4">
                  <div className="animate-pulse space-y-3">
                    <div className="h-48 bg-muted rounded-lg"></div>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20">
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

        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div 
                className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
                data-aos="fade-up"
                data-aos-duration="600"
              >
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h2 
                className="text-4xl font-light text-foreground mb-4 font-serif"
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="600"
              >
                Executive SUVs
              </h2>
              <p 
                className="text-lg text-muted-foreground"
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="600"
              >
                Command respect with our premium SUV collection
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <div className="col-span-3 text-center py-8">
                <p className="text-destructive">Error loading vehicles. Please try again later.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

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
              <div 
                className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
                data-aos="fade-up"
                data-aos-duration="600"
              >
                {React.createElement(categoryIcons[category.title] || Briefcase, { className: 'h-8 w-8 text-primary' })}
              </div>
              <h2 
                className="text-4xl font-light text-foreground mb-4 font-serif"
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="600"
              >
                {category.title}
              </h2>
              <p 
                className="text-lg text-muted-foreground"
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="600"
              >
                {category.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {category.vehicles.map((vehicle, vehicleIndex) => (
                <Card 
                  key={vehicle.id} 
                  className="luxury-shadow hover:scale-105 luxury-transition bg-card border-border overflow-hidden h-full flex flex-col"
                  data-aos={vehicleIndex % 2 === 0 ? "fade-right" : "fade-left"}
                  data-aos-delay={vehicleIndex * 100}
                  data-aos-duration="800"
                >
                  <div className="relative flex-1 flex flex-col">
                    <div className="relative flex-1">
                      <div className="relative w-full h-64 overflow-hidden bg-gray-100">
                        <img 
                          src={`/images/vehicles/${vehicle.imageUrls?.[0]?.split('/').pop() || 'vehicle-placeholder.jpg'}`} 
                          alt={`${vehicle.make} ${vehicle.model}`}
                          className="absolute inset-0 w-full h-full object-cover object-center"
                          style={{
                            minHeight: '100%',
                            minWidth: '100%',
                            width: 'auto',
                            height: 'auto',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                          }}
                          data-aos="zoom-in"
                          data-aos-delay={vehicleIndex * 100 + 200}
                          data-aos-duration="600"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            const currentSrc = target.getAttribute('src') || '';
                            
                            // Try alternative extensions if the image fails to load
                            if (currentSrc.endsWith('.jpg')) {
                              target.src = currentSrc.replace(/\.jpg$/, '.jpeg');
                            } else if (currentSrc.endsWith('.jpeg')) {
                              target.src = currentSrc.replace(/\.jpeg$/, '.jpg');
                            } else {
                              // If not a jpg/jpeg or if retry failed, show placeholder
                              target.onerror = null;
                              target.src = '/images/vehicle-placeholder.jpg';
                              Object.assign(target.style, {
                                objectFit: 'contain',
                                width: '80%',
                                height: 'auto',
                                maxHeight: '100%',
                                margin: '0 auto',
                                display: 'block'
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {vehicle.isFeatured && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-0.5 rounded">
                          Featured
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-2xl font-semibold text-card-foreground">
                            {vehicle.make} {vehicle.model}
                          </h3>
                          <div className="flex items-center">
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="font-medium">{vehicle.rating}</span>
                            <span className="text-muted-foreground text-sm ml-1">({vehicle.reviewCount})</span>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-4">{vehicle.year} • {vehicle.seats} Seats • {vehicle.luggageCapacity}</p>
                        
                        <div className="mb-4">
                          <span className="text-2xl font-bold">${vehicle.pricePerDay}</span>
                          <span className="text-muted-foreground text-sm"> / day</span>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          {vehicle.highlights?.slice(0, 3).map((highlight, i) => (
                            <div key={i} className="flex items-center">
                              <Check className="w-4 h-4 text-green-500 mr-2" />
                              <span className="text-sm">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-6 pt-0 mt-auto">
                        <div className="flex flex-col space-y-3">
                          <Button 
                            variant="outline" 
                            className="group w-full justify-between"
                            onClick={() => navigate(`/fleet/${vehicle.id}`)}
                          >
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                          <Button 
                            className="w-full"
                            onClick={() => navigate('/booking', { 
                              state: { 
                                vehicleId: vehicle.id,
                                vehicleName: `${vehicle.make} ${vehicle.model}`,
                                pricePerDay: vehicle.pricePerDay,
                                imageUrl: vehicle.imageUrls?.[0] 
                              } 
                            })}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}
      
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-light text-foreground mb-6 font-serif">
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