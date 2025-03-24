"use client";

import { useGlobalContext } from "@/context/GlobalContextProvider";
import { useTranslations } from "next-intl";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeroImage from "../../public/hero.jpg";
import scoutLogo from "../../public/logo.png";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const { toggleLang, isDarkMode } = useGlobalContext();

  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <main
      className={`min-h-screen w-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <header className="fixed w-full top-0 z-40">
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
                    Rover Scout
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
    </main>
  );
}
