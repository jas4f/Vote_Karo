import React from 'react';
import './Dialog.css';
function Dialog({ isOpen, onClose, onConfirm, message }) {
    if (!isOpen) return null;

    return (
        <div className="dialog-overlay" onClick={onClose}>
            <div className="dialog-box">
                <button className="dialog-close" onClick={onClose}>X</button>
                <h3>{message}</h3>
                <div className="dialog-actions">
                    <button className='yes_btn' onClick={onConfirm}>Yes</button>
                    <button className='no_btn' onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
}

export default Dialog;
