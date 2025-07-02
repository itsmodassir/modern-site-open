import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  ArrowRight, 
  Award,
  Users,
  Target,
  Heart,
  Lightbulb,
  Shield,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import { Link } from "react-router-dom";
import infrastructureAbout from "@/assets/infrastructure-about.jpg";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in every project, ensuring the highest quality standards and attention to detail."
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "Honest, transparent communication and ethical business practices form the foundation of our relationships."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace new technologies and methods to deliver cutting-edge infrastructure solutions."
    },
    {
      icon: Shield,
      title: "Safety",
      description: "Safety is our top priority - for our team, clients, and the communities we serve."
    }
  ];

  const team = [
    {
      name: "Md Modassir",
      position: "Founder & CEO",
      experience: "15+ Years",
      specialization: "Infrastructure Development",
      description: "Visionary leader with extensive experience in large-scale infrastructure projects and team management."
    },
    {
      name: "Ahmed Rahman",
      position: "Chief Engineer",
      experience: "12+ Years", 
      specialization: "Civil Engineering",
      description: "Expert in structural design and project engineering with a focus on sustainable construction."
    },
    {
      name: "Priya Sharma",
      position: "Project Manager",
      experience: "10+ Years",
      specialization: "Project Management",
      description: "Specialist in project coordination and quality assurance with a track record of on-time delivery."
    },
    {
      name: "Rajesh Kumar",
      position: "Safety Director",
      experience: "8+ Years",
      specialization: "Safety & Compliance",
      description: "Dedicated to maintaining the highest safety standards across all project sites."
    }
  ];

  const milestones = [
    {
      year: "2009",
      title: "Company Founded",
      description: "Acronym Infrastructure Project was established with a vision to transform infrastructure development."
    },
    {
      year: "2012",
      title: "First Major Project",
      description: "Completed our first highway construction project, setting new quality standards in the region."
    },
    {
      year: "2016",
      title: "ISO Certification",
      description: "Achieved ISO 9001:2015 certification for quality management systems."
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Implemented advanced project management technologies and digital workflows."
    },
    {
      year: "2024",
      title: "1000+ Projects",
      description: "Reached the milestone of 1000+ successfully completed infrastructure projects."
    }
  ];

  const stats = [
    { number: "1000+", label: "Projects Completed", icon: Award },
    { number: "500+", label: "Happy Clients", icon: Users },
    { number: "15+", label: "Years Experience", icon: Calendar },
    { number: "50+", label: "Team Members", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 bg-construction-orange/20 text-construction-orange border-construction-orange/30">
            About Us
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Building Tomorrow's
            <span className="block text-construction-orange">Infrastructure Today</span>
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            For over 15 years, we've been transforming communities through innovative infrastructure solutions and unwavering commitment to excellence.
          </p>
          <Link to="/contact">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              Get In Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in 2009 by <strong>Md Modassir</strong>, Acronym Infrastructure Project began with a simple yet powerful vision: to transform communities through exceptional infrastructure development. What started as a small team with big dreams has grown into a leading infrastructure company.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We specialize in road construction, commercial projects, and comprehensive infrastructure solutions. Our commitment to quality, innovation, and client satisfaction has made us the preferred choice for businesses and communities across the region.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Today, we're proud to have completed over 1000 projects, served 500+ clients, and built lasting relationships based on trust, quality, and excellence.
              </p>
              <Link to="/projects">
                <Button variant="construction" size="lg">
                  View Our Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <img 
                src={infrastructureAbout} 
                alt="Infrastructure Development" 
                className="w-full rounded-2xl shadow-elegant"
              />
              <div className="absolute -bottom-6 -left-6 bg-construction-orange text-construction-orange-foreground p-6 rounded-xl shadow-construction">
                <Award className="h-8 w-8 mb-2" />
                <div className="font-semibold">ISO 9001:2015</div>
                <div className="text-sm opacity-90">Quality Certified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make and every project we undertake.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-construction rounded-2xl flex items-center justify-center mb-4">
                    <value.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals dedicated to delivering exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-construction transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="mx-auto w-20 h-20 bg-gradient-construction rounded-full flex items-center justify-center mb-4">
                    <Users className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-construction-orange font-semibold">
                    {member.position}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="font-semibold">Experience:</span> {member.experience}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Specialization:</span> {member.specialization}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Key milestones that have shaped our company's growth and success.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start mb-12 last:mb-0">
                <div className="flex-shrink-0 mr-6">
                  <div className="w-16 h-16 bg-gradient-construction rounded-full flex items-center justify-center text-primary-foreground font-bold">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="text-primary-foreground">
                <stat.icon className="h-8 w-8 text-construction-orange mx-auto mb-2" />
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss your infrastructure needs and create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                Schedule Meeting
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary">
                Contact Us
                <Phone className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;