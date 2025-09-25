import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { User, GraduationCap, Code, Building, MapPin, CheckCircle } from "lucide-react";

interface StudentData {
  gender: string;
  name: string;
  age: string;
  education: string;
  skills: string[];
  sectors: string[];
  location: string;
}

const WizardStep = ({ title, step, totalSteps }: { title: string; step: number; totalSteps: number }) => (
  <div className="bg-wizard-header text-white p-6 text-center">
    <h2 className="text-xl font-semibold mb-3">{title}</h2>
    <div className="flex justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i === step - 1 ? "bg-white" : "bg-wizard-step"
          }`}
        />
      ))}
    </div>
  </div>
);

const PersonalInfoStep = ({ data, onChange }: { data: StudentData; onChange: (data: Partial<StudentData>) => void }) => (
  <div className="p-6 space-y-6">
    <div>
      <h3 className="font-semibold mb-4">Gender</h3>
      <div className="grid grid-cols-2 gap-4">
        {[
          { value: "male", label: "Male", icon: "👨" },
          { value: "female", label: "Female", icon: "👩" }
        ].map((option) => (
          <Card
            key={option.value}
            className={`cursor-pointer transition-colors hover:bg-muted ${
              data.gender === option.value ? "ring-2 ring-primary bg-accent/50" : ""
            }`}
            onClick={() => onChange({ gender: option.value })}
          >
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">{option.icon}</div>
              <div className="font-medium">{option.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

    <div>
      <h3 className="font-semibold mb-2">Your Name</h3>
      <Input
        placeholder="Your Name"
        value={data.name}
        onChange={(e) => onChange({ name: e.target.value })}
      />
    </div>

    <div>
      <h3 className="font-semibold mb-2">Your Age</h3>
      <Select value={data.age} onValueChange={(value) => onChange({ age: value })}>
        <SelectTrigger>
          <SelectValue placeholder="Select your age" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 30 }, (_, i) => i + 16).map((age) => (
            <SelectItem key={age} value={age.toString()}>
              {age}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div className="flex justify-center py-4">
      <User className="w-16 h-16 text-muted-foreground" />
    </div>
  </div>
);

const EducationStep = ({ data, onChange }: { data: StudentData; onChange: (data: Partial<StudentData>) => void }) => {
  const educationOptions = [
    { value: "12th Pass", label: "12th Pass", icon: "📚" },
    { value: "Diploma", label: "Diploma", icon: "📜" },
    { value: "Graduate", label: "Graduate", icon: "🎓" },
    { value: "Post Graduate", label: "Post Graduate", icon: "👨‍🎓" }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        {educationOptions.map((option) => (
          <Card
            key={option.value}
            className={`cursor-pointer transition-colors hover:bg-muted ${
              data.education === option.value ? "ring-2 ring-primary bg-accent/50" : ""
            }`}
            onClick={() => onChange({ education: option.value })}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="text-2xl">{option.icon}</div>
              <div className="font-medium flex-1">{option.label}</div>
              {data.education === option.value && <CheckCircle className="w-5 h-5 text-primary" />}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center py-4">
        <GraduationCap className="w-16 h-16 text-muted-foreground" />
      </div>
    </div>
  );
};

const SkillsStep = ({ data, onChange }: { data: StudentData; onChange: (data: Partial<StudentData>) => void }) => {
  const skillOptions = [
    { value: "Cloud Computing", label: "Cloud Computing", icon: "☁️" },
    { value: "DevOps", label: "DevOps", icon: "⚙️" },
    { value: "Data Analytics", label: "Data Analytics", icon: "📊" },
    { value: "AI & ML", label: "AI & ML", icon: "🤖" },
    { value: "Cybersecurity", label: "Cybersecurity", icon: "🔒" },
    { value: "Python", label: "Python", icon: "🐍" },
    { value: "Automation", label: "Automation", icon: "🤖" },
    { value: "Project Management", label: "Project Management", icon: "📋" },
    { value: "Renewable Energy Systems", label: "Renewable Energy Systems", icon: "🔋" },
    { value: "Automotive Electronics", label: "Automotive Electronics", icon: "🚗" },
    { value: "Risk Management", label: "Risk Management", icon: "⚖️" },
    { value: "Digital Banking", label: "Digital Banking", icon: "🏦" },
    { value: "FinTech", label: "FinTech", icon: "💳" },
    { value: "Manufacturing Processes", label: "Manufacturing Processes", icon: "🏭" },
    { value: "Lean Manufacturing", label: "Lean Manufacturing", icon: "⚡" },
    { value: "Supply Chain Management", label: "Supply Chain Management", icon: "📦" },
    { value: "Quality Assurance", label: "Quality Assurance", icon: "✅" },
    { value: "Marketing Analytics", label: "Marketing Analytics", icon: "📈" },
    { value: "Production Planning", label: "Production Planning", icon: "📅" },
    { value: "Industrial Engineering", label: "Industrial Engineering", icon: "🏗️" },
    { value: "Safety & Compliance", label: "Safety & Compliance", icon: "🦺" },
    { value: "Drilling Operations", label: "Drilling Operations", icon: "⛽" },
    { value: "Power Plant Operations", label: "Power Plant Operations", icon: "⚡" },
    { value: "Grid Management", label: "Grid Management", icon: "🔌" },
    { value: "Process Safety", label: "Process Safety", icon: "🛡️" },
    { value: "Environmental Compliance", label: "Environmental Compliance", icon: "🌱" },
    { value: "Metallurgy", label: "Metallurgy", icon: "🔬" },
    { value: "Operations Management", label: "Operations Management", icon: "⚙️" },
    { value: "App Development", label: "App Development", icon: "📱" },
    { value: "UI/UX", label: "UI/UX", icon: "🎨" },
    { value: "Logistics Optimization", label: "Logistics Optimization", icon: "🚚" },
    { value: "Data Science", label: "Data Science", icon: "📊" },
    { value: "EdTech Analytics", label: "EdTech Analytics", icon: "📚" },
    { value: "Payment Gateway Integration", label: "Payment Gateway Integration", icon: "💰" },
    { value: "UPI", label: "UPI", icon: "📱" },
    { value: "Digital Payments", label: "Digital Payments", icon: "💳" },
    { value: "Web Development", label: "Web Development", icon: "💻" },
    { value: "Digital Marketing", label: "Digital Marketing", icon: "📢" },
    { value: "Supply Chain Analytics", label: "Supply Chain Analytics", icon: "📊" },
    { value: "Cloud & API Integration", label: "Cloud & API Integration", icon: "🔗" },
    { value: "SaaS Architecture", label: "SaaS Architecture", icon: "🏗️" }
  ];

  const toggleSkill = (skill: string) => {
    const newSkills = data.skills.includes(skill)
      ? data.skills.filter(s => s !== skill)
      : [...data.skills, skill];
    onChange({ skills: newSkills });
  };

  return (
    <div className="p-6 space-y-6">
      <p className="text-sm text-muted-foreground mb-4">Select multiple options that apply to you</p>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {skillOptions.map((option) => (
          <Card
            key={option.value}
            className={`cursor-pointer transition-colors hover:bg-muted ${
              data.skills.includes(option.value) ? "ring-2 ring-primary bg-accent/50" : ""
            }`}
            onClick={() => toggleSkill(option.value)}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="text-2xl">{option.icon}</div>
              <div className="font-medium flex-1">{option.label}</div>
              {data.skills.includes(option.value) && <CheckCircle className="w-5 h-5 text-primary" />}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center py-4">
        <Code className="w-16 h-16 text-muted-foreground" />
      </div>
    </div>
  );
};

const SectorStep = ({ data, onChange }: { data: StudentData; onChange: (data: Partial<StudentData>) => void }) => {
  const sectorOptions = [
    { value: "Engineering", label: "Engineering", icon: "⚙️" },
    { value: "Management", label: "Management", icon: "👔" },
    { value: "Finance", label: "Finance", icon: "💰" },
    { value: "Operations", label: "Operations", icon: "🔧" },
    { value: "Marketing", label: "Marketing", icon: "📢" },
    { value: "Life Sciences", label: "Life Sciences", icon: "🧬" },
    { value: "Information Technology", label: "Information Technology", icon: "💻" },
    { value: "Education", label: "Education", icon: "📚" },
    { value: "Other", label: "Other", icon: "🔍" }
  ];

  const toggleSector = (sector: string) => {
    const newSectors = data.sectors.includes(sector)
      ? data.sectors.filter(s => s !== sector)
      : [...data.sectors, sector];
    onChange({ sectors: newSectors });
  };

  return (
    <div className="p-6 space-y-6">
      <p className="text-sm text-muted-foreground mb-4">Select the sectors you're interested in</p>
      
      <div className="space-y-3">
        {sectorOptions.map((option) => (
          <Card
            key={option.value}
            className={`cursor-pointer transition-colors hover:bg-muted ${
              data.sectors.includes(option.value) ? "ring-2 ring-primary bg-accent/50" : ""
            }`}
            onClick={() => toggleSector(option.value)}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="text-2xl">{option.icon}</div>
              <div className="font-medium flex-1">{option.label}</div>
              {data.sectors.includes(option.value) && <CheckCircle className="w-5 h-5 text-primary" />}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center py-4">
        <Building className="w-16 h-16 text-muted-foreground" />
      </div>
    </div>
  );
};

const LocationStep = ({ data, onChange }: { data: StudentData; onChange: (data: Partial<StudentData>) => void }) => {
  const locationOptions = [
    { value: "My Home State", label: "My Home State", icon: "🏠" },
    { value: "Nearby States", label: "Nearby States", icon: "📍" },
    { value: "Anywhere in India", label: "Anywhere in India", icon: "🇮🇳" },
    { value: "Virtual/Online", label: "Virtual/Online", icon: "💻" }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        {locationOptions.map((option) => (
          <Card
            key={option.value}
            className={`cursor-pointer transition-colors hover:bg-muted ${
              data.location === option.value ? "ring-2 ring-primary bg-accent/50" : ""
            }`}
            onClick={() => onChange({ location: option.value })}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="text-2xl">{option.icon}</div>
              <div className="font-medium flex-1">{option.label}</div>
              {data.location === option.value && <CheckCircle className="w-5 h-5 text-primary" />}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center py-4">
        <MapPin className="w-16 h-16 text-muted-foreground" />
      </div>
    </div>
  );
};

const StudentWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [studentData, setStudentData] = useState<StudentData>({
    gender: "",
    name: "",
    age: "",
    education: "",
    skills: [],
    sectors: [],
    location: ""
  });

  const totalSteps = 5;

  const updateStudentData = (newData: Partial<StudentData>) => {
    setStudentData(prev => ({ ...prev, ...newData }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return studentData.gender && studentData.name && studentData.age;
      case 2: return studentData.education;
      case 3: return studentData.skills.length > 0;
      case 4: return studentData.sectors.length > 0;
      case 5: return studentData.location;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Save data and navigate to recommendations
      localStorage.setItem('studentProfile', JSON.stringify(studentData));
      navigate('/recommendations');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate('/');
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Let's get to know you";
      case 2: return "Your Education Level";
      case 3: return "What subjects or skills have you studied?";
      case 4: return "Which sector interests you?";
      case 5: return "Where do you want to work?";
      default: return "";
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <PersonalInfoStep data={studentData} onChange={updateStudentData} />;
      case 2: return <EducationStep data={studentData} onChange={updateStudentData} />;
      case 3: return <SkillsStep data={studentData} onChange={updateStudentData} />;
      case 4: return <SectorStep data={studentData} onChange={updateStudentData} />;
      case 5: return <LocationStep data={studentData} onChange={updateStudentData} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <WizardStep title={getStepTitle()} step={currentStep} totalSteps={totalSteps} />
      
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg">
          {renderStep()}
        </Card>

        <div className="p-6 flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="px-8"
          >
            {currentStep === 1 ? "Back" : "Previous"}
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="px-8"
          >
            {currentStep === totalSteps ? "Get Recommendations" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentWizard;