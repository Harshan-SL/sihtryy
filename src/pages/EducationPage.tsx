import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, CheckCircle } from "lucide-react";
import { WizardHeader } from '../components/WizardHeader';
import { WizardNavigation } from '../components/WizardNavigation';
import { saveStudentData, getStudentData } from '../utils/studentStorage';
import { TranslationStrings } from '../types/student';

interface EducationPageProps {
  translations: TranslationStrings;
}

export const EducationPage: React.FC<EducationPageProps> = ({ translations }) => {
  const navigate = useNavigate();
  const [education, setEducation] = useState(() => {
    const data = getStudentData();
    return data.education;
  });
  const [isLoading, setIsLoading] = useState(false);

  const educationOptions = [
    { value: "12th Pass", label: translations.education12th, icon: "📚" },
    { value: "Diploma", label: translations.diploma, icon: "📜" },
    { value: "Graduate", label: translations.graduate, icon: "🎓" },
    { value: "Post Graduate", label: translations.postGraduate, icon: "👨‍🎓" }
  ];

  const handleEducationSelect = (value: string) => {
    setEducation(value);
    saveStudentData({ education: value });
  };

  const canProceed = Boolean(education);

  const handleNext = async () => {
    if (!canProceed) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      navigate('/wizard/skills');
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    navigate('/wizard/personal-info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <WizardHeader title={translations.stepTitle2} step={2} totalSteps={5} />
      
      <div className="max-w-md mx-auto pt-6">
        <Card className="shadow-xl border-0">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              {educationOptions.map((option) => (
                <Card
                  key={option.value}
                  className={`cursor-pointer transition-all duration-300 hover:bg-muted hover:scale-105 ${
                    education === option.value ? "ring-2 ring-green-500 bg-green-50 shadow-md" : "hover:shadow-md"
                  }`}
                  onClick={() => handleEducationSelect(option.value)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="text-2xl">{option.icon}</div>
                    <div className="font-medium flex-1">{option.label}</div>
                    {education === option.value && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center py-4">
              <GraduationCap className="w-16 h-16 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <WizardNavigation
          onPrevious={handlePrevious}
          onNext={handleNext}
          canProceed={canProceed}
          isFirstStep={false}
          isLastStep={false}
          isLoading={isLoading}
          translations={translations}
        />
      </div>
    </div>
  );
};
