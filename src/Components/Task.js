import React from 'react';

function Task({ task, onDelete, onEdit }) {
  return (
    <li className="slds-item">
      <div className="slds-grid slds-grid_align-spread">
        <span className="slds-truncate">{task.title}</span>
        <div>
          <button onClick={() => onEdit(task)} className="slds-button slds-button_neutral slds-m-right_xx-small">
            Edit
          </button>
          <button onClick={() => onDelete(task.id)} className="slds-button slds-button_destructive">
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default Task;