function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 absolute top-2 right-2"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
