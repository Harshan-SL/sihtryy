import { StudentData } from '../types/student';

const STORAGE_KEY = 'studentWizardData';

export const saveStudentData = (data: Partial<StudentData>) => {
  try {
    const existingData = getStudentData();
    const updatedData = { ...existingData, ...data };
    // In a real app, use localStorage. For Claude.ai, we'll use a global variable
    (window as any).studentWizardData = updatedData;
    console.log('Student data saved:', updatedData);
    return updatedData;
  } catch (error) {
    console.error('Error saving student data:', error);
    return data;
  }
};

export const getStudentData = (): StudentData => {
  try {
    // In a real app, use localStorage. For Claude.ai, use global variable
    const data = (window as any).studentWizardData;
    return data || {
      gender: "",
      name: "",
      age: "",
      education: "",
      skills: [],
      sectors: [],
      location: ""
    };
  } catch (error) {
    console.error('Error loading student data:', error);
    return {
      gender: "",
      name: "",
      age: "",
      education: "",
      skills: [],
      sectors: [],
      location: ""
    };
  }
};

export const clearStudentData = () => {
  try {
    (window as any).studentWizardData = null;
    console.log('Student data cleared');
  } catch (error) {
    console.error('Error clearing student data:', error);
  }
};
