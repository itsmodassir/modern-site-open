import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building,
  User,
  Calendar,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    priority: ""
  });

  const { toast } = useToast();

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our experts",
      value: "+91 XXX XXX XXXX",
      action: "Call Now",
      available: "Mon-Sat 9AM-6PM"
    },
    {
      icon: Mail,
      title: "Email Us", 
      description: "Send us your detailed requirements",
      value: "contact@acronymip.com",
      action: "Send Email",
      available: "24/7 Response"
    },
    {
      icon: MapPin,
      title: "Visit Office",
      description: "Meet our team in person",
      value: "Your Business Address, City, State",
      action: "Get Directions",
      available: "Mon-Sat 9AM-6PM"
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
    { day: "Emergency", hours: "24/7 Available" }
  ];

  const subjectOptions = [
    "General Inquiry",
    "Project Consultation",
    "Quote Request",
    "Partnership Opportunity",
    "Technical Support",
    "Career Inquiry"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
      priority: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 bg-construction-orange/20 text-construction-orange border-construction-orange/30">
            Contact Us
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Get In Touch
            <span className="block text-construction-orange">With Our Experts</span>
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Ready to discuss your infrastructure project? Our team is here to help you every step of the way.
          </p>
          <Link to="/booking">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              Schedule Free Consultation
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the most convenient way to get in touch with our infrastructure experts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-construction rounded-2xl flex items-center justify-center mb-4">
                    <method.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{method.title}</CardTitle>
                  <CardDescription className="text-base">
                    {method.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-2">{method.value}</p>
                  <p className="text-sm text-muted-foreground mb-4">{method.available}</p>
                  <Button variant="construction" size="sm" className="w-full">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <MessageSquare className="h-6 w-6 text-construction-orange mr-2" />
                    Send Us a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center">
                        <User className="h-5 w-5 text-construction-orange mr-2" />
                        Your Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company/Organization</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            placeholder="Your company name"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center">
                        <Building className="h-5 w-5 text-construction-orange mr-2" />
                        Your Inquiry
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select inquiry type" />
                            </SelectTrigger>
                            <SelectContent>
                              {subjectOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="priority">Priority Level</Label>
                          <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low - General inquiry</SelectItem>
                              <SelectItem value="medium">Medium - Project discussion</SelectItem>
                              <SelectItem value="high">High - Urgent requirement</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder="Please describe your project requirements, questions, or how we can help you..."
                          rows={5}
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" variant="construction" size="lg" className="w-full">
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              
              {/* Office Hours */}
              <Card className="shadow-construction">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Clock className="h-5 w-5 text-construction-orange mr-2" />
                    Office Hours
                  </CardTitle>
                  <CardDescription>
                    When you can reach us for immediate assistance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                      <span className="font-medium text-sm">{schedule.day}</span>
                      <span className="text-sm text-muted-foreground">{schedule.hours}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-xl">Quick Actions</CardTitle>
                  <CardDescription>
                    Need immediate assistance? Try these options.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/booking" className="block">
                    <Button variant="construction" size="sm" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Consultation
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Emergency Contact
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Request Quote
                  </Button>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="shadow-elegant bg-construction-orange/5 border-construction-orange/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Clock className="h-8 w-8 text-construction-orange mx-auto mb-2" />
                    <h4 className="font-semibold mb-2">Response Time</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      We typically respond to all inquiries within:
                    </p>
                    <div className="text-construction-orange font-bold text-lg">24 Hours</div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Emergency inquiries: Within 2 hours
                    </p>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Visit Our Office
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Located in the heart of the business district for easy accessibility.
            </p>
          </div>

          <Card className="shadow-elegant">
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-construction rounded-xl flex items-center justify-center text-primary-foreground">
                <div className="text-center">
                  <MapPin className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-xl font-semibold mb-2">Interactive Map</p>
                  <p className="text-sm opacity-75">Get directions to our office</p>
                  <Button variant="outline" size="sm" className="mt-4 bg-white/20 border-white/30 text-white hover:bg-white hover:text-primary">
                    Get Directions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;