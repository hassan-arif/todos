import React from 'react'
import { Dimensions, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { SafeScreen } from '@/components/templates'
import { useTheme } from '@/theme';
import { IconByVariant } from '@/components/atoms';

import { useDispatch, useSelector } from 'react-redux';
import { getTodos, deleteTodos, createTodos, toggleTodos, updateTodos } from '@/store/todoSlice';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(); //Ignore all log notifications

function TodoRTK() {
  const { layout, gutters, fonts, colors, borders
  } = useTheme();

  const deviceWidth = Dimensions.get('window').width;

  const todos = useSelector(state => state.todos.todoList);
  const loading = useSelector(state => state.todos.loading);

  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = React.useState('');

  function renderItem(props: any) {
    const { item } = props
    let listItem = item.title

    return (
      <View style={[ 
        gutters.marginBottom_12
      ]}>
        {item.completed ? (
          <View style={[
            layout.row, 
            layout.justifyBetween, 
            gutters.paddingTop_12
          ]}>
            <Text style={[
              fonts.gray200, 
              fonts.size_16,
              {width: '85%'}
            ]}>{item.title}</Text>

            <View style={[layout.row]}>
              <TouchableOpacity onPress={() => {
                dispatch(toggleTodos({
                  id: item.id,
                  completed: false
                }));
              }} style={[
                gutters.marginRight_12
              ]}>
                <IconByVariant path={'update'} stroke={colors.gray400} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                dispatch(deleteTodos(item.id));
              }}>
                <IconByVariant path={'delete'} stroke={colors.red500} />
              </TouchableOpacity>
            </View>
          </View>

        ) : (

          <View style={[
            borders.rounded_16,
            layout.row, 
            layout.justifyBetween,
            {
              padding: 6,
              paddingTop: 12,
              alignItems: 'center', 
              backgroundColor: '#111111'
            }
          ]}>
            <TextInput
              style={[ 
                fonts.size_16,
                fonts.gray200,
                { margin: 0, padding: 0, borderWidth: 0, width: '85%' },
              ]}
              defaultValue={item.title}
              onChangeText={(text) => {
                listItem = text;
              }}
              autoCorrect={false}
            />

            <View style={[layout.row]}>
              <TouchableOpacity onPress={() => {
                dispatch(updateTodos({
                  id: item.id,
                  title: listItem
                }));
              }} style={[
                gutters.marginRight_12
              ]}>
                <IconByVariant path={'save'} stroke={colors.gray400} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    )
  }

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
        <View>
          <Text style={[fonts.size_32, fonts.gray200, fonts.bold, gutters.marginTop_16, gutters.marginBottom_16]}>Todo List ({todos.length})</Text>
        
          <FlatList
            style={{marginBottom: 180}}
            data={todos}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={[
          layout.absolute,
          {
            bottom:30, 
            flex: 1, 
            width: deviceWidth
          }
        ]}>
          <View style={[
            borders.rounded_16, 
            layout.row,
            layout.justifyBetween,
            {
              marginLeft: 6, 
              marginRight: 6, 
              paddingLeft: 6, 
              paddingRight: 10, 
              alignItems: 'center', 
              backgroundColor: '#2c2c2c'
            }
          ]}>
            <TextInput
              style={[
                fonts.gray200, 
                fonts.size_16, 
              ]}
              defaultValue={newTodo}
              placeholder="Add new todo"
              placeholderTextColor={colors.gray200}
              onChangeText={(text) => {setNewTodo(text)}}
              autoFocus = {true}
              editable = {!loading}
            />
            {loading ? (
              <ActivityIndicator size="small" color={colors.gray400} />
            ) : (
              <TouchableOpacity onPress={() => {
                dispatch(createTodos({
                  userId: 1, 
                  title: newTodo, 
                  completed: true
                }));
                setNewTodo('');
              }} style={[
                layout.itemsCenter
              ]}>
                <IconByVariant path={'add'} stroke={colors.gray400} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SafeScreen>
  )
}

export default TodoRTK