import React from 'react';
import { X, Trash2, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="h-full w-full bg-gray-900 border-l border-gray-700 shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white">Your Cart</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                <CreditCard size={48} />
                <p>Your cart is empty.</p>
                <button onClick={onClose} className="text-brand-primary hover:underline">
                  Browse Courses
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.subtitle}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-brand-success font-mono">€{item.price}</span>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-800 bg-gray-900">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">Total</span>
                <span className="text-2xl font-bold text-white">€{total.toFixed(2)}</span>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full bg-brand-primary hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard size={20} />
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;