import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Menu, X, Rocket, BookOpen, Brain, Cloud, Coins, ChevronRight, Star, User } from 'lucide-react';
import { COURSES, APP_NAME } from './constants';
import { Course, CartItem } from './types';
import CartDrawer from './components/CartDrawer';
import RegistrationModal from './components/RegistrationModal';
import ChatWidget from './components/ChatWidget';
import CourseDetailsModal from './components/CourseDetailsModal';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState<'home' | 'courses' | 'about'>('home');

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
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden min-h-[80vh] flex items-center bg-brand-dark">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=2000&q=80" 
          alt="Futuristic Digital City" 
          className="w-full h-full object-cover opacity-50 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/70 to-brand-dark"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="font-bold tracking-tight mb-6 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
          <span className="text-3xl md:text-5xl text-purple-500 block mb-2">We Don't Teach History.</span>
          <span className="text-5xl md:text-7xl text-white block">We Teach The Future.</span>
        </h1>
        <p className="text-xl text-blue-300 max-w-3xl mx-auto mt-12 mb-10 leading-relaxed font-medium drop-shadow-lg">
          <span className="text-lime-400 font-bold text-xl font-mono terminal-cursor">Move your child from a consumer of technology to a master of the digital era</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => document.getElementById('focus')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-brand-accent hover:bg-brand-accent/80 text-white rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2"
          >
            Our Focus
          </button>
          <button 
            onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 border border-gray-700"
          >
            Explore Tracks <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  const Features = () => (
    <div className="pt-4 pb-20 bg-gray-900/50 scroll-mt-24" id="focus">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { 
              icon: <Coins className="text-brand-success" size={32} />, 
              title: "Master the Wealth of Tomorrow", 
              desc: "Empower your child to master the new economy. From Bitcoin to global markets, we turn digital complexity into a competitive head start" 
            },
            { 
              icon: <Cloud className="text-brand-primary" size={32} />, 
              title: "From App User to App Engineer", 
              desc: "Stop just using tech. Start building it. We pull back the curtain on the code and data powering the digital world. Students learn the mechanics of the Cloud and Servers to understand how the future is actually built" 
            },
            { 
              icon: <Brain className="text-brand-accent" size={32} />, 
              title: "AI through the Core Sciences", 
              desc: "The most \"magical\" technologies are actually built on the foundations of Math and Physics > We show students how the logic they learn in the classroom becomes the engine for AI models and future tech landscapes. " 
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-gray-900 p-8 rounded-2xl border-2 border-gray-700 hover:border-brand-primary/50 transition-colors flex flex-col gap-6 h-full font-google">
              <div className="flex items-center gap-4">
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                  className="bg-gray-900 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg shrink-0"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setActiveSection('courses')}
            className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 border border-gray-700"
          >
            Explore Tracks <ChevronRight size={20} />
          </button>
          <button 
            onClick={() => setIsRegModalOpen(true)}
            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-lg transition-all"
          >
            Register Interest
          </button>
        </div>
      </div>
    </div>
  );

  const CourseCatalog = () => (
    <div className="py-20 container mx-auto px-4 scroll-mt-24" id="courses">
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
                  <h3 className="text-3xl font-bold text-cyan-400">{course.title}</h3>
                  <p className="text-purple-500 font-bold text-xl">{course.subtitle}</p>
                </div>
                <div className="text-2xl font-bold text-white">€{course.price}</div>
              </div>
              
              <div className="mb-6 flex-1">
                <p className="text-white font-bold whitespace-pre-line line-clamp-[12]">
                  {course.description.split('Why This Course Matters Today').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && <span className="text-yellow-400">Why This Course Matters Today</span>}
                    </React.Fragment>
                  ))}
                </p>
              </div>

              <div className="flex gap-4 mt-auto">
                <button 
                  onClick={() => addToCart(course)}
                  className="flex-none px-6 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Enroll Now
                </button>
                <button 
                  onClick={() => setSelectedCourse(course)}
                  className="flex-1 px-4 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-bold"
                >
                  What's inside this track?
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AboutUs = () => {
    const highlightTuigim = (text: string) => {
      const parts = text.split(/(Tuigim)/g);
      return parts.map((part, i) => 
        part === 'Tuigim' ? <span key={i} className="text-purple-500 font-bold">Tuigim</span> : part
      );
    };

    return (
      <div className="py-24 container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">About {highlightTuigim('Tuigim')}: Elevating the Next Generation</h2>
          
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed mb-16">
            <p>
              Today’s children are digital natives - experts at consuming technology. Yet few understand key real work topics that are defining today’s digital era and their future careers - decentralized finance, AI logic, and cloud infrastructure.
            </p>
            <p>
              {highlightTuigim('Tuigim')} is the bridge. We aim to close the gap between being a user and being a creator. Our platform empowers the next generation with the technical mastery and financial literacy they need. At {highlightTuigim('Tuigim')}, we don't just prepare your child for the new economy—we give them the tools to build it.
            </p>
            <p>
              At {highlightTuigim('Tuigim')}, we recognize that we are living through an era of unprecedented digital transformation. While traditional education provides the essential foundations, the global economy is evolving at a pace that is difficult for any standard curriculum to match.
            </p>
            <p>
              Our name, derived from the Irish word <span className="text-purple-500 font-bold italic">tuigim</span> ("I understand"), reflects our core mission: to move students from a state of passive consumption to one of deep, functional understanding. Our expertise lies in the critical pillars of the future—Decentralized Finance, Cloud Architecture, and Artificial Intelligence. By bringing industry-level insights into the learning environment, {highlightTuigim('Tuigim')} complements your child’s school education with high-impact, real-world skills. We don't just teach technology; we provide the context and the tools for students to navigate a fast-changing world with confidence and mastery.
            </p>
          </div>

          <h3 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h3>
          
          <div className="space-y-8">
            {[
              {
                q: "1. Are these topics too advanced for my child?",
                a: "Not at all. We specialize in \"Layered Learning.\" We take complex concepts like Cloud Infrastructure or Blockchain and break them down into relatable metaphors and interactive visual building blocks. We don't use jargon to confuse; we use demonstrations to clarify. If they can navigate a smartphone, they can learn how the Cloud powers it."
              },
              {
                q: "2. Is this just another coding bootcamp?",
                a: "No. Coding is only one piece of the puzzle. Tuigim focuses on the full ecosystem. We teach the \"Why\" and \"How\" behind the tech:",
                sub: [
                  { t: "The Physics & Math:", d: "The core logic that makes AI possible." },
                  { t: "The Infrastructure:", d: "Where data actually lives (Cloud & Storage)." },
                  { t: "The Economy:", d: "How value is traded in a digital world (Fintech & Bitcoin)." }
                ]
              },
              {
                q: "3. How do you keep students engaged?",
                a: "We replace long lectures with interactive \"Build-Sessions.\" Instead of just hearing about market volatility, students participate in trading simulations. Instead of reading about servers, they see how apps are hosted. We treat every student like a junior architect, giving them the agency to experiment and create in every class."
              },
              {
                q: "4. Will this help them in school?",
                a: "Yes—by giving schoolwork a purpose. Many students struggle with Math or Physics because they don't see the real-world application. At Tuigim, we show them how a physics equation governs an AI model or how math secures a Bitcoin transaction. When they see the \"career-value\" of these subjects, their engagement in school often skyrockets."
              }
            ].map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700"
              >
                <h4 className="text-xl font-bold text-cyan-400 mb-4">{faq.q}</h4>
                <p className="text-gray-300 leading-relaxed">{highlightTuigim(faq.a)}</p>
                {faq.sub && (
                  <div className="mt-6 space-y-4 ml-4">
                    {faq.sub.map((s, i) => (
                      <div key={i}>
                        <span className="text-purple-500 font-bold block">{s.t}</span>
                        <span className="text-gray-400">{s.d}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-primary selection:text-white">
      {/* Navbar */}
      <nav className="fixed w-full z-40 bg-brand-dark/80 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setActiveSection('home')}
          >
            <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center">
              <span className="font-bold text-white">T</span>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block flex items-center gap-2">
              <span className="text-purple-500 font-extrabold text-2xl">Tuigim</span>
              <span className="text-white"> - The Technology Learning Place</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setActiveSection('home')} className={`text-sm font-medium hover:text-white transition-colors ${activeSection === 'home' ? 'text-white' : 'text-gray-400'}`}>Home</button>
            <button onClick={() => setActiveSection('courses')} className={`text-sm font-medium hover:text-white transition-colors ${activeSection === 'courses' ? 'text-white' : 'text-gray-400'}`}>Courses</button>
            <button onClick={() => setActiveSection('about')} className={`text-sm font-medium hover:text-white transition-colors ${activeSection === 'about' ? 'text-white' : 'text-gray-400'}`}>About Us</button>
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
            <button onClick={() => { setActiveSection('about'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-300 py-2">About Us</button>
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
            <CourseCatalog />
          </>
        )}
        {activeSection === 'courses' && <CourseCatalog />}
        {activeSection === 'about' && <AboutUs />}
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

      <CourseDetailsModal 
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnroll={addToCart}
      />

      <ChatWidget />
    </div>
  );
};

export default App;