import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  ArrowRight, 
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  Users,
  Building,
  Route,
  Award,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

const Projects = () => {
  const featuredProjects = [
    {
      id: 1,
      title: "Mumbai-Pune Highway Expansion",
      category: "Highway Construction",
      location: "Maharashtra, India",
      duration: "24 Months",
      budget: "₹150 Crores",
      status: "Completed",
      year: "2023",
      description: "Major highway expansion project including 6-lane development, modern toll systems, and safety infrastructure.",
      highlights: ["150km highway", "Advanced toll systems", "Emergency lanes", "Smart traffic management"],
      image: "/api/placeholder/600/400"
    },
    {
      id: 2,
      title: "Smart City Infrastructure - Bhopal",
      category: "Urban Development",
      location: "Bhopal, Madhya Pradesh",
      duration: "18 Months", 
      budget: "₹200 Crores",
      status: "In Progress",
      year: "2024",
      description: "Comprehensive smart city infrastructure including roads, utilities, and digital connectivity systems.",
      highlights: ["Smart traffic lights", "Underground utilities", "IoT integration", "Sustainable design"],
      image: "/api/placeholder/600/400"
    },
    {
      id: 3,
      title: "Industrial Park Development",
      category: "Commercial Infrastructure",
      location: "Gujarat, India",
      duration: "12 Months",
      budget: "₹75 Crores",
      status: "Completed",
      year: "2023",
      description: "Complete infrastructure development for industrial park including roads, utilities, and facilities.",
      highlights: ["Internal road network", "Utility infrastructure", "Waste management", "Green spaces"],
      image: "/api/placeholder/600/400"
    }
  ];

  const allProjects = [
    {
      title: "Ring Road Construction - Indore",
      category: "Road Construction",
      location: "Indore, MP",
      year: "2023",
      status: "Completed",
      budget: "₹80 Cr"
    },
    {
      title: "Metro Station Infrastructure",
      category: "Public Transport",
      location: "Delhi NCR",
      year: "2022",
      status: "Completed", 
      budget: "₹45 Cr"
    },
    {
      title: "Airport Access Road",
      category: "Transportation",
      location: "Bangalore",
      year: "2024",
      status: "In Progress",
      budget: "₹120 Cr"
    },
    {
      title: "IT Park Infrastructure",
      category: "Commercial",
      location: "Hyderabad",
      year: "2023",
      status: "Completed",
      budget: "₹90 Cr"
    },
    {
      title: "Residential Township Roads",
      category: "Residential",
      location: "Pune",
      year: "2024",
      status: "Planning",
      budget: "₹35 Cr"
    },
    {
      title: "Bridge Construction Project",
      category: "Bridge Infrastructure",
      location: "Chennai",
      year: "2022",
      status: "Completed",
      budget: "₹60 Cr"
    }
  ];

  const projectStats = [
    { number: "1000+", label: "Projects Completed", icon: Building },
    { number: "₹500Cr+", label: "Project Value", icon: DollarSign },
    { number: "15+", label: "Years Experience", icon: Calendar },
    { number: "50+", label: "Team Members", icon: Users }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Planning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 bg-construction-orange/20 text-construction-orange border-construction-orange/30">
            Our Projects
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Building Excellence
            <span className="block text-construction-orange">Across India</span>
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Explore our portfolio of successful infrastructure projects that have transformed communities and powered economic growth.
          </p>
          <Link to="/contact">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              Discuss Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Project Stats */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {projectStats.map((stat, index) => (
              <div key={index} className="text-primary-foreground">
                <stat.icon className="h-8 w-8 text-construction-orange mx-auto mb-2" />
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Showcasing our most impactful infrastructure developments that have set new standards in the industry.
            </p>
          </div>

          <div className="space-y-12">
            {featuredProjects.map((project, index) => (
              <Card key={project.id} className="shadow-elegant hover:shadow-construction transition-all duration-300">
                <div className={`grid lg:grid-cols-2 gap-8 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  
                  {/* Project Image */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} relative`}>
                    <div className="aspect-video bg-gradient-construction rounded-xl flex items-center justify-center text-primary-foreground">
                      <div className="text-center">
                        <Building className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-semibold">{project.title}</p>
                        <p className="text-sm opacity-75">{project.category}</p>
                      </div>
                    </div>
                    <Badge 
                      className={`absolute top-4 right-4 ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </Badge>
                  </div>

                  {/* Project Details */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-construction-orange border-construction-orange">
                          {project.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{project.year}</span>
                      </div>
                      <CardTitle className="text-2xl lg:text-3xl">{project.title}</CardTitle>
                      <CardDescription className="text-base">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      {/* Project Info Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-construction-orange" />
                          <span className="text-sm">{project.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-construction-orange" />
                          <span className="text-sm">{project.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-construction-orange" />
                          <span className="text-sm">{project.budget}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="h-4 w-4 text-construction-orange" />
                          <span className="text-sm">Quality Certified</span>
                        </div>
                      </div>

                      {/* Project Highlights */}
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3">Project Highlights:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {project.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center text-sm">
                              <div className="w-2 h-2 bg-construction-orange rounded-full mr-2"></div>
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button variant="construction" className="w-full sm:w-auto">
                        <Eye className="h-4 w-4 mr-2" />
                        View Project Details
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Recent Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of our recent infrastructure developments across various sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.map((project, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-construction-orange border-construction-orange text-xs">
                      {project.category}
                    </Badge>
                    <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                      {project.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-construction-orange mr-2" />
                      {project.location}
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 text-construction-orange mr-2" />
                      {project.year}
                    </div>
                    <div className="flex items-center text-sm">
                      <DollarSign className="h-4 w-4 text-construction-orange mr-2" />
                      {project.budget}
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mt-4 hover:bg-construction-orange hover:text-white">
                    View Details
                  </Button>
                </CardContent>
              </Card>
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
            Let's discuss your infrastructure needs and create something remarkable together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                Schedule Consultation
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;