type Props = {
  title: string;
  body: string;
  loading: boolean;
  onTitleChange: (value: string) => void;
  onBodyChange: (value: string) => void;
  onAddTask: () => void;
};

function TaskForm({
  title,
  body,
  loading,
  onTitleChange,
  onBodyChange,
  onAddTask,
}: Props) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Add Task</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Description"
        value={body}
        onChange={(e) => onBodyChange(e.target.value)}
      />
      <br />
      <button onClick={onAddTask} disabled={loading} style={{ cursor: loading ? "not-allowed" : "pointer" }}>
        {loading ? "Wait..." : "Add Task"}
      </button>
    </div>
  );
}

export default TaskForm;