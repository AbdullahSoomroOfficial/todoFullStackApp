import { HStack } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar:React.FC = () => {
  return (
    <HStack w={'full'} justify={'space-between'} color={'gray.400'} borderBottom={'1px solid gray'} pb={2}>
      <NavLink to="/">All</NavLink>
      <NavLink to="/todos/active">Active</NavLink>
      <NavLink to="/todos/completed">Completed</NavLink>
    </HStack>
  )
}

export default Navbar