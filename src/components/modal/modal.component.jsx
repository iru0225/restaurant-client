import React from 'react';
import ReactDom from 'react-dom';
import  ClickAwayListener from 'react-click-away-listener';
import './modal.style.scss';

const Modal = ({open, onClose, children}) => {
    if(!open) return null;

    return ReactDom.createPortal(
        <>
            <div className="modal-overlay"/>
            <ClickAwayListener onClickAway={onClose}>
                <div className="modal-content">
                    <button className="close-modal" onClick={onClose}>&times;</button>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </ClickAwayListener>
        </>, document.getElementById('portal')
    )
}

export default Modal;