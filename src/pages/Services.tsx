import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  ArrowRight, 
  Target, 
  Lightbulb, 
  TrendingUp,
  Route,
  Building,
  HardHat,
  Users,
  CheckCircle,
  Clock,
  Award,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const mainServices = [
    {
      icon: Target,
      title: "Identify Goals",
      description: "We begin every project by clearly identifying goals — understanding your vision, needs, and priorities for strategic, purpose-driven infrastructure.",
      features: ["Vision Analysis", "Needs Assessment", "Priority Planning", "Strategic Roadmap"]
    },
    {
      icon: Lightbulb,
      title: "Bring Ideas to Life", 
      description: "We transform visionary ideas into lasting reality. From blueprint to groundbreaking, we bring expertise, innovation, and precision to every project.",
      features: ["Blueprint Design", "Engineering Solutions", "Project Planning", "Implementation"]
    },
    {
      icon: TrendingUp,
      title: "Business Expansion",
      description: "Driven by innovation and excellence, we deliver robust, sustainable infrastructure solutions that power economic growth and connectivity.",
      features: ["Scalable Solutions", "Growth Planning", "Market Expansion", "Sustainability Focus"]
    }
  ];

  const serviceCategories = [
    {
      icon: Route,
      title: "Road Construction",
      description: "Premium road infrastructure development with modern techniques and materials.",
      services: ["Highway Construction", "Urban Road Development", "Bridge Construction", "Traffic Management"],
      pricing: "From ₹50L per km"
    },
    {
      icon: Building,
      title: "Commercial Projects",
      description: "Large-scale commercial infrastructure for business and industrial needs.",
      services: ["Industrial Parks", "Commercial Buildings", "Warehouses", "Office Complexes"],
      pricing: "Custom Pricing"
    },
    {
      icon: HardHat,
      title: "Project Management",
      description: "End-to-end project oversight ensuring timely and quality delivery.",
      services: ["Planning & Scheduling", "Quality Control", "Budget Management", "Team Coordination"],
      pricing: "5-10% of project value"
    },
    {
      icon: Users,
      title: "Consultation Services",
      description: "Expert infrastructure consulting for informed decision making.",
      services: ["Feasibility Studies", "Technical Consulting", "Regulatory Compliance", "Risk Assessment"],
      pricing: "₹5,000 per hour"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Initial Consultation",
      description: "We discuss your project requirements and conduct site evaluation.",
      duration: "1-2 weeks"
    },
    {
      step: "02", 
      title: "Planning & Design",
      description: "Detailed project planning with engineering drawings and permits.",
      duration: "2-4 weeks"
    },
    {
      step: "03",
      title: "Construction Phase",
      description: "Professional execution with regular quality checks and updates.",
      duration: "Variable"
    },
    {
      step: "04",
      title: "Quality Assurance",
      description: "Final inspections and handover with maintenance guidelines.",
      duration: "1 week"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 bg-construction-orange/20 text-construction-orange border-construction-orange/30">
            Our Services
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Infrastructure Services
            <span className="block text-construction-orange">Built for Excellence</span>
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Comprehensive infrastructure solutions from planning to completion, delivered with precision and expertise.
          </p>
          <Link to="/booking">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              Get Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Our Core Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From initial planning to final delivery, we provide end-to-end infrastructure solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {mainServices.map((service, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur border-border/50">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-construction rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-construction-orange mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Service Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specialized services tailored to meet diverse infrastructure needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {serviceCategories.map((category, index) => (
              <Card key={index} className="group hover:shadow-construction transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-construction rounded-xl flex items-center justify-center">
                      <category.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <div className="text-construction-orange font-semibold text-sm">{category.pricing}</div>
                    </div>
                  </div>
                  <CardDescription className="text-base mb-4">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {category.services.map((service, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-3 w-3 text-construction-orange mr-2" />
                        {service}
                      </div>
                    ))}
                  </div>
                  <Link to="/booking" className="block mt-6">
                    <Button variant="outline" className="w-full group-hover:bg-construction-orange group-hover:text-white">
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Our Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A systematic approach ensuring quality delivery at every stage.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-start mb-12 last:mb-0">
                <div className="flex-shrink-0 mr-6">
                  <div className="w-16 h-16 bg-gradient-construction rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {step.step}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {step.duration}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Contact our experts today for a free consultation and detailed project proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                Book Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;