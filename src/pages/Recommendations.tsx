import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, IndianRupee, Clock, ArrowLeft, Users } from "lucide-react";

interface StudentData {
  gender: string;
  name: string;
  age: string;
  education: string;
  skills: string[];
  sectors: string[];
  location: string;
}

interface Internship {
  company_name: string;
  location: string;
  stipend_per_month_inr: number;
  number_of_internships_offered: number;
  start_date: string;
  level_type: string;
  skill_set: string;
  minimum_education: string;
  domain: string;
  role_offered: string;
}

const calculateMatchPercentage = (internship: Internship, studentData: StudentData): number => {
  let totalScore = 0;
  let maxScore = 0;

  // Education match (30% weight)
  maxScore += 30;
  if (internship.minimum_education === studentData.education) {
    totalScore += 30;
  } else {
    // Partial match for education hierarchy
    const educationHierarchy = ["12th Pass", "Diploma", "Graduate", "Post Graduate"];
    const internshipIndex = educationHierarchy.indexOf(internship.minimum_education);
    const studentIndex = educationHierarchy.indexOf(studentData.education);
    
    if (studentIndex >= internshipIndex && internshipIndex !== -1) {
      totalScore += 20; // Partial score if student education is higher
    }
  }

  // Skills match (35% weight)
  maxScore += 35;
  const skillMatches = studentData.skills.some(skill => 
    internship.skill_set.toLowerCase().includes(skill.toLowerCase()) ||
    skill.toLowerCase().includes(internship.skill_set.toLowerCase())
  );
  if (skillMatches) {
    totalScore += 35;
  }

  // Domain/Sector match (25% weight)
  maxScore += 25;
  const domainMatches = studentData.sectors.some(sector => 
    internship.domain.toLowerCase().includes(sector.toLowerCase()) ||
    sector.toLowerCase().includes(internship.domain.toLowerCase())
  );
  if (domainMatches) {
    totalScore += 25;
  }

  // Location preference (10% weight)
  maxScore += 10;
  if (studentData.location === "Anywhere in India" || studentData.location === "Virtual/Online") {
    totalScore += 10;
  } else if (studentData.location === "My Home State" || studentData.location === "Nearby States") {
    // For demo purposes, give partial score for location preferences
    totalScore += 5;
  }

  return Math.round((totalScore / maxScore) * 100);
};

const getMatchBadgeColor = (percentage: number) => {
  if (percentage >= 80) return "bg-green-500 text-white";
  if (percentage >= 60) return "bg-yellow-500 text-white";
  return "bg-red-500 text-white";
};

