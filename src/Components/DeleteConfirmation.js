import React from 'react';

function DeleteConfirmation({ taskName, onConfirm, onCancel }) {
    return (
      <div className="slds-modal slds-fade-in-open">
        <div className="slds-modal__container">
          <header className="slds-modal__header slds-theme_error slds-theme_alert-texture">
            <h2 className="slds-text-heading_medium">Delete</h2>
          </header>
          <div className="slds-modal__content slds-p-around_medium">
            <p>Do you want to delete task "{taskName}"?</p>
          </div>
          <footer className="slds-modal__footer">
            <button className="slds-button slds-button_neutral" onClick={onCancel}>No</button>
            <button className="slds-button slds-button_destructive" onClick={onConfirm}>Yes</button>
          </footer>
        </div>
      </div>
    );
  }
  
  export default DeleteConfirmation;