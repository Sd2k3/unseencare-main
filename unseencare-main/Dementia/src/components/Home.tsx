import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { Link } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { LayoutGrid } from './ui/layout-grid';

gsap.registerPlugin(ScrollTrigger);

type LocomotiveScrollType = {
  on: (event: string, callback: () => void) => void;
  scrollTo: (...args: unknown[]) => void;
  scroll: { instance: { scroll: { y: number } } };
  update: () => void;
  destroy: () => void;
};

const cards = [
  {
    id: 1,
    content: (
      <div className="p-4 text-white">
        <h3 className="text-2xl font-bold mb-2">1. Epilepsy-Specific Features</h3>
        <p className="text-sm">
          a. Seizure Detection & Alert System
Real-time Motion Analysis: Uses smartphone/accelerometer data or wearable devices (like smartwatches) to detect unusual movements (tonic-clonic seizures).

AI-Powered Alerts: Machine learning models trained on seizure patterns trigger automatic alerts.

SOS Notifications:

Sends GPS location + timestamp to emergency contacts (family/caregivers).

Integrates with local emergency services (if available).

Post-Seizure Report: Logs duration and intensity for medical review.
        </p>
      </div>
    ),
    className: "col-span-1",
    thumbnail: "https://plus.unsplash.com/premium_photo-1730133744149-e628388cdad5?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    content: (
      <div className="p-4 text-white">
        <h3 className="text-2xl font-bold mb-2">  2. Dementia-Specific Features</h3>
        <p className="text-sm">
          2. Dementia-Specific Features
a. Face & Voice Recognition
Family Recognition: Uses smartphone camera to identify and label family members (helpful for memory loss).

Voice-Activated Reminders:

"Hey UnseenCare, where’s my wallet?" → Triggers Tile/BLE tracker.

"Remind me to take pills at 3 PM."

b. Safety Alerts
Wandering Detection: Geofencing alerts if the user leaves a safe zone (home/care center).

Fall Detection: Uses phone sensors to detect falls and notify caregivers.

c. Cognitive Support
Memory Games: Simple puzzles to slow cognitive decline.

Photo-Based Reminders: "This is your granddaughter, Maya" (with labeled photos).
        </p>
      </div>
    ),
    className: "col-span-1",
    thumbnail: "https://media.istockphoto.com/id/1168365129/photo/authentication-by-facial-recognition-concept-biometric-security-system.jpg?s=2048x2048&w=is&k=20&c=JwPYe0TPiH4JQUe5Z5g59Iq2AQE7MsW302d9YN4l4gc=",
  },
  {
    id: 3,
    content: (
      <div className="p-4 text-white">
        <h3 className="text-2xl font-bold mb-2">3. Speech Disorder Features</h3>
        <p className="text-sm">
          
a. Speech-to-Text Assistant
Real-Time Transcription: Converts slurred/difficult speech into text for communication.

Custom Word Banks: Pre-loaded phrases for common needs (e.g., "I need water").

b. Pronunciation Therapy
AI Feedback: Analyzes speech patterns and suggests exercises (e.g., "Try saying ‘water’ slower").

Augmentative & Alternative Communication (AAC): Symbol-based communication for non-verbal users.
        </p>
      </div>
    ),
    className: "col-span-1",
    thumbnail: "https://plus.unsplash.com/premium_photo-1683140661365-f72ac5f58035?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const slides = [
  {
    title: "Stay Safe",
    button: "Learn More",
    src: "/images/safety.png",
  },
  {
    title: "Track Medication",
    button: "View Schedule",
    src: "/images/medication.png",
  },
  {
    title: "Emergency Help",
    button: "Call Now",
    src: "/images/emergency.png",
  },
];

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const fixedImageRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollRef = useRef<LocomotiveScrollType | null>(null);

  // Initialize animations and effects
  useEffect(() => {
    // Loader animation
    const loaderTimeline = gsap.timeline();
    loaderTimeline
      .to("#loader h1:nth-child(1)", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
      .to("#loader h1:nth-child(1)", { opacity: 0, y: -20, duration: 0.8, ease: "power2.in", delay: 0.5 })
      .to("#loader h1:nth-child(2)", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
      .to("#loader h1:nth-child(2)", { opacity: 0, y: -20, duration: 0.8, ease: "power2.in", delay: 0.5 })
      .to("#loader h1:nth-child(3)", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
      .to("#loader h1:nth-child(3)", { opacity: 0, y: -20, duration: 0.8, ease: "power2.in", delay: 0.5 })
      .to("#loader", { y: "-100%", duration: 1.5, ease: "power3.inOut", onComplete: () => setIsLoading(false) });

    // Initialize Locomotive Scroll after loader completes
    const initScroll = () => {
      if (mainRef.current) {
        locomotiveScrollRef.current = new LocomotiveScroll({
          el: mainRef.current,
          smooth: true,
          multiplier: 1,
          class: 'is-revealed',
          smartphone: { smooth: true },
          tablet: { smooth: true }
        });

        locomotiveScrollRef.current?.on('scroll', ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(mainRef.current, {
          scrollTop(value) {
            return arguments.length 
              ? locomotiveScrollRef.current!.scrollTo(value, 0, 0) 
              : locomotiveScrollRef.current!.scroll.instance.scroll.y;
          },
          getBoundingClientRect() {
            return { 
              top: 0, 
              left: 0, 
              width: window.innerWidth, 
              height: window.innerHeight 
            };
          },
          pinType: mainRef.current?.style.transform ? "transform" : "fixed"
        });

        ScrollTrigger.addEventListener('refresh', () => locomotiveScrollRef.current?.update());
        ScrollTrigger.refresh();
      }
    };

    // Hero section animations
    const heroAnimations = () => {
      gsap.from("#left h3", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
        delay: 0.5
      });

      gsap.from("#right h1", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
        delay: 0.3
      });

      gsap.to("#hero-2", {
        x: "-20%",
        y: "30%",
        duration: 5,
        ease: "none",
        repeat: -1,
        yoyo: true
      });

      gsap.to("#hero-3", {
        x: "0%",
        y: "10%",
        duration: 5,
        ease: "none",
        repeat: -1,
        yoyo: true
      });
    };

    // Moving text animation
    const movingTextAnimation = () => {
      const movingText = document.querySelector("#moving-text");
      if (movingText) {
        const width = movingText.scrollWidth;
        gsap.to(".con", {
          x: -width,
          duration: 20,
          ease: "none",
          repeat: -1
        });
      }
    };

    // Gooey blob animation
    gsap.to("#gooey", {
      x: "-10%",
      y: "10%",
      skewX: -12,
      filter: "blur(30px)",
      duration: 6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    // Initialize after loader
    const timeout = setTimeout(() => {
      initScroll();
      heroAnimations();
      movingTextAnimation();
    }, 4200);

    return () => {
      clearTimeout(timeout);
      loaderTimeline.kill();
      if (locomotiveScrollRef.current) locomotiveScrollRef.current.destroy();
    };
  }, []);

  // Hover effects for team members
  useEffect(() => {
    const elems = document.querySelectorAll(".elem");
    const fixedImage = fixedImageRef.current;

    if (!fixedImage) return;

    const handleMouseEnter = (elem: HTMLElement) => {
      const imageUrl = elem.getAttribute("data-image");
      if (imageUrl) {
        fixedImage.style.backgroundImage = `url(${imageUrl})`;
        fixedImage.style.display = "block";
        gsap.to(fixedImage, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(fixedImage, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          fixedImage.style.display = "none";
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPercent = (clientX / innerWidth) * 100;
      const yPercent = (clientY / innerHeight) * 100;
      fixedImage.style.transform = `translate(${xPercent * 0.1}px, ${yPercent * 0.1}px) scale(1)`;
    };

    elems.forEach(elem => {
      elem.addEventListener("mouseenter", (e) => handleMouseEnter(elem as HTMLElement));
    });

    const elemContainer = document.querySelector("#elem-container");
    if (elemContainer) {
      elemContainer.addEventListener("mouseleave", handleMouseLeave);
      elemContainer.addEventListener("mousemove", (e) => handleMouseMove(e as MouseEvent));
    }

    return () => {
      elems.forEach(elem => {
        elem.removeEventListener("mouseenter", (e) => handleMouseEnter(elem as HTMLElement));
      });
      if (elemContainer) {
        elemContainer.removeEventListener("mouseleave", handleMouseLeave);
        elemContainer.removeEventListener("mousemove", (e) => handleMouseMove(e as MouseEvent));
      }
    };
  }, []);

  // Menu toggle functionality
  const toggleMenu = () => {
    const fullScr = document.querySelector("#full-scr") as HTMLElement;
    if (fullScr) {
      if (fullScr.style.transform === 'translateY(0%)') {
        gsap.to(fullScr, {
          y: '-100%',
          duration: 0.8,
          ease: "power2.inOut"
        });
      } else {
        gsap.to(fullScr, {
          y: '0%',
          duration: 0.8,
          ease: "power2.inOut"
        });
      }
    }
  };

  return (
    <div className="relative">
      {/* Loader */}
      {isLoading && (
        <div id="loader" className="fixed inset-0 bg-black z-[999] flex items-center justify-center">
          <h1 className="absolute text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-white via-[#fe320a] to-white bg-clip-text text-transparent opacity-0">
            DEMENTIA
          </h1>
          <h1 className="absolute text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-white via-[#fe320a] to-white bg-clip-text text-transparent opacity-0">
            EPILEPSY
          </h1>
          <h1 className="absolute text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-white via-[#fe320a] to-white bg-clip-text text-transparent opacity-0">
            SPEECH DISORDER
          </h1>
        </div>
      )}

      {/* Fixed image for hover effects */}
      <div
        id="fixed-image"
        ref={fixedImageRef}
        className="h-[30vw] w-[24vw] rounded-xl fixed z-[99] left-1/2 top-1/4 hidden bg-cover bg-center opacity-0 scale-80 pointer-events-none"
      />

      {/* Main content */}
      <div id="main" ref={mainRef} className="relative z-10 bg-black">
        {/* Page 1 - Hero Section */}
        <div id="page1" className="min-h-screen w-full bg-black relative px-[2vw]">
          <nav className="py-[2vw] w-full flex items-center relative z-[100] justify-between">
            <img src="/placeholder.svg" alt="Logo" className="h-12" />
            <div id="nav-part2" className="flex items-center gap-[1vw]">
              <button className="bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300">
                Sign In
              </button>
              <button className="bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300">
                SUbscribe
              </button>
              <h4 className="px-5 py-2 border border-[#ffffff3c] rounded-full font-medium text-white text-lg overflow-hidden cursor-pointer relative transition-all duration-300 hover:transform hover:-translate-y-0.5">
                <button className="bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300">
                <button className="bg-gradient-to-r from-[#E83E8C] to-[#6F42C1] text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300">
                Contact
              </button>
              </button>
              </h4>
            </div>
            <h3 className="hidden px-5 py-3 border border-[#ffffff3c] rounded-full text-white text-sm font-light cursor-pointer" onClick={toggleMenu}>
              Menu
            </h3>
          </nav>

          <div id="center" className="h-[65vh] w-full flex items-end justify-between border-b border-[#ffffff3c] pb-[2.5vw]">
            <div id="left" className="w-[25vw]">
              <h3 className="text-[1.8vw] leading-[2vw] text-[#cccccc] animate-fadeInUp">
                UnseenCare is a purpose-driven platform dedicated to supporting minds and voices often overlooked — offering compassionate, integrated solutions for dementia, speech disorders, and epilepsy.
              </h3>
            </div>
            <div id="right" className="text-right">
              <h1 className="text-[10vw] leading-[8vw] bg-gradient-to-br from-white via-[#fe320a] to-white bg-clip-text text-transparent bg-[length:200%_200%] animate-fadeInUp animate-gradient-move">
                Understanding<br />
                Unseen<br />
                Conditions
              </h1>
            </div>
          </div>

          <div id="hero-shape" className="absolute w-[46vw] h-[36vw] right-0 top-[65vh] pointer-events-none">
            <div id="hero-3" className="h-[30vw] w-[30vw] rounded-full absolute bg-gradient-to-br from-[#fe320a] to-[#ff5c0b] blur-[25px]" />
          </div>

         
        </div>

        {/* Page 2 - Moving Text Section */}
        <div id="page2" className="min-h-screen w-full bg-black py-[8vw] relative">
          <div id="moving-text" className="overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div className="con inline-block whitespace-nowrap">
              <h1 className="text-[9vw] inline-block bg-gradient-to-r from-white via-[#fe320a] to-white bg-clip-text text-transparent bg-size-200-100">
                DEMENTIA
              </h1>
              <div id="gola" className="h-[70px] w-[70px] rounded-full inline-block bg-[#fe320a] mx-[2vw] my-[1vw] animate-pulse" />
              <h1 className="text-[9vw] inline-block bg-gradient-to-r from-white via-[#fe320a] to-white bg-clip-text text-transparent bg-size-200-100">
                EPILEPSY
              </h1>
              <div id="gola" className="h-[70px] w-[70px] rounded-full inline-block bg-[#fe320a] mx-[2vw] my-[1vw] animate-pulse" />
              <h1 className="text-[9vw] inline-block bg-gradient-to-r from-white via-[#fe320a] to-white bg-clip-text text-transparent bg-size-200-100">
                SPEECH DISORDER
              </h1>
              <div id="gola" className="h-[70px] w-[70px] rounded-full inline-block bg-[#fe320a] mx-[2vw] my-[1vw] animate-pulse" />
            </div>
          </div>

          <div id="page2-bottom" className="h-[80vh] w-full px-[4.5vw] flex items-center justify-between relative z-[9]">
            <h1 className="text-[4vw] w-[60%] leading-[4vw] bg-gradient-to-br from-white via-[#fe320a] to-white bg-clip-text text-transparent bg-size-200-200 animate-gradient-move">
              We are a dedicated team of healthcare professionals, researchers, and advocates committed to raising awareness and providing comprehensive support for neurological and speech disorders
            </h1>
            <div id="bottom-part2" className="w-[20%] transition-all duration-400 hover:-translate-y-2.5 py-70 mt-32">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/team.jpg-UGIXrUdGvXjJhJBNNIJj9YugPP1Erh.jpeg" 
                alt="Team" 
                className="w-full rounded-xl transition-all duration-400 hover:scale-105"
              />
              <p className="mt-[2vw] text-[1vw] text-[#cccccc] font-light">
                Our mission is to bridge the gap between medical care and emotional support, creating a comprehensive ecosystem where patients, families, and caregivers can find the resources they need.
              </p>
            </div>
          </div>

          <div id="gooey" className="h-[32vw] w-[32vw] absolute rounded-full bg-gradient-to-br from-[#fe320a] to-[#ff5c0b] blur-[20px] top-[58%] left-[25%]" />
        </div>

        {/* Page 3 - Team Section */}
        <div id="page3" className="min-h-screen w-full bg-black py-[4vw]">
          <div id="elem-container" className="w-full">
            {/* Team Member 1 */}
            <div 
              className="elem h-[150px] w-full relative border-b border-[#ffffff64] overflow-hidden flex items-center px-[2vw] cursor-pointer transition-all duration-300 hover:translate-x-2.5"
              data-image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chirag.jpg-HdHeQolRcmVLOc5yRnhiAvCUTB6PHt.jpeg"
            >
              <div className="overlay h-full w-full bg-orange-500 absolute left-0 top-[-100%] transition-all duration-300 hover:top-0" />
              <a 
                href="https://github.com/Chirag-pandit" 
                target="_blank" 
                rel="noopener noreferrer"
                className="github-link absolute top-5 right-5 w-10 h-10 bg-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center opacity-0 transition-all duration-300 z-[10] text-white no-underline hover:bg-[rgba(254,50,10,0.8)] hover:scale-110"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <h2 className="text-white text-5xl relative z-[9] transition-all duration-300 hover:text-[#fe320a] hover:translate-x-5">
                CHIRAG FRONTEND UI/UX
              </h2>
            </div>

            {/* Team Member 2 */}
            <div 
              className="elem h-[150px] w-full relative border-b border-[#ffffff64] overflow-hidden flex items-center px-[2vw] cursor-pointer transition-all duration-300 hover:translate-x-2.5"
              data-image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KS.jpg-UfSa7sDDzPc3xtiPSZI22yPnRdjxmh.jpeg"
            >
              <div className="overlay h-full w-full bg-orange-500 absolute left-0 top-[-100%] transition-all duration-300 hover:top-0" />
              <a 
                href="https://github.com/kanaksharma67" 
                target="_blank" 
                rel="noopener noreferrer"
                className="github-link absolute top-5 right-5 w-10 h-10 bg-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center opacity-0 transition-all duration-300 z-[10] text-white no-underline hover:bg-[rgba(254,50,10,0.8)] hover:scale-110"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <h2 className="text-white text-5xl relative z-[9] transition-all duration-300 hover:text-[#fe320a] hover:translate-x-5">
                KANAK FULLSTACK DEVLOPER
              </h2>
            </div>

            {/* Team Member 3 */}
            <div 
              className="elem h-[150px] w-full relative border-b border-[#ffffff64] overflow-hidden flex items-center px-[2vw] cursor-pointer transition-all duration-300 hover:translate-x-2.5"
              data-image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RS.jpg-Ne2FpVxVmW8slsZGcRJTHkvFrv34QH.jpeg"
            >
              <div className="overlay h-full w-full bg-orange-500 absolute left-0 top-[-100%] transition-all duration-300 hover:top-0" />
              <a 
                href="https://github.com/rohitsharma2610" 
                target="_blank" 
                rel="noopener noreferrer"
                className="github-link absolute top-5 right-5 w-10 h-10 bg-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center opacity-0 transition-all duration-300 z-[10] text-white no-underline hover:bg-[rgba(254,50,10,0.8)] hover:scale-110"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <h2 className="text-white text-5xl relative z-[9] transition-all duration-300 hover:text-[#fe320a] hover:translate-x-5">
                ROHIT SHARMA BACKEND DEVLOPER
              </h2>
            </div>

            {/* Team Member 4 */}
            <div 
              className="elem h-[150px] w-full relative border-b border-[#ffffff64] overflow-hidden flex items-center px-[2vw] cursor-pointer transition-all duration-300 hover:translate-x-2.5"
              data-image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SD.jpg-O1lCcQG00MR7RIjcBorJN6BkbkiyXJ.jpeg"
            >
              <div className="overlay h-full w-full bg-orange-500 absolute left-0 top-[-100%] transition-all duration-300 hover:top-0" />
              <a 
                href="https://github.com/Sd2k3" 
                target="_blank" 
                rel="noopener noreferrer"
                className="github-link absolute top-5 right-5 w-10 h-10 bg-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center opacity-0 transition-all duration-300 z-[10] text-white no-underline hover:bg-[rgba(254,50,10,0.8)] hover:scale-110"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <h2 className="text-white text-5xl relative z-[9] transition-all duration-300 hover:text-[#fe320a] hover:translate-x-5">
                SWARAJIT DEY AI/ML
              </h2>
            </div>
          </div>
          
          {/* Layout Grid Section */}
          <div className="w-full py-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-center mb-16 bg-gradient-to-br from-white via-[#fe320a] to-white bg-clip-text text-transparent">
              Our Key Features
            </h2>
            <LayoutGrid cards={cards} />
          </div>
        </div>

        {/* Page 4 - Swiper Section */}
      

        {/* Page 5 - Cure Buttons */}
        <div id="page5" className="min-h-screen w-full bg-black py-[8vw] px-[2vw] flex items-center justify-center">
          <div className="cure-buttons w-full max-w-[1200px] text-center">
            <h2 className="text-[4rem] mb-4 bg-gradient-to-br from-white via-[#fe320a] to-white bg-clip-text text-transparent">
              Access Our Solutions
            </h2>
            <div className="buttons-container grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <Link to="/dashboard" className="cure-btn dementia-btn block py-12 px-8 bg-[rgba(255,255,255,0.05)] border-2 border-[#ffffff3c] rounded-[20px] no-underline transition-all duration-400 relative overflow-hidden hover:-translate-y-2.5 hover:border-[#a855f7] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                <h3 className="text-[1.8rem] text-white relative z-[2] transition-all duration-300 hover:text-white">
                  DEMENTIA CURE
                </h3>
              </Link>
              <a href="#" rel="noopener noreferrer" className="cure-btn epilepsy-btn block py-12 px-8 bg-[rgba(255,255,255,0.05)] border-2 border-[#ffffff3c] rounded-[20px] no-underline transition-all duration-400 relative overflow-hidden hover:-translate-y-2.5 hover:border-[#3b82f6] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                <h3 className="text-[1.8rem] text-white relative z-[2] transition-all duration-300 hover:text-white">
                  EPILEPSY CURE
                </h3>
              </a>
              <a href="#"  rel="noopener noreferrer" className="cure-btn speech-btn block py-12 px-8 bg-[rgba(255,255,255,0.05)] border-2 border-[#ffffff3c] rounded-[20px] no-underline transition-all duration-400 relative overflow-hidden hover:-translate-y-2.5 hover:border-[#ec4899] hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                <h3 className="text-[1.8rem] text-white relative z-[2] transition-all duration-300 hover:text-white">
                  SPEECH DISORDER CURE
                </h3>
              </a>
            </div>
          </div>
        </div>

        {/* Full Screen Menu */}
        <div id="full-scr" className="h-screen w-full bg-[#00000070] fixed z-[99] top-[-100%] transition-transform duration-400">
          <div id="full-div1" className="h-1/2 w-full bg-black rounded-bl-[20px] rounded-br-[20px]" />
        </div>
      </div>

      {/* Footer */}
      <div id="footer" className="h-[105vh] w-full bg-black text-white fixed bottom-0 z-[9] flex justify-end flex-col p-[1vw_3vw]">
        <div id="footer-div" className="h-[20vh] w-full bg-red-500" />
        <h1 className="text-[23vw] bg-gradient-to-br from-white via-[#fe320a] to-white bg-clip-text text-transparent bg-size-200-200 animate-gradient-move">
          UnseenCare 
        </h1>
        <h4> Made by team Accers</h4>
        <div id="footer-bottom" className="border-t border-[#dadada] h-[10vh] w-full" />
      </div>
    </div>
  );
};

export default Home;