const getLevelBadgeColor = (level: string) => {
  switch (level.toLowerCase()) {
    case "beginner": return "bg-blue-100 text-blue-800";
    case "intermediate": return "bg-yellow-100 text-yellow-800";
    case "advanced": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const Recommendations = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [recommendations, setRecommendations] = useState<Array<Internship & { matchPercentage: number }>>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('studentProfile');
    if (!savedData) {
      navigate('/student-wizard');
      return;
    }

    const data = JSON.parse(savedData) as StudentData;
    setStudentData(data);

    // Mock data - replace this with actual data loading
    const internshipsData: Internship[] = [
      {
        company_name: "Tata Consultancy Services (TCS)",
        location: "Mumbai",
        stipend_per_month_inr: 0,
        number_of_internships_offered: 41,
        start_date: "2025-11-25",
        level_type: "Beginner",
        skill_set: "Cloud Computing / DevOps",
        minimum_education: "Graduate",
        domain: "Engineering",
        role_offered: "Intern"
      },
      {
        company_name: "Infosys",
        location: "Bengaluru",
        stipend_per_month_inr: 12000,
        number_of_internships_offered: 43,
        start_date: "2025-10-30",
        level_type: "Intermediate",
        skill_set: "Data Analytics / AI & ML",
        minimum_education: "Post Graduate",
        domain: "Engineering",
        role_offered: "Intern"
      },
      {
        company_name: "Wipro",
        location: "Bengaluru",
        stipend_per_month_inr: 12000,
        number_of_internships_offered: 6,
        start_date: "2025-12-19",
        level_type: "Intermediate",
        skill_set: "Cybersecurity / Cloud",
        minimum_education: "Graduate",
        domain: "Engineering",
        role_offered: "Intern"
      },
      {
        company_name: "HCL Technologies",
        location: "Noida",
        stipend_per_month_inr: 15000,
        number_of_internships_offered: 17,
        start_date: "2025-10-20",
        level_type: "Intermediate",
        skill_set: "Cloud / DevOps",
        minimum_education: "Diploma",
        domain: "Engineering",
        role_offered: "Intern"
      },
      {
        company_name: "Tech Mahindra",
        location: "Pune",
        stipend_per_month_inr: 15000,
        number_of_internships_offered: 24,
        start_date: "2026-03-25",
        level_type: "Intermediate",
        skill_set: "Python / Automation",
        minimum_education: "Graduate",
        domain: "Engineering",
        role_offered: "Intern"
      }
    ];

    // Calculate matches and sort by percentage
    const matchedInternships = internshipsData
      .map(internship => ({
        ...internship,
        matchPercentage: calculateMatchPercentage(internship, data)
      }))
      .filter(internship => internship.matchPercentage > 20) // Only show decent matches
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 5); // Limit to maximum of 5 recommendations

    setRecommendations(matchedInternships);
  }, [navigate]);

  const handleApplyNow = (internship: Internship & { matchPercentage: number }) => {
    // In a real app, this would redirect to application form or external link
    alert(`Applying to ${internship.company_name} for ${internship.role_offered}. This would redirect to the application process.`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-foreground text-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-background hover:bg-background/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-2xl">🎯</div>
            <div>
              <h1 className="text-xl font-semibold">Recommended for You</h1>
              <p className="text-background/80">
                {recommendations.length} perfect matches found for your profile
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {recommendations.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-2">No matches found</h3>
              <p className="text-muted-foreground mb-4">
                We couldn't find any internships matching your current preferences.
              </p>
              <Button onClick={() => navigate('/student-wizard')}>
                Update Your Preferences
              </Button>
            </CardContent>
          </Card>
        ) : (
          recommendations.map((internship, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{internship.company_name}</CardTitle>
                    <p className="text-muted-foreground">{internship.role_offered}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getLevelBadgeColor(internship.level_type)}>
                      {internship.level_type}
                    </Badge>
                    <Badge className={`${getMatchBadgeColor(internship.matchPercentage)} font-semibold`}>
                      {internship.matchPercentage}% Match
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Location and Details */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {internship.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {internship.number_of_internships_offered} positions
                  </div>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-4 h-4" />
                    {internship.stipend_per_month_inr > 0 
                      ? `₹${internship.stipend_per_month_inr.toLocaleString()}/month`
                      : 'Unpaid'
                    }
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Starts {formatDate(internship.start_date)}
                  </div>
                </div>

                {/* Skills and Domain */}
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Skills: </span>
                    <span className="text-muted-foreground">{internship.skill_set}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Domain: </span>
                    <span className="text-muted-foreground">{internship.domain}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Education Required: </span>
                    <span className="text-muted-foreground">{internship.minimum_education}</span>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="flex justify-end">
                  <Button onClick={() => handleApplyNow(internship)} className="px-6">
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}

        {/* Profile Summary */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-base">Your Profile Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>Education:</strong> {studentData.education}</p>
            <p><strong>Skills:</strong> {studentData.skills.join(", ")}</p>
            <p><strong>Interested Sectors:</strong> {studentData.sectors.join(", ")}</p>
            <p><strong>Preferred Location:</strong> {studentData.location}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/student-wizard')}
              className="mt-3"
            >
              Update Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Recommendations;