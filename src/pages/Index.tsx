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

      {/* Footer */}
      <footer className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <HardHat className="h-8 w-8 text-construction-orange" />
                <span className="text-xl font-bold text-primary-foreground">Acronym Infrastructure</span>
              </div>
              <p className="text-primary-foreground/80 text-sm">
                Building the infrastructure of tomorrow with expertise, innovation, and commitment to excellence.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-primary-foreground mb-4">Services</h4>
              <ul className="space-y-2 text-primary-foreground/80 text-sm">
                <li>Road Construction</li>
                <li>Infrastructure Development</li>
                <li>Project Management</li>
                <li>Consultation Services</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-primary-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-primary-foreground/80 text-sm">
                <li>About Us</li>
                <li>Our Projects</li>
                <li>Leadership Team</li>
                <li>Careers</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-primary-foreground mb-4">Contact</h4>
              <ul className="space-y-2 text-primary-foreground/80 text-sm">
                <li>Get Quote</li>
                <li>Support</li>
                <li>Office Locations</li>
                <li>Emergency Contact</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60 text-sm">
            <p>© 2024 Acronym Infrastructure Project. All rights reserved. | Led by Md Modassir</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;