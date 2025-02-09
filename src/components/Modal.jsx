import React from "react";

function Modal({
  isOpen,
  onClose,
  selectedCategories,
  categories,
  descriptions,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose} className="close-button">
          Close
        </button>
        <h2>Selected Categories</h2>
        <ul>
          {selectedCategories.map((category) => {
            const index = categories.indexOf(category);
            return (
              <li key={index}>
                <strong>{category}</strong>: {descriptions[index]}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Modal;
