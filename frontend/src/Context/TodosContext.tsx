import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface TodoType {
  _id?: string;
  task: string;
  isCompleted: boolean;
}

interface TodoContextType {
  todos: TodoType[];
  editTask: string;
  addTodo: (task: string) => void;
  handleStatus: (id: TodoType) => void;
  handleDelete: (id: string) => void;
  handleEdit: (edit: TodoType) => void;
  handleUpdate: (task: string, id: string) => void;
}

const initialTodoContext: TodoContextType = {
  todos: [],
  editTask: "",
  addTodo: () => {},
  handleStatus: () => {},
  handleDelete: () => {},
  handleEdit: () => {},
  handleUpdate: () => {},
};

const TodoContext = createContext<TodoContextType>(initialTodoContext);

export const TodoContextProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [editTask, setEditTask] = useState<string>("");

  const getTodos = async () => {
    try {
      let url = "http://localhost:3000/todos";
      let data = await fetch(url);
      let todos = await data.json();
      setTodos(todos);
    } catch (error) {
      console.log("Failed getting todos");
      console.log(error);
    }
  };

  const addTodo = async (task: string) => {
    try {
      const todo: TodoType = {
        task,
        isCompleted: false,
      };

      let url = "http://localhost:3000/todos";

      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      await getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (todo: TodoType) => {
    try {
      let url = `http://localhost:3000/todos/${todo._id}`;
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted: !todo.isCompleted }),
      });
      await getTodos();
    } catch (error) {
      console.log("Failed deleting todo");
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      let url = `http://localhost:3000/todos/${id}`;
      await fetch(url, {
        method: "DELETE",
      });
      await getTodos();
    } catch (error) {
      console.log("Failed deleting todo");
      console.log(error);
    }
  };

  const handleEdit = (edit: TodoType) => {
    setEditTask(edit._id as string);
  };

  const handleUpdate = async (task: string, id: string) => {
    try {
      let url = `http://localhost:3000/todos/${id}`;
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task }),
      });
      await getTodos();
      setEditTask(""); // Reset editTask to empty "" after updating
    } catch (error) {
      console.log("Failed deleting todo");
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

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
