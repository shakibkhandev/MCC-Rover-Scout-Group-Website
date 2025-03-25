"use client";

import { useGlobalContext } from "@/context/GlobalContextProvider";
import { useTranslations } from "next-intl";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeroImage from "../../public/herobg.jpg";
import scoutLogo from "../../public/logo.png";
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';




export default function HomePage() {
  const t = useTranslations("HomePage").raw;


  const { toggleLang, isDarkMode, toggleTheme, locale } = useGlobalContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Height of the fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Close mobile menu if open
      setIsOpen(false);
    }
  };


  useEffect(() => {
    // Add smooth scrolling to HTML element
    document.documentElement.style.scrollBehavior = 'smooth';
    if(locale === 'bn'){
      document.title = t('meta_title')
    }

    return () => {
      // Cleanup
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

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
      }`} id=""
    >
      <header 
        className={`fixed w-full top-0 z-40 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled 
            ? `backdrop-blur-md shadow-lg ${isDarkMode ? "bg-gray-900/95" : "bg-gray-100/95"}` 
            : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <a href="#" className="flex items-center">
                <div className="w-10 h-10">
                  <Image
                    src={scoutLogo}
                    width={40}
                    height={40}
                    alt="Scout Logo"
                  />
                </div>
                <span className={`font-semibold text-xl ml-3 ${isScrolled ? (isDarkMode ? "text-white" : "text-gray-900") : "text-white"}`}>
                  {t('web_name')}
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <nav className="flex items-center space-x-4">
                {
                  t('navItems').map((item: any, index: number)=>(
                    <a
                     key={index}
                    href={`#${item.id}`}
                    className={` px-2 py-2 text-sm font-medium transition-colors ${isScrolled ? `${isDarkMode ? "text-white hover:text-gray-100":"text-gray-900 hover:text-gray-800"}` : 'text-white hover:text-gray-100'}`}
                    onClick={(e) => handleSmoothScroll(e, item.id)}
                  >
                    {item.label}
                  </a>
                  ))
                }
             
              </nav>
              
              {/* Theme and Language Controls */}
              <div className={`flex items-center space-x-2 `}>
              <button
                onClick={toggleLang}
                
                className={`p-2 rounded-full hover:bg-opacity-20 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isScrolled 
                    ? (isDarkMode ? "text-white hover:bg-white/20" : "text-gray-900 hover:bg-gray-900/20") 
                    : "text-white hover:bg-white/20"
                }`}
                aria-label="Toggle Language"
                title="Switch Language"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </button>

              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full hover:bg-opacity-20 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isScrolled 
                    ? (isDarkMode ? "text-white hover:bg-white/20" : "text-gray-900 hover:bg-gray-900/20") 
                    : "text-white hover:bg-white/20"
                }`}
                aria-label="Toggle Theme"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                <div className="relative w-5 h-5">
                  <div className={`absolute inset-0 transform transition-transform duration-200 ${isDarkMode ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </div>
                  <div className={`absolute inset-0 transform transition-transform duration-200 ${isDarkMode ? '-rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
              </button>
              </div>
            </div>

            {/* Mobile Menu Button and Controls */}
            <div className={`flex lg:hidden items-center space-x-2`}>
              <button
                onClick={toggleLang}
                
                className={`p-2 rounded-full hover:bg-opacity-20 cursor-pointer focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isScrolled 
                    ? (isDarkMode ? "text-white hover:bg-white/20" : "text-gray-900 hover:bg-gray-900/20") 
                    : "text-white hover:bg-white/20"
                }`}
                aria-label="Toggle Language"
                title="Switch Language"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </button>

              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full hover:bg-opacity-20 cursor-pointer focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isScrolled 
                    ? (isDarkMode ? "text-white hover:bg-white/20" : "text-gray-900 hover:bg-gray-900/20") 
                    : "text-white hover:bg-white/20"
                }`}
                aria-label="Toggle Theme"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                <div className="relative w-5 h-5">
                  <div className={`absolute inset-0 transform transition-transform duration-200 ${isDarkMode ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </div>
                  <div className={`absolute inset-0 transform transition-transform duration-200 ${isDarkMode ? '-rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-full hover:bg-opacity-20 cursor-pointer focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isScrolled 
                    ? (isDarkMode ? "text-white hover:bg-white/20" : "text-gray-900 hover:bg-gray-900/20") 
                    : "text-white hover:bg-white/20"
                }`}
                aria-label="Toggle Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>


      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Menu Content */}
        <div
          className={`absolute top-0 right-0 h-full w-4/5 max-w-sm transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className={`absolute top-4 right-4 p-2 rounded-full cursor-pointer transition-colors ${
              isDarkMode 
                ? "text-gray-100 hover:bg-gray-800" 
                : "text-gray-900 hover:bg-gray-200"
            }`}
            aria-label="Close Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className={`flex flex-col h-full pt-20 pb-6 px-6 overflow-y-auto`}>
            <nav className="flex-1 space-y-4">
              {t('navItems').map((item: any, index: number) => (
                <a
                  key={index}
                  href={`#${item.id}`}
                  className={`block py-3 text-lg font-medium border-b transition-colors ${
                    !isDarkMode 
                      ? "text-gray-900 border-gray-200 hover:text-gray-600" 
                      : "text-white border-gray-700 hover:text-gray-300"
                  }`}
                  onClick={(e) => {
                    handleSmoothScroll(e, item.id);
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="w-screen h-screen relative">
        <Image src={t('hero_image')} alt="Hero Image" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/40 to-transparent" />

        {/* Hero Text and Button */}
        <div className="absolute inset-0 flex items-center justify-start px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {t('hero_details')}
            </h1>
            <a href="#features">
              <button className="bg-white text-gray-900 px-6 py-3 rounded-md font-semibold text-lg shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
                {t('hero_button')}
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* New Statistics Section */}
      <section className={`py-16`} id={t('navItems')[0].id}>
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
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
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
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
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
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
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
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Service projects and actions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed Members Section */}
      <section id={t('navItems')[1].id} className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('members').header_title}
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('members').header_description}
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              {
                t('members').members_with_position.map((tab : any, index : any) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                      activeTab === index 
                        ? `${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
                        : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`
                    }`}
                  >
                    {tab.title}
                  </button>
                ))
              }
            </div>
          </div>
          {/* Cards Grid */}
          <Swiper
            slidesPerView={6}
            grabCursor={true}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              '@0.00': {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              '@0.50': {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              '@0.75': {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              '@1.00': {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              '@1.50': {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            {
              t('members').members_with_position[activeTab].data.map((member : any, index: any) => (
                <SwiperSlide 
                  key={index}
                  className={`rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                }`}
              >
                <div className="aspect-square relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg">
                    {member.name}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {member.role}
                  </p>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span>{member.joinDate}</span>
                    <span className="mx-1">-</span>
                    <span>{member.leaveDate}</span>
                  </div>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-1`}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {member.contact}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

    
        </div>
      </section>

      {/* Rover Scout Activities Section */}
      <section id={t('navItems')[2].id} className={`py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('activities').header_title}
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('activities').header_description}
            </p>
          </div>

          <Swiper
            slidesPerView={4}
            grabCursor={true}
            spaceBetween={30}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              '@0.00': {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              '@0.75': {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              '@1.00': {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              '@1.50': {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            {
              t("activities").data.sort((a : any, b:any) =>  b.id - a.id).map((activity : any, index: number)=>(
                <SwiperSlide 
                key={index}
                className={`rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                }`}
              >
                <div className="aspect-video relative">
                  <Image
                    src={activity.image_url}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-lg">
                  {activity.title}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {activity.description.length > 100 ? activity.description.substring(0, 100) + "..." : activity.description}
                  </p>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} space-y-1`}>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {activity.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {activity.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {activity.participants}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              ))
            }
           
          </Swiper>
        </div>
      </section>

      {/* About Section */}
      <section id={t('navItems')[3].id} className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('about_us_section').headerTitle}
            </h2>
            <div className={`w-20 h-1 mx-auto bg-blue-600 mb-6 rounded-full`}></div>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('about_us_section').headerDescription}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-1 rounded-2xl shadow-xl">
                <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {t('about_us_section').our_mission.title}
                  </h3>
                  <p className={`mb-8 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('about_us_section').our_mission.description}
                  </p>
                  <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {t('about_us_section').our_mission.values.title}
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {t('about_us_section').our_mission.values.options.map((value: any, index: number) => (
                      <li key={index} className={`flex items-center space-x-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={t('about_us_section').about_us_image}
                  alt="About MCC Rover Scout"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="text-xl font-bold mb-2">Join Our Community</h4>
                  <p className="text-sm text-gray-200">Be part of something bigger than yourself</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* <section id="contact" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Contact Us
            </h2>
            <div className={`w-20 h-1 mx-auto bg-blue-600 mb-6 rounded-full`}></div>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Get in touch with our team
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-1 rounded-2xl shadow-xl order-2 lg:order-1">
              <div className={`h-full rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8`}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Name</label>
                      <input
                        type="text"
                        id="name"
                        className={`w-full px-4 py-3 rounded-lg ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                        } border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Email</label>
                      <input
                        type="email"
                        id="email"
                        className={`w-full px-4 py-3 rounded-lg ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                        } border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className={`w-full px-4 py-3 rounded-lg ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                      } border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Get In Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="p-4 bg-blue-600 rounded-2xl">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Address</h4>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t("footer.address")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="p-4 bg-blue-600 rounded-2xl">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email</h4>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t("footer.email")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="p-4 bg-blue-600 rounded-2xl">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Phone</h4>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t("footer.phone")}
                    </p>
                  </div>
                </div>
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800">
                  <h4 className="text-xl font-semibold text-white mb-2">Office Hours</h4>
                  <div className="space-y-2 text-gray-200">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Achievements Section */}
      <section id={t('navItems')[4].id} className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
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
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
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
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
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
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
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
      <section id={t('navItems')[5].id} className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
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
                  src="https://dummyimage.com/300x300/2563eb/ffffff.jpg&text=Camping"
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
                  src="https://dummyimage.com/300x300/2563eb/ffffff.jpg&text=Leadership"
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
                  src="https://dummyimage.com/300x300/2563eb/ffffff.jpg&text=Community"
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
      <footer className={`border-t border-gray-800/20`}>
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
                <span className={`ml-3 text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{t('web_name')}</span>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('footer').description}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('footer').quick_links}
              </h3>
              <ul className="space-y-2">
                {
                  t('navItems').map((item: any, index: number)=>(
                    <li>
                    <a 
                      key={index}
                      href={`#${item.id}`}
                      className={`text-sm hover:text-blue-400 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                      onClick={(e) => handleSmoothScroll(e, item.id)}
                    >
                      {item.label}
                    </a>
                  </li>
                  ))
                }
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('footer').contact_us}
              </h3>
              <ul className="space-y-2">
                <li className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t('footer').address}
                </li>
                <li className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h18a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2z" />
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l9 6 9-6" />
</svg>

                  {t('footer').email}
                </li>
                <li className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {t("footer").phone}
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('footer').follow_us}
              </h3>
              <div className="flex space-x-4">
                <a 
                  href={t("footer").facebook} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                >
                  <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-blue-500 transition-colors`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href={t("footer").instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                >
                  <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-pink-500 transition-colors`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={`mt-12 pt-8 border-t border-gray-800/20 flex flex-col md:flex-row justify-between items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p className="text-sm">
              &copy; {t('footer').year} {t('web_name')} . {t('footer').all_rights}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#privacy" className="text-sm hover:text-blue-400 transition-colors">
                {t('footer').privacy_policy}
              </a>
              <a href="#terms" className="text-sm hover:text-blue-400 transition-colors">
                {t('footer').terms_of_service}
              </a>
              <a href="#cookies" className="text-sm hover:text-blue-400 transition-colors">
                {t('footer').cookie_policy}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
