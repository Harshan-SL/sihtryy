import { useEffect } from 'react';

// Type declarations for Google Translate
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

// Google Translate layout constants
const GOOGLE_TRANSLATE_LAYOUTS = {
  VERTICAL: 0,
  HORIZONTAL: 1,
  SIMPLE: 2,
} as const;

interface GoogleTranslateProps {
  pageLanguage?: string;
  includedLanguages?: string;
  layout?: keyof typeof GOOGLE_TRANSLATE_LAYOUTS;
  className?: string;
}

const GoogleTranslate: React.FC<GoogleTranslateProps> = ({
  pageLanguage = 'en',
  includedLanguages,
  layout = 'HORIZONTAL',
  className = '',
}) => {
  useEffect(() => {
    // Add Google Translate script
    const addScript = (): void => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.type = 'text/javascript';
      document.body.appendChild(script);
    };

    // Define the callback function
    window.googleTranslateElementInit = (): void => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage,
            layout: GOOGLE_TRANSLATE_LAYOUTS[layout],
            ...(includedLanguages && { includedLanguages }),
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };

    // Check if script is already loaded
    if (!window.google?.translate) {
      addScript();
    } else {
      window.googleTranslateElementInit();
    }

    // Cleanup function
    return (): void => {
      // Remove the script when component unmounts
      const scripts = document.querySelectorAll('script[src*="translate.google.com"]');
      scripts.forEach((script) => script.remove());
      
      // Clean up global function
      if (window.googleTranslateElementInit) {
        delete window.googleTranslateElementInit;
      }
    };
  }, [pageLanguage, includedLanguages, layout]);

  return <div id="google_translate_element" className={className} />;
};

export default GoogleTranslate;