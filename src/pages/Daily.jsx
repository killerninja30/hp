import React, { useState } from 'react';
import '../css/Daily.css'; // We'll create this CSS file next

function Daily() {
  // Define the initial state for your checklist items
  // This structure allows for categories and tasks within them.
  const [checklist, setChecklist] = useState([
    {
      category: 'Safety',
      tasks: [
        { id: 's1', text: 'Complete a visual of all Interlock Guards.', comments: '', completed: false },
        { id: 's2', text: 'Complete a visual of all Fixed Guards', comments: '', completed: false },
        { id: 's3', text: 'Ensure step ladder is firmly grounded', comments: '', completed: false },
        { id: 's4', text: 'Check for worn and slippery treads', comments: '', completed: false },
        { id: 's5', text: 'Check the treads are secured to the rungs', comments: '', completed: false },
        { id: 's6', text: 'Check the stability by looking at the welds', comments: '', completed: false },
        { id: 's7', text: 'If hand rail present, check for damage', comments: '', completed: false },
        { id: 's8', text: 'Check for missing or loose bolts', comments: '', completed: false },
      ],
    },
    {
      category: 'Quality',
      tasks: [
        { id: 'q1', text: 'Have the Check Weighing scales been verified as working accurately - 10kg Weight', comments: '', completed: false },
      ],
    },
    {
      category: 'Sort',
      tasks: [
        { id: 'so1', text: 'Has the area been cleared of all rubbish?', comments: '', completed: false },
      ],
    },
    // Add more categories and tasks as needed
  ]);

  // Handler for when a checkbox is clicked
  const handleCheckboxChange = (categoryId, taskId) => {
    setChecklist(prevChecklist => 
      prevChecklist.map(categoryItem => {
        if (categoryItem.category === categoryId) {
          return {
            ...categoryItem,
            tasks: categoryItem.tasks.map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            ),
          };
        }
        return categoryItem;
      })
    );
  };

  // Handler for when text in a comment field changes
  const handleCommentChange = (categoryId, taskId, newComment) => {
    setChecklist(prevChecklist => 
      prevChecklist.map(categoryItem => {
        if (categoryItem.category === categoryId) {
          return {
            ...categoryItem,
            tasks: categoryItem.tasks.map(task =>
              task.id === taskId ? { ...task, comments: newComment } : task
            ),
          };
        }
        return categoryItem;
      })
    );
  };

  // Handler for saving the checklist (for demonstration)
  const handleSaveChecklist = () => {
    // In a real application, you would send this data to a backend server
    console.log("Saving Checklist:", checklist);
    alert("Checklist saved! (Check console for data)");
  };

  return (
    <div className="daily-checklist-container">
      <div className="header">
        <h1>Daily Checklist</h1>
        <button className="save-button" onClick={handleSaveChecklist}>Save Checklist</button>
      </div>

      <div className="checklist-table">
        {/* Table Header */}
        <div className="table-header">
          <div className="header-task">Task</div>
          <div className="header-comments">Comments</div>
          <div className="header-fill">Fill</div>
        </div>

        {/* Render Categories and Tasks */}
        {checklist.map(categoryItem => (
          <React.Fragment key={categoryItem.category}>
            {/* Category Row */}
            <div className="category-row">
              <div className="category-name">{categoryItem.category}</div>
              <div></div> {/* Empty for comments */}
              <div></div> {/* Empty for fill */}
            </div>

            {/* Tasks within the category */}
            {categoryItem.tasks.map(task => (
              <div className="task-row" key={task.id}>
                <div className="task-text">{task.text}</div>
                <div className="task-comments">
                  <input
                    type="text"
                    value={task.comments}
                    placeholder="Comments..."
                    onChange={(e) => handleCommentChange(categoryItem.category, task.id, e.target.value)}
                  />
                </div>
                <div className="task-fill">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(categoryItem.category, task.id)}
                  />
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Daily