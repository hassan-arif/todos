import { SafeScreen } from '@/components/templates'
import { useTodo } from '@/store/todo'
import React from 'react'

function Todo() {
  const todos = useTodo((state) => state.todos);
  console.log(todos);

  return (
    <SafeScreen>

    </SafeScreen>
  )
}

export default Todo