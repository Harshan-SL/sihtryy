import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, CheckCircle } from "lucide-react";
import { WizardHeader } from '../components/WizardHeader';
import { WizardNavigation } from '../components/WizardNavigation';
import { saveStudentData, getStudentData } from '../utils/studentStorage';
import { TranslationStrings } from '../types/student';

interface PersonalInfoPageProps {
  translations: TranslationStrings;
}

export const PersonalInfoPage: React.FC<PersonalInfoPageProps> = ({ translations }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const data = getStudentData();
    // Ensure age is stored as a string, matching Select component's value type
    return {
      gender: data.gender,
      name: data.name,
      age: data.age ? String(data.age) : '',
    };
  });

  const [isLoading, setIsLoading] = useState(false);

  // Generate an array of ages from 20 to 27
  const ageOptions = Array.from({ length: 8 }, (_, i) => String(i + 20));

  const updateFormData = (newData: Partial<typeof formData>) => {
    const updatedData = { ...formData, ...newData };
    setFormData(updatedData);
    saveStudentData(updatedData);
  };

  const canProceed = formData.gender && formData.name && formData.age;

  const handleNext = async () => {
    if (!canProceed) return;

    setIsLoading(true);
    try {
      saveStudentData(formData);
      await new Promise(resolve => setTimeout(resolve, 200));
      navigate('/wizard/education');
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    navigate('/');
  };
  
  // New handler for Select component
  const handleAgeSelect = (value: string) => {
    updateFormData({ age: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <WizardHeader title={translations.stepTitle1} step={1} totalSteps={5} />

      <div className="max-w-md mx-auto pt-6">
        <Card className="shadow-xl border-0">
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="font-semibold mb-4 text-lg">{translations.gender}</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "male", label: translations.male, icon: "👨" },
                  { value: "female", label: translations.female, icon: "👩" }
                ].map((option) => (
                  <Card
                    key={option.value}
                    className={`cursor-pointer transition-all duration-300 hover:bg-muted hover:scale-105 ${
                      formData.gender === option.value ? "ring-2 ring-blue-500 bg-blue-50 shadow-md" : "hover:shadow-md"
                    }`}
                    onClick={() => updateFormData({ gender: option.value })}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="font-medium">{option.label}</div>
                      {formData.gender === option.value && (
                        <CheckCircle className="w-5 h-5 text-blue-500 mx-auto mt-2" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-lg">{translations.yourName}</h3>
              <Input
                placeholder={translations.yourName}
                value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-lg">{translations.yourAge}</h3>
              <Select value={formData.age} onValueChange={handleAgeSelect}>
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder={translations.selectAge || "Select your age"} />
                </SelectTrigger>
                <SelectContent>
                  {ageOptions.map((age) => (
                    <SelectItem key={age} value={age}>
                      {age}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center py-4">
              <User className="w-16 h-16 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <WizardNavigation
          onPrevious={handlePrevious}
          onNext={handleNext}
          canProceed={true}
          isFirstStep={true}
          isLastStep={false}
          isLoading={isLoading}
          translations={translations}
        />
      </div>
    </div>
  );
};