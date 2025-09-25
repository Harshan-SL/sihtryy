// src/types/global.d.ts

// Google Translate API types
declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            layout: number;
            includedLanguages?: string;
            excludedLanguages?: string;
            autoDisplay?: boolean;
            multilanguagePage?: boolean;
          },
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit: () => void;
  }
}

export {};