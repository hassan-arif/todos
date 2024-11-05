import React from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { SafeScreen } from '@/components/templates'
import { useTheme } from '@/theme';
import { IconByVariant } from '@/components/atoms';

import { useDispatch, useSelector } from 'react-redux';
import { getTodos, deleteTodos } from '@/store/todoSlice';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(); //Ignore all log notifications

function Todo() {
  const { layout, gutters, fonts, colors, borders
  } = useTheme();

  const deviceWidth = Dimensions.get('window').width;

  const todos = useSelector(state => state.todos.todoList);

  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = React.useState('');

  function renderItem(props: any) {
    const { item } = props
    return (
      <View style={[ 
        gutters.marginBottom_12
      ]}>
        <View style={[
          layout.row, 
          layout.justifyBetween, 
          gutters.paddingTop_12
        ]}>
          {item.completed ? (
            <Text style={[
              fonts.gray200, 
              fonts.size_16,
            ]}>{item.title}</Text>
          ) : (
            <TextInput
              style={[ 
                fonts.size_16,
                fonts.gray200,
                { margin: 0, padding: 0, borderWidth: 0 },
              ]}
              defaultValue={item.title}
              onChangeText={(title) => {
                item.title = title;
              }}
            />
          )}

          {item.completed ? (
            <View style={[layout.row]}>
              <TouchableOpacity onPress={() => {
                // toggleItem(item.id)
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
          ) : (
            <View style={[layout.row]}>
              <TouchableOpacity onPress={() => {
                // updateItem(item.id, item.text);
              }} style={[
                gutters.marginRight_12
              ]}>
                <IconByVariant path={'save'} stroke={colors.gray400} />
              </TouchableOpacity>
            </View>
          )}
        </View>
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
          <Text style={[fonts.size_32, fonts.gray200, fonts.bold]}>Todo List ({todos.length})</Text>
        
          <FlatList
            style={{marginBottom: 140}}
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
            />
            <TouchableOpacity onPress={() => {
              // addItem(newTodo);
              setNewTodo('');
            }} style={[
              layout.itemsCenter
            ]}>
              <IconByVariant path={'add'} stroke={colors.gray400} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeScreen>
  )
}

export default Todo