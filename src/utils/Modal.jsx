import { useEffect } from "react";

// ✅ Reusable Modal Component
export function Modal({ isOpen, onClose, title, children }) {
  // close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      {/* overlay click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* modal box */}
      <div className="relative bg-white w-full max-w-lg max-h-[80vh] rounded-2xl shadow-xl flex flex-col">
        {/* Header (fixed) */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-4 flex flex-col gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}
