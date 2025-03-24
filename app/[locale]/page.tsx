"use client";

import { useGlobalContext } from "@/context/GlobalContextProvider";
import { useTranslations } from "next-intl";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import HeroImage from "../../public/hero.jpg";
import scoutLogo from "../../public/logo.png";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const { toggleLang, isDarkMode } = useGlobalContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if we've scrolled past the top
      setIsScrolled(currentScrollY > 0);
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <main
      className={`min-h-screen w-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <header 
        className={`fixed w-full top-0 z-40 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled 
            ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center text-white font-bold mr-2">
                    <Image
                      src={scoutLogo}
                      width={200}
                      height={200}
                      alt="Scout Logo"
                    />
                  </div>
                  <span className="text-white font-semibold text-xl">
                    MCC Rover Scout
                  </span>
                </Link>
              </div>

              <div className="hidden md:flex items-center">
                <nav className="flex space-x-6 mr-6">
                  <Link
                    href="/features"
                    className="text-gray-100 hover:text-white px-2 py-2 text-sm font-medium transition-colors"
                  >
                    Features
                  </Link>
                  <Link
                    href="/pricing"
                    className="text-gray-100 hover:text-white px-2 py-2 text-sm font-medium transition-colors"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/about"
                    className="text-gray-100 hover:text-white px-2 py-2 text-sm font-medium transition-colors"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="text-gray-100 hover:text-white px-2 py-2 text-sm font-medium transition-colors"
                  >
                    Contact
                  </Link>
                </nav>
                <button className="bg-white cursor-pointer text-gray-800 px-4 py-2 rounded-md font-medium shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5">
                  Get Started
                </button>
              </div>

              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none cursor-pointer pt-4"
                  aria-expanded={isOpen}
                >
                  <span className="sr-only">
                    {isOpen ? "Close main menu" : "Open main menu"}
                  </span>
                  <div className="relative w-6 h-6">
                    <span
                      className={`absolute block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                        isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                      }`}
                    />
                    <span
                      className={`absolute block h-0.5 bg-white transform transition duration-300 ease-in-out ${
                        isOpen ? "opacity-0 w-0" : "opacity-100 w-6"
                      }`}
                    />
                    <span
                      className={`absolute block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                        isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-30 md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>

        <div
          className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-gradient-to-b from-gray-900 to-black shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-20 pb-6 px-6 overflow-y-auto">
            <nav className="flex-1 space-y-4">
              <Link
                href="/features"
                className="block py-3 text-lg font-medium text-white border-b border-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="block py-3 text-lg font-medium text-white border-b border-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="block py-3 text-lg font-medium text-white border-b border-gray-700"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block py-3 text-lg font-medium text-white border-b border-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </nav>

            <div className="mt-8">
              <button className="w-full bg-white text-gray-800 px-4 py-3 rounded-md font-medium shadow-md hover:shadow-lg transition-all duration-200">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="w-screen h-screen relative">
        <Image src={HeroImage} alt="Hero Image" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/40 to-transparent" />

        {/* Hero Text and Button */}
        <div className="absolute inset-0 flex items-center justify-start px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Creating transformative learning experiences for young people,
              everywhere.
            </h1>
            <Link href="/scout-movement">
              <button className="bg-white text-gray-900 px-6 py-3 rounded-md font-semibold text-lg shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
                Scout Movement
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Statistics Section */}
      <section className={`py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {/* Stat 1: Scouts and Volunteers */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4">
                {/* Placeholder for icon - replace with your own */}
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600">Icon</span>
                </div>
              </div>
              <h3
                className={`text-3xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                57 million+
              </h3>
              <p
                className={`mt-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Scouts and volunteers
              </p>
            </div>

            {/* Stat 2: National Scout Organizations */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4">
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600">Icon</span>
                </div>
              </div>
              <h3
                className={`text-3xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                176
              </h3>
              <p
                className={`mt-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                National Scout Organizations
              </p>
            </div>

            {/* Stat 3: Hours of Community Service */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4">
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600">Icon</span>
                </div>
              </div>
              <h3
                className={`text-3xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                2.7 billion+
              </h3>
              <p
                className={`mt-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Hours of community service
              </p>
            </div>

            {/* Stat 4: Service Projects and Actions */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4">
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600">Icon</span>
                </div>
              </div>
              <h3
                className={`text-3xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                16 million+
              </h3>
              <p
                className={`mt-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Service projects and actions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Rover Scout Activities
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Discover the exciting world of Rover Scouting through our diverse range of activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Activity Card 1 */}
            <div className={`rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-all duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="relative h-48">
                <Image
                  src="/activities/adventure.jpg"
                  alt="Adventure Activities"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Adventure Activities
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Experience thrilling outdoor adventures including hiking, camping, and water sports.
                </p>
              </div>
            </div>

            {/* Activity Card 2 */}
            <div className={`rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-all duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="relative h-48">
                <Image
                  src="/activities/leadership.jpg"
                  alt="Leadership Development"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Leadership Development
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Develop essential leadership skills through workshops, mentoring, and practical projects.
                </p>
              </div>
            </div>

            {/* Activity Card 3 */}
            <div className={`rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-all duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="relative h-48">
                <Image
                  src="/activities/community.jpg"
                  alt="Community Service"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Community Service
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Make a positive impact through various community service projects and initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Our Achievements
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Celebrating the success and impact of our Rover Scout members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Achievement 1 */}
            <div className={`p-6 rounded-xl text-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                500+ Projects
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Community service projects completed
              </p>
            </div>

            {/* Achievement 2 */}
            <div className={`p-6 rounded-xl text-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                1000+ Hours
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Volunteer hours contributed
              </p>
            </div>

            {/* Achievement 3 */}
            <div className={`p-6 rounded-xl text-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                50+ Awards
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Recognition and achievements
              </p>
            </div>

            {/* Achievement 4 */}
            <div className={`p-6 rounded-xl text-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                200+ Members
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Active Rover Scout members
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Upcoming Events
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Join us for exciting upcoming events and activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event Card 1 */}
            <div className={`rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="relative h-48">
                <Image
                  src="/events/camping.jpg"
                  alt="Camping Expedition"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  June 15-20
                </div>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Summer Camping Expedition
                </h3>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Join us for an exciting 5-day camping expedition in the mountains.
                </p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Register Now
                </button>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className={`rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="relative h-48">
                <Image
                  src="/events/leadership.jpg"
                  alt="Leadership Workshop"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  July 5
                </div>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Leadership Workshop
                </h3>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Develop your leadership skills with our expert facilitators.
                </p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Register Now
                </button>
              </div>
            </div>

            {/* Event Card 3 */}
            <div className={`rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="relative h-48">
                <Image
                  src="/events/community.jpg"
                  alt="Community Service Day"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                  July 20
                </div>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Community Service Day
                </h3>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Make a difference in your community through various service projects.
                </p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-t border-gray-800/20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center">
                <Image
                  src={scoutLogo}
                  width={40}
                  height={40}
                  alt="Scout Logo"
                  className="rounded-lg"
                />
                <span className="ml-3 text-xl font-bold text-white">MCC Rover Scout</span>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Empowering young people to create positive change in their communities through leadership, service, and adventure.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className={`text-sm hover:text-blue-400 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/programs" className={`text-sm hover:text-blue-400 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Programs
                  </Link>
                </li>
                <li>
                  <Link href="/events" className={`text-sm hover:text-blue-400 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/volunteer" className={`text-sm hover:text-blue-400 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Volunteer
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Contact Us
              </h3>
              <ul className="space-y-2">
                <li className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  123 Scout Street, City
                </li>
                <li className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  contact@roverscout.org
                </li>
                <li className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1 (555) 123-4567
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a href="#" className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} hover:bg-blue-500 transition-colors`}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} hover:bg-blue-400 transition-colors`}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} hover:bg-pink-500 transition-colors`}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
                <a href="#" className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} hover:bg-red-500 transition-colors`}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={`mt-12 pt-8 border-t border-gray-800/20 flex flex-col md:flex-row justify-between items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p className="text-sm">
              © {new Date().getFullYear()} MCC Rover Scout. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm hover:text-blue-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
