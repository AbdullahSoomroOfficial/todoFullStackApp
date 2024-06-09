import { Button, Flex, HStack, Heading, Input, VStack } from "@chakra-ui/react";
import React, { FormEvent, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Tasks from "./Tasks";
import { useTodos } from "../Context/TodosContext";

const Todos: React.FC = () => {
  const { addTodo, editTask, handleUpdate } = useTodos();
  const [task, setTask] = useState("");

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (task) {
      if (editTask) {
        handleUpdate(task);
      } else {
        addTodo(task);
      }
      setTask("");
    }
  };

  useEffect(() => {
    if (editTask) {
      setTask(editTask.task);
    }
  }, [editTask]);

  return (
    <Flex
      justify={"center"}
      align={"center"}
      minH={"100vh"}
      bg={"purple.800"}
      color={"white"}
    >
      <VStack rounded={10} p={5} gap={5} w={"40%"}>
        <Heading>TODO REACT + TYPESCRIPT</Heading>
        <Navbar />
        <HStack as="form" w={"full"} gap={2} onSubmit={handleSubmit}>
          <Input
            placeholder="write your tasks here"
            rounded={16}
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button type="submit">{editTask ? "Update" : "Add"}</Button>
        </HStack>
        <Tasks />
      </VStack>
    </Flex>
  );
};

export default Todos;
