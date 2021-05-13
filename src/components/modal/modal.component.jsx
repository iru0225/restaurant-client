import React from 'react';
import ReactDom from 'react-dom';
import './modal.style.scss';

const Modal = ({open, onClose, children}) => {
    if(!open) return null;

    return ReactDom.createPortal(
        <>
            <div className="modal-overlay"/>
                <div className="modal-content">
                    <button className="close-modal" onClick={onClose}>&times;</button>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
        </>, document.getElementById('portal')
    )
}

export default Modal;