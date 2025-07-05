import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                By accessing and using Acronym Infrastructure Project's services, you accept and agree 
                to be bound by the terms and provision of this agreement. If you do not agree to abide 
                by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Services Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Acronym Infrastructure Project provides:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Infrastructure development and construction services</li>
                <li>Project consultation and management</li>
                <li>Road construction and commercial projects</li>
                <li>Engineering consultation services</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Client Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Clients agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide accurate and complete information for project requirements</li>
                <li>Obtain necessary permits and approvals as required by local authorities</li>
                <li>Make timely payments according to agreed terms</li>
                <li>Provide site access and necessary utilities as outlined in project agreements</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Payment terms will be specified in individual project contracts. Generally:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Payment schedules are based on project milestones</li>
                <li>Late payments may incur additional charges</li>
                <li>All payments are due within 30 days of invoice date unless otherwise specified</li>
                <li>Additional work requests may require separate agreements</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Acronym Infrastructure Project shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, including without limitation, loss of 
                profits, data, use, goodwill, or other intangible losses, resulting from your use 
                of our services.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Warranty and Quality Assurance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We warrant that:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>All work will be performed in a professional manner</li>
                <li>Materials used will meet industry standards</li>
                <li>Work will comply with applicable building codes and regulations</li>
                <li>Defects in workmanship will be corrected within the warranty period</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Either party may terminate services with written notice. Termination terms, including 
                payment for completed work and materials, will be handled according to individual 
                project contracts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                For questions about these Terms of Service, contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: contact@acronymip.com</p>
                <p>Phone: +91 7909015069</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;