
import React, { useEffect, useState, useRef } from 'react';
import { Wrench, Mail, Settings } from 'lucide-react';

const MaintenancePage = () => {
  console.log('MaintenancePage component mounting...');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('MaintenancePage useEffect running...');
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      console.log('Setting isLoaded to true');
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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        <div className="fatbike-bg"></div>
      </div>
      
      {/* Large horizontal circle/arc element */}
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-300 opacity-30 rounded-b-full transform -translate-y-32"></div>
      
      {/* Main content container */}
      <div ref={containerRef} className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Animated bike icon */}
          <div className={`mb-8 transition-all duration-1000 ${isLoaded ? 'animate-scale-in' : 'opacity-0'}`}>
            <div 
              className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg border-4 border-blue-500 animate-pulse-gentle cursor-pointer"
              onClick={handleTopCogClick}
              style={getTiltStyle('top')}
            >
              <Settings className={`w-12 h-12 text-blue-600 transition-transform duration-1000 ${isSpinning ? 'rotate-[360deg]' : ''}`} />
            </div>
          </div>

          {/* Main heading with slide-down animation */}
          <h1 className={`text-5xl md:text-7xl font-bold text-white mb-6 transition-all duration-800 delay-300 ${isLoaded ? 'animate-slide-down' : 'opacity-0'}`}>
            We zijn binnenkort weer terug!
          </h1>

          {/* Subtext with fade-in animation */}
          <div className={`mb-8 transition-all duration-800 delay-500 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            <p className="text-xl md:text-2xl text-white font-medium mb-4">
              <span className="text-yellow-300 font-bold">FatbikeParts.eu</span> is nu niet beschikbaar door persoonlijke redenen.
            </p>
            <p className="text-lg md:text-xl text-blue-100">
              We zijn binnenkort wel weer terug! Bedankt voor het wachten ;)
            </p>
          </div>

          {/* Contact info with slide-up animation */}
          <div className={`transition-all duration-800 delay-700 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}>
            <div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-200"
              style={getTiltStyle('mail')}
            >
              <div className="flex items-center justify-center mb-3">
                <Mail className="w-6 h-6 text-blue-500 mr-2" />
                <span className="text-gray-800 font-semibold">Toch Contact nodig?</span>
              </div>
              <a 
                href="mailto:fatbikeparts@gmail.com" 
                className="text-blue-600 hover:text-blue-800 transition-colors duration-300 font-medium text-lg hover:underline"
              >
                fatbikeparts@gmail.com
              </a>
            </div>
          </div>

          {/* Decorative elements */}
          <div className={`mt-12 flex justify-center space-x-8 transition-all duration-1000 delay-900 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            <div 
              className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full shadow-md"
              style={getTiltStyle('decorative')}
            >
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div 
              className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full shadow-md"
              style={getTiltStyle('decorative')}
            >
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div 
              className="flex items-center justify-center w-12 h-12 bg-blue-400 rounded-full shadow-md overflow-hidden"
              style={getTiltStyle('decorative')}
            >
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNjM2NjZEIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNGRkZGRkYiPkltYWdlPC90ZXh0Pgo8L3N2Zz4K" 
                alt="FatbikeParts icon" 
                className="w-8 h-8 brightness-0 invert"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom decorative arc */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-yellow-400 opacity-20 rounded-t-full transform translate-y-16"></div>
    </div>
  );
};

export default MaintenancePage;
