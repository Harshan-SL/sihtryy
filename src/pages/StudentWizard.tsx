import { useState, useEffect, useCallback } from "react";
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

interface TranslationStrings {
  // Step titles
  stepTitle1: string;
  stepTitle2: string;
  stepTitle3: string;
  stepTitle4: string;
  stepTitle5: string;
  
  // Personal Info
  gender: string;
  male: string;
  female: string;
  yourName: string;
  yourAge: string;
  selectAge: string;
  
  // Education
  education12th: string;
  diploma: string;
  graduate: string;
  postGraduate: string;
  
  // Skills
  selectMultipleSkills: string;
  
  // Sectors
  selectSectors: string;
  
  // Location
  homeState: string;
  nearbyStates: string;
  anywhereIndia: string;
  virtualOnline: string;
  
  // Navigation
  back: string;
  previous: string;
  next: string;
  getRecommendations: string;
}

// Default English translations
const defaultTranslations: TranslationStrings = {
  stepTitle1: "Let's get to know you",
  stepTitle2: "Your Education Level",
  stepTitle3: "What subjects or skills have you studied?",
  stepTitle4: "Which sector interests you?",
  stepTitle5: "Where do you want to work?",
  
  gender: "Gender",
  male: "Male",
  female: "Female",
  yourName: "Your Name",
  yourAge: "Your Age",
  selectAge: "Select your age",
  
  education12th: "12th Pass",
  diploma: "Diploma",
  graduate: "Graduate",
  postGraduate: "Post Graduate",
  
  selectMultipleSkills: "Select multiple options that apply to you",
  
  selectSectors: "Select the sectors you're interested in",
  
  homeState: "My Home State",
  nearbyStates: "Nearby States",
  anywhereIndia: "Anywhere in India",
  virtualOnline: "Virtual/Online",
  
  back: "Back",
  previous: "Previous",
  next: "Next",
  getRecommendations: "Get Recommendations"
};

const WizardStep = ({ 
  title, 
  step, 
  totalSteps 
}: { 
  title: string; 
  step: number; 
  totalSteps: number; 
}) => (
  <div className="bg-wizard-header text-white p-6 text-center">
    <h2 className="text-xl font-semibold mb-3">{title}</h2>
    <div className="flex justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
            i === step - 1 ? "bg-white" : "bg-wizard-step"
          }`}
        />
      ))}
    </div>
  </div>
);

const PersonalInfoStep = ({ 
  data, 
  onChange, 
  translations 
}: { 
  data: StudentData; 
  onChange: (data: Partial<StudentData>) => void;
  translations: TranslationStrings;
}) => (
  <div className="p-6 space-y-6">
    <div>
      <h3 className="font-semibold mb-4">{translations.gender}</h3>
      <div className="grid grid-cols-2 gap-4">
        {[
          { value: "male", label: translations.male, icon: "👨" },
          { value: "female", label: translations.female, icon: "👩" }
        ].map((option) => (
          <Card
            key={option.value}
            className={`cursor-pointer transition-all duration-200 hover:bg-muted hover:scale-105 ${
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
      <h3 className="font-semibold mb-2">{translations.yourName}</h3>
      <Input
        placeholder={translations.yourName}
        value={data.name}
        onChange={(e) => onChange({ name: e.target.value })}
        className="transition-all duration-200"
      />
    </div>

  <div>
  <h3 className="font-semibold mb-2">{translations.yourAge}</h3>
  <Input
    type="text"
    placeholder={translations.selectAge || "Enter your age"}
    value={data.age}
    onChange={(e) => {
      const value = e.target.value;
      // Allow only numbers between 0 and 150
      if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0 && parseInt(value) <= 150)) {
        onChange({ age: value });
      }
    }}
    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
    maxLength={3}
  />
</div>


    <div className="flex justify-center py-4">
      <User className="w-16 h-16 text-muted-foreground" />
    </div>
  </div>
);

