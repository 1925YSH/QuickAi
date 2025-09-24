import React from 'react';
import Navbar from '../components/Navbar'; // Make sure your Navbar is imported
import ContactIllustration from '../assets/support.png'; // Replace with your image path
import { assets } from '../assets/assets';
import Footer from '../components/Footer';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-20 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Illustration */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={ContactIllustration}
            alt="Contact Us Illustration"
            className="w-full max-w-md"
          />
        </div>

        {/* Right Contact Form */}
        <div className="md:w-1/2 bg-white p-8 rounded-xl shadow-lg w-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>
          <p className="text-gray-600 mb-8">
            Have questions, feedback, or just want to say hi? Fill out the form below and we’ll get back to you as soon as possible.
          </p>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Subject"
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <button
              type="submit"
              className="bg-primary hover:bg-indigo-600 text-white rounded px-6 py-3 font-semibold transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ContactUs;
