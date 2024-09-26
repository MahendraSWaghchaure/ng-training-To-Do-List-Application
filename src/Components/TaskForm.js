import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, onCancel, task, title }) {
  const [formData, setFormData] = useState({
    assignedTo: '',
    status: 'Not Started',
    dueDate: '',
    priority: 'Normal',
    description: ''
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation check for required fields
    if (!formData.assignedTo || !formData.status || !formData.priority) {
      alert("Please fill out all required fields.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="slds-modal slds-fade-in-open">
      <div className="slds-modal__container">
        <header className="slds-modal__header">
          <h2 className="slds-text-heading_medium slds-hyphenate">{title}</h2>
        </header>
        <div className="slds-modal__content slds-p-around_medium">
          <form onSubmit={handleSubmit}>
            <div className="slds-form-element">
              <label className="slds-form-element__label" htmlFor="assignedTo">Assigned To <span style={{color: 'red'}}>*</span></label>
              <div className="slds-form-element__control">
                <input
                  type="text"
                  id="assignedTo"
                  name="assignedTo"
                  className="slds-input"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  required // Required field
                />
              </div>
            </div>
            <div className="slds-form-element">
              <label className="slds-form-element__label" htmlFor="status">Status <span style={{color: 'red'}}>*</span></label>
              <div className="slds-form-element__control">
                <select
                  id="status"
                  name="status"
                  className="slds-select"
                  value={formData.status}
                  onChange={handleChange}
                  required // Required field
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="slds-form-element">
              <label className="slds-form-element__label" htmlFor="dueDate">Due Date</label>
              <div className="slds-form-element__control">
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className="slds-input"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="slds-form-element">
              <label className="slds-form-element__label" htmlFor="priority">Priority <span style={{color: 'red'}}>*</span></label>
              <div className="slds-form-element__control">
                <select
                  id="priority"
                  name="priority"
                  className="slds-select"
                  value={formData.priority}
                  onChange={handleChange}
                  required // Required field
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <div className="slds-form-element">
              <label className="slds-form-element__label" htmlFor="description">Description</label>
              <div className="slds-form-element__control">
                <textarea
                  id="description"
                  name="description"
                  className="slds-textarea"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <footer className="slds-modal__footer">
          <button className="slds-button slds-button_neutral" onClick={onCancel}>Cancel</button>
          <button className="slds-button slds-button_brand" onClick={handleSubmit}>Save</button>
        </footer>
      </div>
    </div>
  );
}

export default TaskForm;
