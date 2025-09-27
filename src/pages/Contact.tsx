import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init('EukkOAeOWrJBSvGlg');

const Contact = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }

    // Phone number validation (basic)
    const phoneRegex = /^[0-9\-\+\(\)\s]{10,20}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid phone number',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Format the message with all form data
      const formattedMessage = `
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Subject: ${formData.subject}
        
        Message:
        ${formData.message}
      `;

      // Send email using EmailJS
      const templateParams = {
        to_name: 'Luxe Drive Team',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: `New Contact: ${formData.subject}`,
        message: formattedMessage,
        reply_to: formData.email,
        date: new Date().toLocaleString()
      };

      const result = await emailjs.send(
        'service_3ch53k7', // Service ID
        'template_ksjt2t8', // Template ID
        templateParams,
        'EukkOAeOWrJBSvGlg' // Public Key
      );

      // Show success message
      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We will get back to you soon!',
        variant: 'default',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: 'Error',
        description: 'There was an error sending your message. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+254 796 059 968', '+254 794 008 339'],
      action: 'tel:+254796059968'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@luxedrive.co.ke', 'bookings@luxedrive.co.ke'],
      action: 'mailto:info@luxedrive.co.ke'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: ['Westlands, Nairobi', 'Kenya'],
      action: null
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['24/7 Service', 'Always Available'],
      action: null
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto">
          <h1 className="section-title text-foreground mb-6 font-serif">
            Contact <span className="text-primary">Luxe Drive</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to experience luxury transportation in Nairobi? 
            Get in touch with our team and let us handle the details.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-serif text-foreground mb-6">Get in Touch</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our team is available 24/7 to assist you with bookings, 
                questions, or any special requirements you may have.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="luxury-shadow bg-card border-border hover:scale-105 luxury-transition">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-card-foreground">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-muted-foreground text-sm">
                          {info.action && detailIndex === 0 ? (
                            <a 
                              href={info.action} 
                              className="text-primary hover:text-primary/80 luxury-transition"
                            >
                              {detail}
                            </a>
                          ) : (
                            detail
                          )}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <Card className="luxury-shadow bg-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-3 text-foreground">Instant Response via WhatsApp</h3>
                <p className="text-muted-foreground mb-6">
                  Get immediate assistance and real-time updates on your booking
                </p>
                <a 
                  href="https://wa.me/254796059968"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    size="lg" 
                    className="luxury-button bg-primary hover:bg-primary/90 text-lg px-8 py-4"
                  >
                    Chat on WhatsApp
                    <MessageCircle className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="luxury-shadow bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground font-serif">Send us a Message</CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name" className="text-card-foreground">Name *</Label>
                    <Input
                      id="contact-name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone" className="text-card-foreground">Phone</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-card-foreground">Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-subject" className="text-card-foreground">Subject *</Label>
                  <Input
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    required
                    placeholder="e.g., Wedding Transportation Inquiry"
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="text-card-foreground">Message *</Label>
                  <Textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                    placeholder="Tell us about your transportation needs..."
                    className="bg-background border-border min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full luxury-button text-lg py-6 bg-primary hover:bg-primary/90 group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;