const EducationStep = ({ 
  data, 
  onChange, 
  translations 
}: { 
  data: StudentData; 
  onChange: (data: Partial<StudentData>) => void;
  translations: TranslationStrings;
}) => {
  const educationOptions = [
    { value: "12th Pass", label: translations.education12th, icon: "📚" },
    { value: "Diploma", label: translations.diploma, icon: "📜" },
    { value: "Graduate", label: translations.graduate, icon: "🎓" },
    { value: "Post Graduate", label: translations.postGraduate, icon: "👨‍🎓" }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        {educationOptions.map((option) => (
          <Card
            key={option.value}
            className={`cursor-pointer transition-all duration-200 hover:bg-muted hover:scale-105 ${
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

const SkillsStep = ({ 
  data, 
  onChange, 
  translations 
}: { 
  data: StudentData; 
  onChange: (data: Partial<StudentData>) => void;
  translations: TranslationStrings;
}) => {
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

  const toggleSkill = useCallback((skill: string) => {
    const newSkills = data.skills.includes(skill)
      ? data.skills.filter(s => s !== skill)
      : [...data.skills, skill];
    onChange({ skills: newSkills });
  }, [data.skills, onChange]);

  return (
    <div className="p-6 space-y-6">
      <p className="text-sm text-muted-foreground mb-4">{translations.selectMultipleSkills}</p>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {skillOptions.map((option) => (
          <Card
            key={option.value}
            className={`cursor-pointer transition-all duration-200 hover:bg-muted hover:scale-105 ${
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

const SectorStep = ({ 
  data, 
  onChange, 
  translations 
}: { 
  data: StudentData; 
  onChange: (data: Partial<StudentData>) => void;
  translations: TranslationStrings;
}) => {
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

  const toggleSector = useCallback((sector: string) => {
    const newSectors = data.sectors.includes(sector)
      ? data.sectors.filter(s => s !== sector)
      : [...data.sectors, sector];
    onChange({ sectors: newSectors });
  }, [data.sectors, onChange]);

  return (
    <div className="p-6 space-y-6">
      <p className="text-sm text-muted-foreground mb-4">{translations.selectSectors}</p>
      
      <div className="space-y-3">
        {sectorOptions.map((option) => (
          <Card
            key={option.value}
            className={`cursor-pointer transition-all duration-200 hover:bg-muted hover:scale-105 ${
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

const LocationStep = ({ 
  data, 
  onChange, 
  translations 
}: { 
  data: StudentData; 
  onChange: (data: Partial<StudentData>) => void;
  translations: TranslationStrings;
}) => {
  const locationOptions = [
    { value: "My Home State", label: translations.homeState, icon: "🏠" },
    { value: "Nearby States", label: translations.nearbyStates, icon: "📍" },
    { value: "Anywhere in India", label: translations.anywhereIndia, icon: "🇮🇳" },
    { value: "Virtual/Online", label: translations.virtualOnline, icon: "💻" }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        {locationOptions.map((option) => (
          <Card
            key={option.value}
            className={`cursor-pointer transition-all duration-200 hover:bg-muted hover:scale-105 ${
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

interface StudentWizardProps {
  translations?: Partial<TranslationStrings>;
}

const StudentWizard = ({ translations: customTranslations }: StudentWizardProps) => {
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
  const [isNavigating, setIsNavigating] = useState(false);

  const translations = { ...defaultTranslations, ...customTranslations };
  const totalSteps = 5;

  const updateStudentData = useCallback((newData: Partial<StudentData>) => {
    setStudentData(prev => ({ ...prev, ...newData }));
  }, []);

  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 1: return studentData.gender && studentData.name && studentData.age;
      case 2: return studentData.education;
      case 3: return studentData.skills.length > 0;
      case 4: return studentData.sectors.length > 0;
      case 5: return studentData.location;
      default: return false;
    }
  }, [currentStep, studentData]);

  const handleNext = useCallback(async () => {
    if (isNavigating) return;
    
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsNavigating(true);
      try {
        // Save data to memory instead of localStorage for Claude.ai compatibility
        // In a real app, this would be localStorage
        const profileData = JSON.stringify(studentData);
        console.log('Student profile data:', profileData);
        
        // Add a small delay to ensure state updates are complete
        await new Promise(resolve => setTimeout(resolve, 100));
        navigate('/recommendations');
      } catch (error) {
        console.error('Error during navigation:', error);
        setIsNavigating(false);
      }
    }
  }, [currentStep, totalSteps, studentData, navigate, isNavigating]);

  const handlePrevious = useCallback(() => {
    if (isNavigating) return;
    
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate('/');
    }
  }, [currentStep, navigate, isNavigating]);

  const getStepTitle = useCallback(() => {
    switch (currentStep) {
      case 1: return translations.stepTitle1;
      case 2: return translations.stepTitle2;
      case 3: return translations.stepTitle3;
      case 4: return translations.stepTitle4;
      case 5: return translations.stepTitle5;
      default: return "";
    }
  }, [currentStep, translations]);

  const renderStep = useCallback(() => {
    const stepProps = { data: studentData, onChange: updateStudentData, translations };
    
    switch (currentStep) {
      case 1: return <PersonalInfoStep {...stepProps} />;
      case 2: return <EducationStep {...stepProps} />;
      case 3: return <SkillsStep {...stepProps} />;
      case 4: return <SectorStep {...stepProps} />;
      case 5: return <LocationStep {...stepProps} />;
      default: return null;
    }
  }, [currentStep, studentData, updateStudentData, translations]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      setIsNavigating(false);
    };
  }, []);

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
            disabled={isNavigating}
            className="px-8 transition-all duration-200"
          >
            {currentStep === 1 ? translations.back : translations.previous}
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed() || isNavigating}
            className="px-8 transition-all duration-200"
          >
            {isNavigating ? "Loading..." : 
             currentStep === totalSteps ? translations.getRecommendations : translations.next}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentWizard;