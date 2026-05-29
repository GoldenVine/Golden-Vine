import { useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
}

export function Lightbox({ isOpen, onClose, imageSrc }: LightboxProps) {
  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 md:-right-12 text-white hover:text-gray-300 bg-transparent border-none p-2 cursor-pointer z-50"
          aria-label="Close lightbox"
        >
          <X className="w-8 h-8" />
        </button>
        <img 
          src={imageSrc} 
          alt="Enlarged view" 
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
      </div>
    </div>,
    document.body
  );
}
