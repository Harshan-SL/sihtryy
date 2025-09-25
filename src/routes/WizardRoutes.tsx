// routes/WizardRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PersonalInfoPage } from '../pages/PersonalInfoPage';
import { EducationPage } from '../pages/EducationPage';
// Import other pages...

const defaultTranslations = {
  back: "Back",
  previous: "Previous", 
  next: "Next",
  getRecommendations: "Get Recommendations",
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
  virtualOnline: "Virtual/Online"
};

interface WizardRoutesProps {
  translations?: Partial<typeof defaultTranslations>;
}

export const WizardRoutes: React.FC<WizardRoutesProps> = ({ 
  translations: customTranslations 
}) => {
  const translations = { ...defaultTranslations, ...customTranslations };

  return (
    <Routes>
      <Route 
        path="/wizard/personal-info" 
        element={<PersonalInfoPage translations={translations} />} 
      />
      <Route 
        path="/wizard/education" 
        element={<EducationPage translations={translations} />} 
      />
      {/* Add other routes for skills, sectors, location pages */}
    </Routes>
  );
};
