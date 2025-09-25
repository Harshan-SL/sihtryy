import React from 'react';
import GoogleTranslate from '../ui/GoogleTranslate';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with Google Translate */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Student Recommendations
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <GoogleTranslate 
                pageLanguage="en"
                includedLanguages="en,am,ar,eu,bn,en-GB,pt-BR,bg,ca,chr,hr,cs,da,nl,en,et,fil,fi,fr,de,el,gu,iw,hi,hu,is,id,it,ja,kn,ko,lv,lt,ms,ml,mr,no,pl,pt-PT,ro,ru,sr,zh-CN,sk,sl,es,sw,sv,ta,te,th,zh-TW,tr,ur,uk,vi,cy"
                layout="HORIZONTAL"
                className="translate-widget"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;