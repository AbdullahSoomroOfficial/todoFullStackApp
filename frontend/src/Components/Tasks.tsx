import { Button, Checkbox, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { TodoType, useTodos } from "../Context/TodosContext";
import { useParams } from "react-router";
import { BsPencilSquare } from "react-icons/bs";
import { FaDeleteLeft } from "react-icons/fa6";

const Tasks: React.FC = () => {
  let filterTodos: TodoType[] = [];
  const { todos, handleStatus, handleDelete, handleEdit } = useTodos();

  const { status } = useParams();

  if (status == "completed") {
    filterTodos = todos.filter((item) => item.isCompleted);
  } else if (status == "active") {
    filterTodos = todos.filter((item) => !item.isCompleted);
  } else {
    filterTodos = todos;
  }

  return (
    <VStack gap={0} as="ul" w={"full"} minH={100} maxH={220} overflowY={"auto"}>
      {filterTodos.map((item, key) => (
        <HStack
          cursor={"pointer"}
          transition={"all .3s linear"}
          _hover={{ backgroundColor: "purple.900" }}
          as="li"
          w={"full"}
          gap={10}
          justify={"space-around"}
          borderTop={key == 0 ? "1px solid gray" : undefined}
          borderBottom={"1px solid gray"}
          p={2}
          key={key}
        >
          <Checkbox
            colorScheme="purple"
            flexShrink={0}
            isChecked={item.isCompleted}
            onChange={() => handleStatus(item.id)}
            id={`box-${item.id}`}
          ></Checkbox>
          <Text
            as="label"
            cursor={"pointer"}
            htmlFor={`box-${item.id}`}
            textTransform="capitalize"
            textDecoration={item.isCompleted ? "line-through" : "none"}
            color={item.isCompleted ? "red.400" : "white"}
            flex={1}
            textAlign="justify"
          >
            {item.task}
          </Text>
          <HStack>
            <Button
              size={"sm"}
              colorScheme="green"
              flexShrink={0}
              onClick={() => handleEdit(item)}
            >
              <BsPencilSquare />
            </Button>
            <Button
              size={"sm"}
              colorScheme="red"
              flexShrink={0}
              onClick={() => handleDelete(item.id)}
            >
              <FaDeleteLeft />
            </Button>
          </HStack>
        </HStack>
      ))}
    </VStack>
  );
};

export default Tasks;
