// Update this page (the content is just a fallback if you fail to update the page)

import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Building, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const portals = [
    {
      id: "student",
      title: "Student",
      description: "Create your profile, find internship matches, and get suggestions to improve your skills.",
      icon: User,
      action: () => navigate("/student-wizard"),
      buttonText: "Student Portal"
    },
    {
      id: "employer",
      title: "Employer", 
      description: "Post internships, view a shortlist of matched students, and find the best talent.",
      icon: Building,
      action: () => alert("Employer portal coming soon!"),
      buttonText: "Employer Portal"
    },
    {
      id: "admin",
      title: "Admin",
      description: "Manage the platform, view analytics, and ensure fairness and diversity in matching.",
      icon: Shield,
      action: () => alert("Admin portal coming soon!"),
      buttonText: "Admin Portal"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-background py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="text-6xl">🚀</div>
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Internship Match
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            InternLink connects talented students with exciting internship opportunities. 
            Build your profile, get matched, and launch your career.
          </p>
          <Button 
            size="lg" 
            className="mt-8 px-8 py-3 text-lg"
            onClick={() => navigate("/student-wizard")}
          >
            Get Started →
          </Button>
        </div>
      </div>

      {/* Access Portals Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Access Your Portal</h2>
            <p className="text-muted-foreground">
              Whether you're a student looking for opportunities, an employer seeking talent, 
              or an admin managing the platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {portals.map((portal) => (
              <Card key={portal.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                    <portal.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <CardTitle className="text-xl mb-2">{portal.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {portal.description}
                  </p>
                  <Button 
                    onClick={portal.action}
                    className="w-full"
                    variant={portal.id === "student" ? "default" : "outline"}
                  >
                    {portal.buttonText} →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Translation Notice */}
      <div className="bg-muted/30 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-2xl mb-3">🌍</div>
          <h3 className="text-lg font-semibold mb-2">Multi-Language Support</h3>
          <p className="text-sm text-muted-foreground">
            This platform supports multiple languages to make internship matching accessible to everyone.
            Translation feature will be available soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
