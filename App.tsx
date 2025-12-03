import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Rocket, BookOpen, Brain, Cloud, Coins, ChevronRight, Star, User } from 'lucide-react';
import { COURSES, APP_NAME } from './constants';
import { Course, CartItem } from './types';
import CartDrawer from './components/CartDrawer';
import RegistrationModal from './components/RegistrationModal';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState<'home' | 'courses'>('home');

  const addToCart = (course: Course) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === course.id);
      if (exists) {
        return prev.map(item => item.id === course.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...course, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    alert("This would proceed to a Stripe/Payment gateway integration.");
    setCartItems([]);
    setIsCartOpen(false);
  };

  // --- Views ---

  const Hero = () => (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 text-center">
        <div className="inline-block mb-4 px-4 py-1 rounded-full bg-gray-800 border border-gray-700 text-sm text-brand-primary font-medium">
          Now enrolling for Fall 2024 Cohorts
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          We Don't Teach History.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
            We Teach The Future.
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Move your child from a consumer of technology to an architect of the future economy. 
          Master Finance, AI, and Cloud Computing through building, not lectures.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setActiveSection('courses')}
            className="px-8 py-4 bg-brand-primary hover:bg-blue-600 text-white rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2"
          >
            Explore Tracks <ChevronRight size={20} />
          </button>
          <button 
            onClick={() => setIsRegModalOpen(true)}
            className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 rounded-lg font-bold text-lg transition-all"
          >
            Register Interest
          </button>
        </div>
      </div>
    </div>
  );

  const Features = () => (
    <div className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Rocket className="text-brand-accent" size={40} />, 
              title: "Learn by Building", 
              desc: "No lectures longer than 15 minutes. Students build real wallets, cloud servers, and AI agents." 
            },
            { 
              icon: <Coins className="text-brand-success" size={40} />, 
              title: "New Economy Skills", 
              desc: "Understanding wealth generation in the digital age. Crypto, DeFi, and Startups." 
            },
            { 
              icon: <User className="text-brand-primary" size={40} />, // Using Lucide component differently or replacing
              title: "Parent Co-Pilots", 
              desc: "Parents join the last 15 mins. See what your child built and learn a bit yourself." 
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-brand-primary/50 transition-colors">
              <div className="mb-6 bg-gray-900 w-16 h-16 rounded-lg flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CourseCatalog = () => (
    <div className="py-20 container mx-auto px-4" id="courses">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Curriculum Tracks</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Designed for future innovators. Select a track to begin your journey.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {COURSES.map((course) => (
          <div key={course.id} className="group bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-brand-primary/50 hover:shadow-2xl hover:shadow-brand-primary/30 hover:scale-[1.02] transition-all duration-300 flex flex-col">
            <div className="h-64 relative overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider border border-white/10">
                {course.type}
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{course.title}</h3>
                  <p className="text-brand-primary font-medium">{course.subtitle}</p>
                </div>
                <div className="text-2xl font-bold text-white">€{course.price}</div>
              </div>
              
              <p className="text-gray-400 mb-6">{course.description}</p>
              
              <div className="space-y-4 mb-8 flex-1">
                {course.modules.map((mod, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-1 min-w-[24px] h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs text-white font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">{mod.title}</h4>
                      <p className="text-xs text-gray-500">{mod.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mt-auto">
                <button 
                  onClick={() => addToCart(course)}
                  className="flex-1 bg-white text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Enroll Now
                </button>
                <button 
                  onClick={() => alert(`Showing details for ${course.title}... In a real app, this opens a detailed page.`)}
                  className="px-4 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-primary selection:text-white">
      {/* Navbar */}
      <nav className="fixed w-full z-40 bg-brand-dark/80 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setActiveSection('home')}
          >
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
              <span className="font-bold text-white">F</span>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">{APP_NAME}</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setActiveSection('home')} className={`text-sm font-medium hover:text-white transition-colors ${activeSection === 'home' ? 'text-white' : 'text-gray-400'}`}>Home</button>
            <button onClick={() => setActiveSection('courses')} className={`text-sm font-medium hover:text-white transition-colors ${activeSection === 'courses' ? 'text-white' : 'text-gray-400'}`}>Courses</button>
            <button onClick={() => setIsRegModalOpen(true)} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Register Interest</button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              className="relative p-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-brand-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2 text-gray-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-b border-gray-800 p-4 space-y-4">
            <button onClick={() => { setActiveSection('home'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-300 py-2">Home</button>
            <button onClick={() => { setActiveSection('courses'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-300 py-2">Courses</button>
            <button onClick={() => { setIsRegModalOpen(true); setIsMenuOpen(false); }} className="block w-full text-left text-brand-primary font-bold py-2">Register Interest</button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        {activeSection === 'home' && (
          <>
            <Hero />
            <Features />
          </>
        )}
        {(activeSection === 'courses' || activeSection === 'home') && (
           <div ref={(el) => { if (activeSection === 'courses' && el) el.scrollIntoView({ behavior: 'smooth' }) }}>
             <CourseCatalog />
           </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p className="mb-4">&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Parent Guide</a>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemove={removeFromCart} 
        onCheckout={handleCheckout} 
      />
      
      <RegistrationModal 
        isOpen={isRegModalOpen} 
        onClose={() => setIsRegModalOpen(false)} 
      />

      <ChatWidget />
    </div>
  );
};

export default App;