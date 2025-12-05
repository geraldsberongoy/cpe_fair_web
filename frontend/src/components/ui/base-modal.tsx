import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, LucideIcon } from "lucide-react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
};

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  icon: Icon,
  children,
  maxWidth = "md",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 bg-[#0c0e16]/90 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-200"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={onClose}
    >
      <div
        className={`bg-[#1e2130] border-2 border-[#d3bc8e]/40 rounded-[2rem] w-full ${maxWidthClasses[maxWidth]} overflow-hidden shadow-[0_0_50px_rgba(211,188,142,0.1)] relative max-h-[90vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#161822] p-6 flex justify-between items-center border-b border-[#d3bc8e]/20 sticky top-0 z-30">
          <h2 className="text-xl font-serif font-bold text-[#d3bc8e] tracking-widest uppercase flex items-center gap-3">
            {Icon && <Icon size={24} />}
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-[#8a8d99] hover:text-[#ece5d8] transition-colors bg-[#2d3042] p-2 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default BaseModal;
