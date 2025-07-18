
import React, { useEffect, useState, useRef } from 'react';
import { Wrench, Mail, Settings } from 'lucide-react';

const MaintenancePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const x = (e.clientX - centerX) / rect.width * 20; // Reduced multiplier for subtler effect
        const y = (e.clientY - centerY) / rect.height * 20;
        
        setMousePos({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleTopCogClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000);
  };

  const getTiltStyle = (element: 'top' | 'mail' | 'decorative') => {
    const intensity = element === 'top' ? 0.3 : element === 'mail' ? 0.2 : 0.4;
    return {
      transform: `perspective(1000px) rotateX(${-mousePos.y * intensity}deg) rotateY(${mousePos.x * intensity}deg)`,
      transition: 'transform 0.1s ease-out'
    };
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-fatbike-light via-fatbike-bright to-fatbike-medium">
        <div className="fatbike-bg"></div>
      </div>
      
      {/* Large horizontal circle/arc element */}
      <div className="absolute top-0 left-0 w-full h-64 bg-fatbike-light opacity-30 rounded-b-full transform -translate-y-32"></div>
      
      {/* Main content container */}
      <div ref={containerRef} className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Animated bike icon */}
          <div className={`mb-8 transition-all duration-1000 ${isLoaded ? 'animate-scale-in' : 'opacity-0'}`}>
            <div 
              className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg border-4 border-fatbike-accent animate-pulse-gentle cursor-pointer"
              onClick={handleTopCogClick}
              style={getTiltStyle('top')}
            >
              <Settings className={`w-12 h-12 text-fatbike-dark transition-transform duration-1000 ${isSpinning ? 'rotate-[360deg]' : ''}`} />
            </div>
          </div>

          {/* Main heading with slide-down animation */}
          <h1 className={`text-5xl md:text-7xl font-bold text-fatbike-dark mb-6 font-league-spartan transition-all duration-800 delay-300 ${isLoaded ? 'animate-slide-down' : 'opacity-0'}`}>
            We zijn binnenkort weer terug!
          </h1>

          {/* Subtext with fade-in animation */}
          <div className={`mb-8 transition-all duration-800 delay-500 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            <p className="text-xl md:text-2xl text-fatbike-dark font-medium mb-4 font-league-spartan">
              <span className="text-fatbike-accent font-bold">FatbikeParts.eu</span> is nu niet beschikbaar door persoonlijke redenen.
            </p>
            <p className="text-lg md:text-xl text-fatbike-medium font-league-spartan">
              We zijn binnenkort wel weer terug! Bedankt voor het wachten ;)
            </p>
          </div>

          {/* Contact info with slide-up animation */}
          <div className={`transition-all duration-800 delay-700 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}>
            <div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-fatbike-light"
              style={getTiltStyle('mail')}
            >
              <div className="flex items-center justify-center mb-3">
                <Mail className="w-6 h-6 text-fatbike-accent mr-2" />
                <span className="text-fatbike-dark font-semibold font-league-spartan">Toch Contact nodig?</span>
              </div>
              <a 
                href="mailto:fatbikeparts@gmail.com" 
                className="text-fatbike-accent hover:text-fatbike-dark transition-colors duration-300 font-medium font-league-spartan text-lg hover:underline"
              >
                fatbikeparts@gmail.com
              </a>
            </div>
          </div>

          {/* Decorative elements */}
          <div className={`mt-12 flex justify-center space-x-8 transition-all duration-1000 delay-900 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            <div 
              className="flex items-center justify-center w-12 h-12 bg-fatbike-bright rounded-full shadow-md"
              style={getTiltStyle('decorative')}
            >
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div 
              className="flex items-center justify-center w-12 h-12 bg-fatbike-accent rounded-full shadow-md"
              style={getTiltStyle('decorative')}
            >
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div 
              className="flex items-center justify-center w-12 h-12 bg-fatbike-medium rounded-full shadow-md overflow-hidden"
              style={getTiltStyle('decorative')}
            >
              <img 
                src="/lovable-uploads/503fb88b-1cab-4725-a3eb-2627f71f2f6a.png" 
                alt="FatbikeParts icon" 
                className="w-8 h-8 brightness-0 invert"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom decorative arc */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-fatbike-accent opacity-20 rounded-t-full transform translate-y-16"></div>
    </div>
  );
};

export default MaintenancePage;
