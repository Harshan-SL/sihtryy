// types/student.ts
export interface StudentData {
  gender: string;
  name: string;
  age: string;
  education: string;
  skills: string[];
  sectors: string[];
  location: string;
}

export interface TranslationStrings {
  // Common
  back: string;
  previous: string;
  next: string;
  getRecommendations: string;
  
  // Step 1 - Personal Info
  stepTitle1: string;
  gender: string;
  male: string;
  female: string;
  yourName: string;
  yourAge: string;
  selectAge: string;
  
  // Step 2 - Education
  stepTitle2: string;
  education12th: string;
  diploma: string;
  graduate: string;
  postGraduate: string;
  
  // Step 3 - Skills
  stepTitle3: string;
  selectMultipleSkills: string;
  
  // Step 4 - Sectors
  stepTitle4: string;
  selectSectors: string;
  
  // Step 5 - Location
  stepTitle5: string;
  homeState: string;
  nearbyStates: string;
  anywhereIndia: string;
  virtualOnline: string;
}