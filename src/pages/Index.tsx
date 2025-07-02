import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Target, 
  Lightbulb, 
  TrendingUp,
  CheckCircle,
  HardHat,
  Building,
  Route,
  Users,
  Award,
  Clock
} from "lucide-react";
import constructionHero from "@/assets/construction-hero.jpg";
import infrastructureAbout from "@/assets/infrastructure-about.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <HardHat className="h-8 w-8 text-construction-orange" />
              <span className="text-xl font-bold text-primary">Acronym Infrastructure Project</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-foreground hover:text-construction-orange transition-colors">Home</a>
              <a href="#services" className="text-foreground hover:text-construction-orange transition-colors">Services</a>
              <a href="#about" className="text-foreground hover:text-construction-orange transition-colors">About</a>
              <a href="#projects" className="text-foreground hover:text-construction-orange transition-colors">Projects</a>
              <Button variant="construction" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={constructionHero} 
            alt="Construction Site" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl animate-fade-in">
            <Badge variant="secondary" className="mb-6 bg-construction-orange/20 text-construction-orange border-construction-orange/30">
              Leading Infrastructure Development
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Give the Drawing,
              <span className="block text-construction-orange">
                I'll Give You Your Dream
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-primary-foreground/80 mb-8 max-w-2xl leading-relaxed">
              We help communities and businesses build the infrastructure of their dreams with our expert services and innovative solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary">
                View Our Work
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 text-primary-foreground/60 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-construction-orange" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-construction-orange" />
                <span>Expert Team</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-construction-orange" />
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Our Infrastructure Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From planning to completion, we deliver comprehensive infrastructure solutions that stand the test of time.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur border-border/50">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-construction rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Identify Goals</CardTitle>
                <CardDescription className="text-base">
                  We begin every project by clearly identifying goals — understanding your vision, needs, and priorities for strategic, purpose-driven infrastructure.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur border-border/50">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-construction rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Bring Ideas to Life</CardTitle>
                <CardDescription className="text-base">
                  We transform visionary ideas into lasting reality. From blueprint to groundbreaking, we bring expertise, innovation, and precision to every project.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur border-border/50">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-construction rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Business Expansion</CardTitle>
                <CardDescription className="text-base">
                  Driven by innovation and excellence, we deliver robust, sustainable infrastructure solutions that power economic growth and connectivity.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Additional Services */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-construction transition-all duration-300">
              <Route className="h-12 w-12 text-construction-orange mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Road Construction</h3>
              <p className="text-muted-foreground text-sm">Premium road infrastructure development</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-construction transition-all duration-300">
              <Building className="h-12 w-12 text-construction-orange mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Commercial Projects</h3>
              <p className="text-muted-foreground text-sm">Large-scale commercial infrastructure</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-construction transition-all duration-300">
              <HardHat className="h-12 w-12 text-construction-orange mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Project Management</h3>
              <p className="text-muted-foreground text-sm">End-to-end project oversight</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-construction transition-all duration-300">
              <Users className="h-12 w-12 text-construction-orange mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Consultation</h3>
              <p className="text-muted-foreground text-sm">Expert infrastructure consulting</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge variant="secondary" className="mb-6 bg-construction-orange/20 text-construction-orange border-construction-orange/30">
                About Our Company
              </Badge>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                We Are Here to Help Build Your Future
              </h2>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At Acronym Infrastructure Project, we are dedicated to supporting every step of your journey. Whether it's planning, designing, building, or maintaining essential infrastructure, our team of experts is committed to delivering solutions with precision, professionalism, and care.
              </p>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Under the leadership of <strong>Md Modassir</strong>, we combine innovation, quality, and a deep sense of responsibility to meet your needs and exceed expectations. Your success is our priority.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-accent rounded-lg">
                  <div className="text-3xl font-bold text-construction-orange mb-2">100+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center p-4 bg-accent rounded-lg">
                  <div className="text-3xl font-bold text-construction-orange mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
              
              <Button variant="construction" size="lg">
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="animate-scale-in">
              <div className="relative">
                <img 
                  src={infrastructureAbout} 
                  alt="Infrastructure Development" 
                  className="w-full rounded-2xl shadow-elegant"
                />
                <div className="absolute -bottom-6 -left-6 bg-construction-orange text-construction-orange-foreground p-6 rounded-xl shadow-construction">
                  <Award className="h-8 w-8 mb-2" />
                  <div className="font-semibold">Quality Certified</div>
                  <div className="text-sm opacity-90">ISO Compliant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="text-primary-foreground">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Happy Clients</div>
            </div>
            <div className="text-primary-foreground">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-primary-foreground/80">Projects Done</div>
            </div>
            <div className="text-primary-foreground">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary-foreground/80">Support Available</div>
            </div>
            <div className="text-primary-foreground">
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-primary-foreground/80">Years in Business</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="relative container mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Build Your Dream Project?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and let's turn your infrastructure vision into reality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              Get Free Consultation
              <Phone className="ml-2 h-5 w-5" />
            </Button>
            
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary">
              View Our Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <Phone className="h-12 w-12 text-construction-orange mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Call Us</h3>
              <p className="text-muted-foreground">+91 XXX XXX XXXX</p>
            </div>
            
            <div className="p-6">
              <Mail className="h-12 w-12 text-construction-orange mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Email Us</h3>
              <p className="text-muted-foreground">info@acronymip.com</p>
            </div>
            
            <div className="p-6">
              <MapPin className="h-12 w-12 text-construction-orange mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
              <p className="text-muted-foreground">Your Business Address</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative py-16 bg-gradient-to-br from-primary via-primary to-primary/90 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Im0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-construction-orange/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-primary-foreground/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1 animate-fade-in">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <HardHat className="h-10 w-10 text-construction-orange drop-shadow-lg" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-construction-orange rounded-full animate-ping opacity-75"></div>
                </div>
                <div>
                  <span className="text-2xl font-bold text-primary-foreground block leading-tight">Acronym</span>
                  <span className="text-lg font-semibold text-construction-orange block leading-tight">Infrastructure</span>
                </div>
              </div>
              
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
                Building the infrastructure of tomorrow with expertise, innovation, and unwavering commitment to excellence. Your dreams, our engineering.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { icon: Phone, label: "Call" },
                  { icon: Mail, label: "Email" },
                  { icon: MapPin, label: "Location" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="group relative w-10 h-10 bg-primary-foreground/10 hover:bg-construction-orange rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-construction"
                  >
                    <social.icon className="h-5 w-5 text-primary-foreground group-hover:text-white transition-colors duration-300" />
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-primary-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="animate-fade-in delay-100">
              <h4 className="font-bold text-primary-foreground text-lg mb-6 relative">
                Services
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-construction-orange rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  "Road Construction",
                  "Infrastructure Development", 
                  "Project Management",
                  "Engineering Consultation",
                  "Quality Assurance"
                ].map((service, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="group flex items-center text-primary-foreground/70 hover:text-construction-orange transition-all duration-300 text-sm"
                    >
                      <CheckCircle className="h-3 w-3 mr-2 opacity-50 group-hover:opacity-100 group-hover:text-construction-orange transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{service}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="animate-fade-in delay-200">
              <h4 className="font-bold text-primary-foreground text-lg mb-6 relative">
                Company
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-construction-orange rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  "About Us",
                  "Our Projects", 
                  "Leadership Team",
                  "Careers",
                  "News & Updates"
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="group flex items-center text-primary-foreground/70 hover:text-construction-orange transition-all duration-300 text-sm"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      <span className="group-hover:translate-x-2 transition-transform duration-300">{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div className="animate-fade-in delay-300">
              <h4 className="font-bold text-primary-foreground text-lg mb-6 relative">
                Get In Touch
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-construction-orange rounded-full"></div>
              </h4>
              
              {/* Quick Contact */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-8 h-8 bg-construction-orange/20 rounded-lg flex items-center justify-center">
                    <Phone className="h-4 w-4 text-construction-orange" />
                  </div>
                  <div>
                    <p className="text-primary-foreground/60 text-xs">Call Us</p>
                    <p className="text-primary-foreground font-medium">+91 XXX XXX XXXX</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-8 h-8 bg-construction-orange/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-4 w-4 text-construction-orange" />
                  </div>
                  <div>
                    <p className="text-primary-foreground/60 text-xs">Email Us</p>
                    <p className="text-primary-foreground font-medium">info@acronymip.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-8 h-8 bg-construction-orange/20 rounded-lg flex items-center justify-center">
                    <Clock className="h-4 w-4 text-construction-orange" />
                  </div>
                  <div>
                    <p className="text-primary-foreground/60 text-xs">Working Hours</p>
                    <p className="text-primary-foreground font-medium">Mon-Sat 9AM-6PM</p>
                  </div>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-primary-foreground/10 rounded-xl p-4 backdrop-blur-sm">
                <h5 className="text-primary-foreground font-semibold text-sm mb-2">Project Updates</h5>
                <p className="text-primary-foreground/60 text-xs mb-3">Get the latest news about our projects</p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 text-xs bg-white/20 border border-white/30 rounded-lg text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-construction-orange focus:border-transparent"
                  />
                  <Button variant="construction" size="sm" className="text-xs px-3">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in delay-500">
            {[
              { number: "500+", label: "Happy Clients", icon: Users },
              { number: "1000+", label: "Projects Done", icon: Building },
              { number: "24/7", label: "Support", icon: Clock },
              { number: "15+", label: "Years Experience", icon: Award }
            ].map((stat, index) => (
              <div
                key={index}
                className="group text-center p-4 bg-primary-foreground/10 rounded-xl hover:bg-construction-orange/20 transition-all duration-300 hover:scale-105"
              >
                <stat.icon className="h-6 w-6 text-construction-orange mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-2xl font-bold text-primary-foreground mb-1">{stat.number}</div>
                <div className="text-primary-foreground/70 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="border-t border-primary-foreground/20 pt-8 animate-fade-in delay-700">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-primary-foreground/60 text-sm">
                  © 2024 Acronym Infrastructure Project. All rights reserved.
                </p>
                <p className="text-construction-orange text-xs font-medium mt-1">
                  Led by Md Modassir | Building Tomorrow's Infrastructure
                </p>
              </div>
              
              {/* Legal Links */}
              <div className="flex space-x-6 text-sm">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-primary-foreground/60 hover:text-construction-orange transition-colors duration-300 relative group"
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-construction-orange transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Emergency Contact Banner */}
          <div className="mt-8 bg-construction-orange/20 border border-construction-orange/30 rounded-xl p-4 text-center animate-fade-in delay-1000">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Phone className="h-5 w-5 text-construction-orange animate-pulse" />
              <span className="text-primary-foreground font-semibold">24/7 Emergency Services Available</span>
            </div>
            <p className="text-primary-foreground/70 text-sm">
              Need urgent infrastructure support? Our emergency response team is ready to help.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;