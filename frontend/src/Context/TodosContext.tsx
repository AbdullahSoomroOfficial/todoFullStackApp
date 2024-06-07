import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface TodoType {
  task: string;
  isCompleted: boolean;
  id: number;
}

interface TodoContextType {
  todos: TodoType[];
  editTask: TodoType | null;
  addTodo: (task: string) => void;
  handleStatus: (id: number) => void;
  handleDelete: (id: number) => void;
  handleEdit: (edit: TodoType) => void;
  handleUpdate: (task: string) => void;
}

const initialTodoContext: TodoContextType = {
  todos: [],
  editTask: null,
  addTodo: () => {},
  handleStatus: () => {},
  handleDelete: () => {},
  handleEdit: () => {},
  handleUpdate: () => {},
};

const TodoContext = createContext<TodoContextType>(initialTodoContext);

export const TodoContextProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  let url = "http://localhost:3000/todos";
  const getTodos = async () => {
    let data = await fetch(url);
    let todos = await data.json();
    setTodos(todos);
  };
  useEffect(() => {
    getTodos();
  }, []);
  const [editTask, setEditTask] = useState<TodoType | null>(null);
  const addTodo = (task: string) => {
    const todo: TodoType = {
      task,
      isCompleted: false,
      id: todos.length + 1,
    };
    const createTodo = async () => {
      let url = "http://localhost:3000/todos";
      try {
        await fetch(url, {
          method: "POST",
          body: JSON.stringify(todo),
        });
        getTodos();
      } catch (error) {
        console.log(error);
      }
    };
    createTodo();
  };

  const handleStatus = (id: number) => {
    const editArr = todos.map((item) =>
      item.id == id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(editArr);
  };

  const handleDelete = (id: number) => {
    const newArr = todos.filter((item) => item.id != id);
    setTodos(newArr);
  };

  const handleEdit = (edit: TodoType) => {
    setEditTask(edit);
  };

  const handleUpdate = (task: string) => {
    const updatedArr = todos.map((item) =>
      item.id === editTask?.id
        ? { ...editTask!, task, isCompleted: false }
        : item
    );
    setTodos(updatedArr);
    setEditTask(null); // Reset editTask to null after updating
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        editTask,
        addTodo,
        handleStatus,
        handleDelete,
        handleEdit,
        handleUpdate,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = (): TodoContextType => {
  return useContext(TodoContext);
};
