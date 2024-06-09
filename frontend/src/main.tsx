import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { TodoContextProvider } from "./Context/TodosContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </ChakraProvider>
);
