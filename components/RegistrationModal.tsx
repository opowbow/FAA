import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { RegistrationData, CourseType } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({
    parentName: '',
    parentEmail: '',
    childName: '',
    childAge: 10,
    interests: []
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setStep(2);
    }, 1000);
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-gray-900 border border-gray-700 w-full max-w-lg rounded-2xl shadow-2xl p-8 overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white">Join the Future</h2>
              <p className="text-gray-400 mt-2">Register interest for upcoming cohorts.</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Parent Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    value={formData.parentName}
                    onChange={e => setFormData({...formData, parentName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Parent Email</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    value={formData.parentEmail}
                    onChange={e => setFormData({...formData, parentEmail: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Child Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    value={formData.childName}
                    onChange={e => setFormData({...formData, childName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Child Age</label>
                  <input 
                    required
                    type="number" 
                    min={7} max={18}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    value={formData.childAge}
                    onChange={e => setFormData({...formData, childAge: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Interests</label>
                <div className="flex flex-wrap gap-2">
                  {['Finance', 'Crypto', 'AI', 'Coding', 'Robotics'].map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleInterest(tag)}
                      className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                        formData.interests.includes(tag)
                          ? 'bg-brand-primary border-brand-primary text-white'
                          : 'bg-transparent border-gray-600 text-gray-400 hover:border-gray-400'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-brand-accent hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02]"
            >
              Submit Registration
            </button>
          </form>
        ) : (
          <div className="text-center py-12 space-y-4 animate-fade-in-up">
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-white">You're on the list!</h3>
            <p className="text-gray-400">
              Thanks {formData.parentName}. We'll send details for {formData.childName} to {formData.parentEmail} shortly.
            </p>
            <button 
              onClick={onClose}
              className="mt-6 bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;