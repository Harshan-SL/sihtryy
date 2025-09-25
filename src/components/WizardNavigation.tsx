
// components/WizardNavigation.tsx
import React from 'react';
import { Button } from "@/components/ui/button";

interface WizardNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  canProceed: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading?: boolean;
  translations: {
    back: string;
    previous: string;
    next: string;
    getRecommendations: string;
  };
}

export const WizardNavigation: React.FC<WizardNavigationProps> = ({
  onPrevious,
  onNext,
  canProceed,
  isFirstStep,
  isLastStep,
  isLoading = false,
  translations
}) => (
  <div className="p-6 flex justify-between bg-white border-t">
    <Button
      variant="outline"
      onClick={onPrevious}
      disabled={isLoading}
      className="px-8 transition-all duration-200 hover:scale-105"
    >
      {isFirstStep ? translations.back : translations.previous}
    </Button>
    
    <Button
      onClick={onNext}
      disabled={!canProceed || isLoading}
      className="px-8 transition-all duration-200 hover:scale-105"
    >
      {isLoading ? "Loading..." : 
       isLastStep ? translations.getRecommendations : translations.next}
    </Button>
  </div>
);
