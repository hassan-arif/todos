import React from 'react'
import { Text, View } from 'react-native';
import { SafeScreen } from '@/components/templates'
import { useTheme } from '@/theme';

import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '@/store/todoSlice';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(); //Ignore all log notifications

function Todo() {
  const { layout, gutters, fonts
  } = useTheme();

  const todos = useSelector(state => state.todos.todoList);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <SafeScreen>
      <View
        style={[
          layout.fullHeight,
          gutters.paddingHorizontal_12,
          { backgroundColor: 'black' },
        ]}
      >
        <Text style={[fonts.gray200, fonts.size_24, fonts.bold]}>
          {todos.length}
          {console.log(todos[0])}
        </Text>
      </View>
    </SafeScreen>
  )
}

export default Todo