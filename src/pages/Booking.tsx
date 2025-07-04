import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Calendar as CalendarIcon,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  User,
  Building,
  FileText,
  CreditCard,
  Shield
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    location: "",
    description: "",
    urgent: false,
    newsletter: false
  });

  const { toast } = useToast();

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const services = [
    { value: "road-construction", label: "Road Construction", price: "₹50L+ per km" },
    { value: "commercial-projects", label: "Commercial Projects", price: "Custom Pricing" },
    { value: "project-management", label: "Project Management", price: "5-10% of project" },
    { value: "consultation", label: "Infrastructure Consultation", price: "₹5,000 per hour" },
    { value: "feasibility-study", label: "Feasibility Study", price: "₹25,000 - ₹1L" }
  ];

  const budgetRanges = [
    "₹10L - ₹50L",
    "₹50L - ₹1Cr", 
    "₹1Cr - ₹5Cr",
    "₹5Cr - ₹10Cr",
    "₹10Cr+"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !serviceType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including date, time, and service type.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Consultation Booked!",
      description: "We'll contact you within 24 hours to confirm your appointment.",
    });

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      projectType: "",
      budget: "",
      location: "",
      description: "",
      urgent: false,
      newsletter: false
    });
    setSelectedDate(undefined);
    setSelectedTime("");
    setServiceType("");
  };

  const handleInputChange = (field: string, value: string | boolean) => {
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
            Book Consultation
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Schedule Your Free
            <span className="block text-construction-orange">Infrastructure Consultation</span>
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Get expert advice on your infrastructure project. Our consultations are completely free with no obligations.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Main Booking Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center justify-between">
                    <div className="flex items-center">
                      <CalendarIcon className="h-6 w-6 text-construction-orange mr-2" />
                      Book Your Consultation
                    </div>
                    {selectedDate && (
                      <Badge variant="secondary" className="bg-construction-orange/20 text-construction-orange border-construction-orange/30">
                        {format(selectedDate, "PPP")}
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below to schedule your free infrastructure consultation with our experts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center">
                        <User className="h-5 w-5 text-construction-orange mr-2" />
                        Personal Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            placeholder="Enter your first name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            placeholder="Enter your last name"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
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
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Project Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center">
                        <Building className="h-5 w-5 text-construction-orange mr-2" />
                        Project Information
                      </h3>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          placeholder="Your company name (optional)"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="serviceType">Service Type *</Label>
                          <Select value={serviceType} onValueChange={setServiceType} required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select service type" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem key={service.value} value={service.value}>
                                  <div className="flex justify-between w-full">
                                    <span>{service.label}</span>
                                    <span className="text-construction-orange text-sm ml-4">{service.price}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="budget">Project Budget</Label>
                          <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              {budgetRanges.map((range) => (
                                <SelectItem key={range} value={range}>
                                  {range}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Project Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          placeholder="City, State or specific address"
                        />
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center">
                        <Clock className="h-5 w-5 text-construction-orange mr-2" />
                        Schedule Consultation
                      </h3>
                      <div className="grid md:grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="time">Preferred Time *</Label>
                          <Select value={selectedTime} onValueChange={setSelectedTime} required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Project Description */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center">
                        <FileText className="h-5 w-5 text-construction-orange mr-2" />
                        Project Details
                      </h3>
                      <div className="space-y-2">
                        <Label htmlFor="description">Project Description</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          placeholder="Please describe your project requirements, timeline, and any specific challenges..."
                          rows={4}
                        />
                      </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="urgent"
                          checked={formData.urgent}
                          onCheckedChange={(checked) => handleInputChange("urgent", !!checked)}
                        />
                        <Label htmlFor="urgent" className="text-sm">
                          This is an urgent project (requires immediate attention)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newsletter"
                          checked={formData.newsletter}
                          onCheckedChange={(checked) => handleInputChange("newsletter", !!checked)}
                        />
                        <Label htmlFor="newsletter" className="text-sm">
                          Subscribe to our newsletter for project updates and industry insights
                        </Label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" variant="construction" size="lg" className="w-full">
                      Book Free Consultation
                      <CalendarIcon className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Date Selection */}
              <Card className="shadow-construction">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <CalendarIcon className="h-5 w-5 text-construction-orange mr-2" />
                    Select Date
                  </CardTitle>
                  <CardDescription>
                    Choose your preferred consultation date.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-50" align="start" side="bottom" sideOffset={4}>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>
              
              {/* Contact Info */}
              <Card className="shadow-construction">
                <CardHeader>
                  <CardTitle className="text-xl">Quick Contact</CardTitle>
                  <CardDescription>
                    Need immediate assistance? Reach out to us directly.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-construction-orange/20 rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5 text-construction-orange" />
                    </div>
                    <div>
                      <p className="font-semibold">Call Us</p>
                      <p className="text-sm text-muted-foreground">+91 XXX XXX XXXX</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-construction-orange/20 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-construction-orange" />
                    </div>
                    <div>
                      <p className="font-semibold">Email Us</p>
                      <p className="text-sm text-muted-foreground">info@acronymip.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-construction-orange/20 rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-construction-orange" />
                    </div>
                    <div>
                      <p className="font-semibold">Visit Us</p>
                      <p className="text-sm text-muted-foreground">Your Business Address</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What to Expect */}
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-xl">What to Expect</CardTitle>
                  <CardDescription>
                    Here's what happens after you book your consultation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-construction-orange mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Confirmation Call</p>
                      <p className="text-xs text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-construction-orange mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Expert Consultation</p>
                      <p className="text-xs text-muted-foreground">45-60 minutes session</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-construction-orange mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Project Proposal</p>
                      <p className="text-xs text-muted-foreground">Detailed quote within 3 days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Note */}
              <Card className="shadow-elegant bg-construction-orange/5 border-construction-orange/20">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-5 w-5 text-construction-orange" />
                    <span className="font-semibold text-sm">Your Privacy is Protected</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All information shared is confidential and used solely for consultation purposes. We never share your data with third parties.
                  </p>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;