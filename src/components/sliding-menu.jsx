"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Leaf, Home, Info, Settings } from "lucide-react"

export default function SlidingMenu({ isOpen, onClose, setCurrentPage, currentPage }) {
  // Add effect to prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const menuItems = [
    { label: "Home", page: "home", icon: <Home className="h-5 w-5 mr-3 text-green-600" /> },
    { label: "About", page: "about", icon: <Info className="h-5 w-5 mr-3 text-green-600" /> },
    { label: "Settings", page: "settings", icon: <Settings className="h-5 w-5 mr-3 text-green-600" /> },
  ];

  const handleNavigation = (page) => {
    setCurrentPage(page);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Menu panel */}
      <div 
        className={`fixed top-0 right-0 h-full bg-white z-50 w-[80%] max-w-[300px] shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header with close button */}
          <div className="p-4 border-b flex justify-between items-center bg-green-50">
            <div className="flex items-center">
              <Leaf className="h-7 w-7 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-green-800">Menu</h2>
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-green-100" onClick={onClose}>
              <X className="h-6 w-6 text-green-700" />
            </Button>
          </div>
          
          {/* Menu items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => handleNavigation(item.page)}
                    className={`w-full flex items-center text-left p-3 rounded-md transition-colors ${
                      currentPage === item.page 
                        ? 'bg-green-100 text-green-800' 
                        : 'hover:bg-green-50 text-gray-700 hover:text-green-800'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t bg-green-50">
            <p className="text-sm text-green-700 text-center">© 2023 Potato Tuber Classification</p>
          </div>
        </div>
      </div>
    </>
  );
}
