import React from 'react';
import Navbar from '../components/Navbar';
import { Target, Rocket, Star, Users, Zap } from 'lucide-react';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Navbar />

      {/* Hero Section */}
      <div className="text-center py-16 px-6 md:px-16 lg:px-24 xl:px-32">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          About <span className="text-primary">QuickAi</span>
        </h1>
        <p className="mt-4 text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          Empowering creators, marketers, and businesses with cutting-edge AI tools 
          to transform ideas into high-quality content — faster and smarter.
        </p>
      </div>

      {/* Intro Section */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 space-y-6">
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          At <span className="font-semibold text-primary">QuickAi</span>, we are revolutionizing the way content is created. 
          Leveraging advanced artificial intelligence, our platform helps creators, 
          marketers, and businesses generate high-quality content efficiently and effectively.
        </p>

        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          Our mission is simple: empower users to focus on creativity while AI handles repetitive tasks. 
          From generating compelling articles and blog posts to creating stunning images, 
          QuickAi is your all-in-one solution for content creation.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid md:grid-cols-2 gap-8 mt-12 px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-4">
            <Target className="text-primary w-7 h-7" />
            <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To become the leading AI-driven platform that transforms the creative workflow, 
            making content creation faster, smarter, and more impactful.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="text-primary w-7 h-7" />
            <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To simplify complex creative processes through AI-powered tools, 
            empowering individuals and businesses to produce professional content effortlessly.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16 pb-20 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">
          Why Choose <span className="text-primary">QuickAi?</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <Star className="text-primary w-8 h-8 mb-3 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">High-Quality Output</h3>
            <p className="text-gray-600 text-sm">
              Generate professional-level articles, blogs, and visuals with ease.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <Zap className="text-primary w-8 h-8 mb-3 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Faster Workflow</h3>
            <p className="text-gray-600 text-sm">
              Save hours by letting AI handle repetitive and time-consuming tasks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <Users className="text-primary w-8 h-8 mb-3 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">For Everyone</h3>
            <p className="text-gray-600 text-sm">
              Whether you’re a creator, marketer, or business, QuickAi works for you.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AboutUs;
