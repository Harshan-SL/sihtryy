import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, IndianRupee, Clock, ArrowLeft } from "lucide-react";
import internshipsData from "@/data/internships.json";

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
  id: number;
  company: string;
  role: string;
  location: string;
  type: string;
  stipend: number;
  duration: string;
  requirements: {
    education: string[];
    skills: string[];
    sectors: string[];
    locations: string[];
  };
  description: string;
  deadline: string;
}

const calculateMatchPercentage = (internship: Internship, studentData: StudentData): number => {
  let totalScore = 0;
  let maxScore = 0;

  // Education match (30% weight)
  maxScore += 30;
  if (internship.requirements.education.includes(studentData.education)) {
    totalScore += 30;
  }

  // Skills match (35% weight)
  maxScore += 35;
  const skillMatches = studentData.skills.filter(skill => 
    internship.requirements.skills.includes(skill)
  ).length;
  const skillScore = (skillMatches / Math.max(studentData.skills.length, 1)) * 35;
  totalScore += skillScore;

  // Sector match (25% weight)
  maxScore += 25;
  const sectorMatches = studentData.sectors.filter(sector => 
    internship.requirements.sectors.includes(sector)
  ).length;
  const sectorScore = (sectorMatches / Math.max(studentData.sectors.length, 1)) * 25;
  totalScore += sectorScore;

  // Location match (10% weight)
  maxScore += 10;
  if (internship.requirements.locations.includes(studentData.location)) {
    totalScore += 10;
  }

  return Math.round((totalScore / maxScore) * 100);
};

const getMatchBadgeColor = (percentage: number) => {
  if (percentage >= 80) return "bg-match-high text-white";
  if (percentage >= 60) return "bg-match-medium text-white";
  return "bg-match-low text-white";
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

    // Calculate matches and sort by percentage
    const matchedInternships = internshipsData
      .map(internship => ({
        ...internship,
        matchPercentage: calculateMatchPercentage(internship, data)
      }))
      .filter(internship => internship.matchPercentage > 20) // Only show decent matches
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    setRecommendations(matchedInternships);
  }, [navigate]);

  const handleApplyNow = (internship: Internship & { matchPercentage: number }) => {
    // In a real app, this would redirect to application form or external link
    alert(`Applying to ${internship.company} for ${internship.role}. This would redirect to the application process.`);
  };

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-success text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-2xl">🎯</div>
            <div>
              <h1 className="text-xl font-semibold">Recommended for You</h1>
              <p className="text-green-100">
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
          recommendations.map((internship) => (
            <Card key={internship.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{internship.company}</CardTitle>
                    <p className="text-muted-foreground">{internship.role}</p>
                  </div>
                  <Badge className={`${getMatchBadgeColor(internship.matchPercentage)} font-semibold`}>
                    {internship.matchPercentage}% Match
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Location and Type */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {internship.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {internship.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-4 h-4" />
                    {internship.stipend.toLocaleString()}/month
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Apply by {new Date(internship.deadline).toLocaleDateString()}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed">{internship.description}</p>

                {/* Type Badge */}
                <div className="flex justify-between items-center">
                  <Badge variant="outline">{internship.type}</Badge>
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