import React from 'react';
import Navbar from '../components/Navbar';
import { ShieldCheck, Info, UserCheck } from 'lucide-react';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Navbar />

      {/* Hero Section */}
      <div className="text-center py-16 px-6 md:px-16 lg:px-24 xl:px-32">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Privacy Policy
        </h1>
        <p className="mt-4 text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          At <span className="font-semibold text-primary">QuickAi</span>, your privacy and trust are our top priorities.  
          Learn how we handle, protect, and use your data responsibly.
        </p>
      </div>

      {/* Content Section */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 pb-20 space-y-10">
        
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Info className="text-primary w-6 h-6" />
            <h2 className="text-2xl font-bold text-gray-800">Information We Collect</h2>
          </div>
          <ul className="space-y-2 text-gray-700 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span> Personal information you provide (like name, email).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span> Usage data to improve our tools and services.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span> Cookies and tracking technologies for analytics.
            </li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-primary w-6 h-6" />
            <h2 className="text-2xl font-bold text-gray-800">How We Use Your Information</h2>
          </div>
          <ul className="space-y-2 text-gray-700 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span> To provide and continuously improve our services.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span> To communicate updates, newsletters, or support.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span> To analyze usage patterns and enhance user experience.
            </li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <UserCheck className="text-primary w-6 h-6" />
            <h2 className="text-2xl font-bold text-gray-800">Your Rights</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            You can request access to, correction of, or deletion of your personal information at any time by contacting us at 
            <a href="mailto:support@quickai.com" className="text-primary font-medium ml-1">support@quickai.com</a>.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By using QuickAi, you consent to the practices described in this Privacy Policy. Updates will always be posted here.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default PrivacyPolicy;
