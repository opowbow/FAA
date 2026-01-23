import React from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Course } from '../types';

interface CourseDetailsModalProps {
  course: Course | null;
  onClose: () => void;
  onEnroll: (course: Course) => void;
}

const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({ course, onClose, onEnroll }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 w-full max-w-3xl max-h-[90vh] rounded-2xl border border-gray-700 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-start bg-gray-900 sticky top-0 z-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{course.title}</h2>
            <p className="text-brand-primary font-medium text-lg">{course.subtitle}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="mb-8">
            <p className="text-gray-300 text-lg leading-relaxed">{course.description}</p>
          </div>

          <div className="space-y-8">
            <h3 className="text-xl font-bold text-white border-b border-gray-800 pb-2">Detailed Curriculum</h3>
            
            {course.modules.map((mod, idx) => (
              <div key={idx} className="bg-gray-800/50 rounded-xl p-6 border border-gray-800">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-brand-primary/20 text-brand-primary font-bold w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{mod.title}</h4>
                    <p className="text-gray-400 mb-4">{mod.description}</p>
                    
                    {mod.image && (
                      <div className="mb-6 rounded-lg overflow-hidden border border-gray-700">
                        <img 
                          src={mod.image} 
                          alt={mod.title} 
                          className="w-full h-48 object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    
                    {mod.topics && mod.topics.length > 0 && (
                      <div className="grid md:grid-cols-2 gap-3">
                        {mod.topics.map((topic, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-2 text-sm text-gray-300">
                            <CheckCircle size={16} className="text-brand-success shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 bg-gray-900 flex justify-between items-center gap-4">
          <div className="text-white font-bold text-2xl">
            €{course.price}
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-800 font-medium transition-colors"
            >
              Close
            </button>
            <button 
              onClick={() => {
                onEnroll(course);
                onClose();
              }}
              className="px-8 py-3 bg-brand-primary hover:bg-blue-600 text-white rounded-lg font-bold transition-colors shadow-lg shadow-brand-primary/20"
            >
              Enroll Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CourseDetailsModal;
