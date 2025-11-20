/**
 * @llm-instructions
 * - Comment all logical blocks with `// ****`
 * - Wrap all console logs in `*** ... ***`
 * - Do not modify file structure
 */

import { useState } from "react";
import "./AddTaskModal.css";

const AddTaskModal = ({ onAddTask, onClose, editingTask }) => {
  // fields
  const [title, setTitle] = useState(editingTask ? editingTask.title : "");
  const [desc, setDesc] = useState(editingTask ? editingTask.description : "");
  const [chosenUser, setChosenUser] = useState(
    editingTask ? editingTask.assignee : null
  );
  const [level, setLevel] = useState(
    editingTask ? editingTask.priority : "medium"
  );
  const [pickedTags, setPickedTags] = useState(
    editingTask ? editingTask.tags : []
  );

  const allUsers = [
    { name: "Sarah Johnson", initials: "SJ" },
    { name: "Mike Chen", initials: "MC" },
    { name: "Alex Rodriguez", initials: "AR" },
    { name: "Emily Davis", initials: "ED" },
    { name: "Jordan Smith", initials: "JS" },
  ];

  const tagOptions = [
    "FE Work",
    "BE Work",
    "Design Work",
    "Testing",
    "Security",
    "DevOps",
    "Documentation",
  ];

  const toggleTag = (tg) => {
    setPickedTags((prev) =>
      prev.includes(tg)
        ? prev.filter((x) => x !== tg)
        : [...prev, tg]
    );
  };

  // submit 5 arguments
  const submitForm = (e) => {
    e.preventDefault();

    onAddTask(
      title,
      desc,
      chosenUser,
      level,
      pickedTags
    );
  };

  const backdropClose = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={backdropClose}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={submitForm} className="task-form">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter title"
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              placeholder="Enter description"
            ></textarea>
          </div>

          {/* Assignee */}
          <div className="form-group">
            <label htmlFor="assignee">Assignee</label>
            <select
              id="assignee"
              value={chosenUser ? chosenUser.name : ""}
              onChange={(e) => {
                const user = allUsers.find((u) => u.name === e.target.value);
                setChosenUser(user || null);
              }}
              required
            >
              <option value="">Select user</option>
              {allUsers.map((u) => (
                <option key={u.name} value={u.name}>
                  {u.name} ({u.initials})
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Tags */}
          <div className="form-group">
            <label>Tags</label>
            <div className="tags-container">
              {tagOptions.map((tg) => (
                <button
                  key={tg}
                  type="button"
                  className={`tag-option ${
                    pickedTags.includes(tg) ? "selected" : ""
                  }`}
                  onClick={() => toggleTag(tg)}
                >
                  {tg}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button
              type="submit"
              className="submit-btn"
              disabled={!title.trim() || !desc.trim() || !chosenUser}
            >
              {editingTask ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
