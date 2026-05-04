import { useEffect, useState } from "react";
import type { Task } from "./types/task.types";
import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [search, setSearch] = useState("");

  //GET - Hämta data
  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError("")

    await new Promise((resolve) => setTimeout(resolve, 1500)); //Extra laddningstid för att se laddningsindikatorn
      
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();

    const mappedTask: Task[] = data.slice(0, 10).map((item: any) => ({
      id: item.id,
      title: item.title,
      body: item.body,
      completed: false,   //Tillagd, finns inte i APIet
      important: false   //Tillagd, finns inte i APIet
    }))

    setTasks(mappedTask)
    } catch (err) {
      setError("Failed to fetch tasks")
    } finally {
      setLoading(false)
    } 
  }

  useEffect(() => {
  fetchTasks()
}, [])

//POST - Skapa en task
const handleAddTask = async () => {
  //Validation - måste ha en titel
  if (!title.trim()) {
    alert("You need a title")
    return
  }

  try {
    setLoading(true)

    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        userId: 1,
      }),
    })

    const data = await res.json()
    //Lokal state
    const newTask: Task = {
      id: data.id,
      title: data.title,
      body: data.body,
      completed: false,
      important: false,
    };
    
    setTasks([newTask, ...tasks])
    setTitle("")
    setBody("")

  } catch (err) {
    setError("Failed to create task")
  } finally {
    setLoading(false)
  }
}

//Toggle för completion
const handleToggleCompleted = (id: number) => {
  const updatedTasks = tasks.map((task) =>
    task.id === id
      ? { ...task, completed: !task.completed } : task
  );

  setTasks(updatedTasks);
};

//Toggle för prioritering
const handleToggleImportant = (id: number) => {
  const updatedTasks = tasks.map((task) =>
    task.id === id
      ? { ...task, important: !task.important } : task
  );

  setTasks(updatedTasks);
};

//DELETE - Ta bort en task
const handleDeleteTask = async (id: number) => {
  const confirmDelete = confirm("Are you sure you want to delete this task?"); //Bekräftelse innan borttagning

  if (!confirmDelete) return;

  try {
    setLoading(true);

    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });

    //Uppdaterar UI
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);

  } catch (err) {
    setError("Failed to delete task");
  } finally {
    setLoading(false);
  }
};

//PUT - Uppdatera en task
const handleUpdateTask = async (id: number, title: string, body: string) => {
  try {
    setLoading(true);

    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        body,
        userId: 1,
      }),
    });

    //Uppdatera lokal state
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title, body } : task
    );

    setTasks(updatedTasks);

  } catch (err) {
    setError("Failed to update task");
  } finally {
    setLoading(false);
  }
};

//Sökfunktion
const filteredTasks = tasks.filter((task) =>
  task.title.toLowerCase().includes(search.toLowerCase())
);

  return (
 <div>
    <h1>Task Manager</h1>
    {error && <p style={{ color: "red" }}>{error}</p>}

    <TaskForm
      title={title}
      body={body}
      loading={loading}
      onTitleChange={setTitle}
      onBodyChange={setBody}
      onAddTask={handleAddTask}
       />

{loading && <p>Loading your tasks please wait...</p>}

<input
  type="text"
  placeholder="Search tasks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{ marginBottom: "20px", padding: "5px" }}
/>

{!loading && filteredTasks.length === 0 && <p>No tasks found</p>}

{filteredTasks.map((task) => (
  <TaskItem
    key={task.id}
    task={task}
    onToggleCompleted={handleToggleCompleted}
    onToggleImportant={handleToggleImportant}
    onDelete={handleDeleteTask}
    onUpdate={handleUpdateTask}
  />
))}

  </div>
  )
}

export default App
