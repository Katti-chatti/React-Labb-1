import type { Task } from "../types/task.types";
import { useState } from "react";

type Props = {
  task: Task;
  onToggleCompleted: (id: number) => void;
  onToggleImportant: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string, body: string) => void;
}

function TaskItem({ task, onToggleCompleted, onToggleImportant, onDelete, onUpdate }: Props) {
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(task.title)
    const [editBody, setEditBody] = useState(task.body)
    
    const handleSave = () => {
        onUpdate(task.id, editTitle, editBody);
        setIsEditing(false);
};

  return (
  <div
    style={{
      position: "relative",
      border: "1px solid #ccc",
      margin: "10px auto",
      padding: "20px",
      maxWidth: "600px",
       backgroundColor: task.important ? "#fff3cd" : "#f9f9f9",
      borderRadius: "8px"
    }}
  >
    {/* Delete knapp */}
    <button
      onClick={() => onDelete(task.id)}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontSize: "18px"
      }}
    >
      ❌
    </button>

    {isEditing ? (
      <>
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />

        <textarea
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}
        />

        <button onClick={handleSave}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </>
    ) : (
      <>
        
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {task.important && (
            <span style={{ color: "crimson" }}>❗</span>
          )}

          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleCompleted(task.id)} 
            style={{ cursor: "pointer" }}
          />

          <strong
            style={{
              textDecoration: task.completed ? "line-through" : "none"
            }}
          >
            {task.title}
          </strong>
        </div>

        <p style={{ marginTop: "10px" }}>{task.body}</p>

        {/* Prioritisering knapp och edit knapp */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
            justifyContent: "center"
          }}
        >
          <button onClick={() => onToggleImportant(task.id)} style={{ cursor: "pointer" }}>
            {task.important ? "Unmark" : "Mark as important"}
          </button>

          <button onClick={() => setIsEditing(true)} style={{ cursor: "pointer" }}>Edit</button>
        </div>
      </>
    )}
  </div>
);
}

export default TaskItem;