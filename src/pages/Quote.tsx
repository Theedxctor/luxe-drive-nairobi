import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Send, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Quote = () => {
  const location = useLocation();
  const { toast } = useToast();
  const selectedCar = location.state?.selectedCar || '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pickupLocation: '',
    dropoffLocation: '',
    car: selectedCar,
    withDriver: 'yes',
    specialRequests: ''
  });

  const [pickupDate, setPickupDate] = useState<Date | undefined>();
  const [dropoffDate, setDropoffDate] = useState<Date | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const cars = [
    'Mercedes G-Wagon',
    'Mercedes S-Class', 
    'Mercedes GLE',
    'Lexus LX 570'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.pickupLocation.trim()) newErrors.pickupLocation = 'Pickup location is required';
    if (!formData.dropoffLocation.trim()) newErrors.dropoffLocation = 'Drop-off location is required';
    if (!pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (!dropoffDate) {
      newErrors.dropoffDate = 'Drop-off date is required';
    } else if (pickupDate && dropoffDate < pickupDate) {
      newErrors.dropoffDate = 'Drop-off date must be after pickup date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Format dates
      const formatDate = (date: Date) => format(date, 'EEEE, MMMM do yyyy');
      const formatTime = (date: Date) => format(date, 'h:mm a');
      
      // Create WhatsApp message with better formatting
      const message = `*LUXE DRIVE - QUOTE REQUEST*\n\n` +
        `*Name:* ${formData.name}\n` +
        `*Phone:* ${formData.phone}\n` +
        `*Email:* ${formData.email}\n\n` +
        `*PICKUP*\n` +
        `📍 ${formData.pickupLocation}\n` +
        `📅 ${formatDate(pickupDate!)}\n` +
        `⏰ ${formatTime(pickupDate!)}\n\n` +
        `*DROP-OFF*\n` +
        `📍 ${formData.dropoffLocation}\n` +
        `📅 ${formatDate(dropoffDate!)}\n` +
        `⏰ ${formatTime(dropoffDate!)}\n\n` +
        `*VEHICLE*\n` +
        `🚗 ${formData.car}\n` +
        `👨‍💼 With Driver: ${formData.withDriver === 'yes' ? 'Yes' : 'No'}\n\n` +
        `*SPECIAL REQUESTS*\n` +
        `${formData.specialRequests || 'None'}\n\n` +
        `_Thank you for choosing Luxe Drive! We'll get back to you shortly._`;

      const whatsappUrl = `https://wa.me/254796059968?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      // Show success message
      toast({
        title: 'Quote Request Sent!',
        description: 'You\'ll be redirected to WhatsApp to complete your request.',
      });

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        pickupLocation: '',
        dropoffLocation: '',
        car: '',
        withDriver: 'yes',
        specialRequests: ''
      });
      setPickupDate(undefined);
      setDropoffDate(undefined);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'There was an error processing your request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen pt-20 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="section-title text-foreground mb-6 font-serif">
            Request Your <span className="text-primary">Quote</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fill out the form below and we'll provide you with a personalized quote 
            for your luxury transportation needs.
          </p>
        </div>

        <Card className="luxury-shadow bg-card border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-card-foreground font-serif">Quote Request Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-card-foreground">Full Name *</Label>
                  <div className="space-y-1">
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className={`bg-background border-border ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="e.g. John Doe"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-card-foreground">Phone Number *</Label>
                  <div className="space-y-1">
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className={`bg-background border-border ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="e.g. +254 796 059 968"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-card-foreground">Email Address *</Label>
                <div className="space-y-1">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className={`bg-background border-border ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Location Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="pickup" className="text-card-foreground">Pickup Location *</Label>
                  <div className="space-y-1">
                    <Input
                      id="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                      required
                      className={`bg-background border-border ${errors.pickupLocation ? 'border-red-500' : ''}`}
                      placeholder="e.g. Jomo Kenyatta International Airport"
                    />
                    {errors.pickupLocation && (
                      <p className="text-sm text-red-500">{errors.pickupLocation}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dropoff" className="text-card-foreground">Drop-off Location *</Label>
                  <div className="space-y-1">
                    <Input
                      id="dropoffLocation"
                      value={formData.dropoffLocation}
                      onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                      required
                      className={`bg-background border-border ${errors.dropoffLocation ? 'border-red-500' : ''}`}
                      placeholder="e.g. Westlands, Nairobi"
                    />
                    {errors.dropoffLocation && (
                      <p className="text-sm text-red-500">{errors.dropoffLocation}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Date Selection */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-card-foreground">Pickup Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-background border-border",
                          !pickupDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {pickupDate ? format(pickupDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={pickupDate}
                        onSelect={setPickupDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-card-foreground">Drop-off Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-background border-border",
                          !dropoffDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dropoffDate ? format(dropoffDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dropoffDate}
                        onSelect={setDropoffDate}
                        disabled={(date) => date < (pickupDate || new Date())}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Car Selection */}
              <div className="space-y-2">
                <Label className="text-card-foreground">Preferred Vehicle *</Label>
                <Select value={formData.car} onValueChange={(value) => handleInputChange('car', value)} required>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select a vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {cars.map((car) => (
                      <SelectItem key={car} value={car}>{car}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Driver Option */}
              <div className="space-y-3">
                <Label className="text-card-foreground">Driver Service *</Label>
                <RadioGroup 
                  value={formData.withDriver} 
                  onValueChange={(value) => handleInputChange('withDriver', value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="with-driver" />
                    <Label htmlFor="with-driver" className="text-card-foreground">With Professional Driver</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="self-drive" />
                    <Label htmlFor="self-drive" className="text-card-foreground">Self Drive</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <Label htmlFor="requests" className="text-card-foreground">Special Requests</Label>
                <Textarea
                  id="requests"
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  placeholder="Any special requirements, additional stops, or preferences..."
                  className="bg-background border-border min-h-[100px]"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full luxury-button text-lg py-6 bg-primary hover:bg-primary/90 group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Request Quote
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quote;