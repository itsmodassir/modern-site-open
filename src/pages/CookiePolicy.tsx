import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Cookie Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What Are Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cookies are small text files that are stored on your computer or mobile device when 
                you visit a website. They help the website remember information about your visit, 
                which can make it easier to visit the site again and make the site more useful to you.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>How We Use Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We use cookies for several purposes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>To improve your browsing experience on our website</li>
                <li>To remember your preferences and settings</li>
                <li>To analyze website traffic and usage patterns</li>
                <li>To provide personalized content and advertisements</li>
                <li>To ensure the security and proper functioning of our website</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Types of Cookies We Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Essential Cookies</h4>
                <p className="text-muted-foreground">
                  These cookies are necessary for the website to function properly. They enable basic 
                  functions like page navigation and access to secure areas of the website.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Analytics Cookies</h4>
                <p className="text-muted-foreground">
                  These cookies help us understand how visitors interact with our website by collecting 
                  and reporting information anonymously.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Functional Cookies</h4>
                <p className="text-muted-foreground">
                  These cookies enable the website to provide enhanced functionality and personalization, 
                  such as remembering your preferences.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Marketing Cookies</h4>
                <p className="text-muted-foreground">
                  These cookies are used to track visitors across websites to display relevant 
                  and engaging advertisements.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Third-Party Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may use third-party services that also use cookies. These include analytics 
                services like Google Analytics, social media platforms, and advertising networks. 
                These third parties may collect information about your online activities across 
                different websites.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Managing Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You can control and manage cookies in several ways:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Browser settings: Most browsers allow you to refuse cookies or delete existing ones</li>
                <li>Privacy settings: You can adjust your privacy preferences on our website</li>
                <li>Third-party opt-out: You can opt out of third-party cookies through their websites</li>
                <li>Cookie management tools: Use browser extensions or privacy tools</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Please note that disabling cookies may affect the functionality of our website 
                and your user experience.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Cookie Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cookies are stored for different lengths of time depending on their purpose:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent cookies:</strong> Remain until they expire or you delete them</li>
                <li><strong>Analytics cookies:</strong> Typically stored for 24 months</li>
                <li><strong>Marketing cookies:</strong> Usually stored for 12 months</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have questions about our use of cookies, please contact us:
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

export default CookiePolicy;