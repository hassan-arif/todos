import React from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { SafeScreen } from '@/components/templates'
import { useTodo } from '@/store/todo'
import { useTheme } from '@/theme';
import { IconByVariant } from '@/components/atoms';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(); //Ignore all log notifications

function Todo() {
  const { layout, gutters, fonts, colors, borders,
    backgrounds 
  } = useTheme();

  const deviceWidth = Dimensions.get('window').width;
  
  const todos = useTodo((state) => state.todos);
  const [newTodo, setNewTodo] = React.useState('');
  const deleteItem = useTodo((state) => state.delete);
  const addItem = useTodo((state) => state.add);
  const toggleItem = useTodo((state) => state.toggle);
  const updateItem = useTodo((state) => state.update);

  console.log(todos);

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
          {item.done ? (
            <Text style={[
              fonts.gray200, 
              fonts.size_16,
            ]}>{item.text}</Text>
          ) : (
            <TextInput
              style={[ 
                fonts.size_16,
                fonts.gray200,
                { margin: 0, padding: 0},
              ]}
              defaultValue={item.text}
              onChangeText={(text) => {
                item.text = text;
              }}
            />
          )}

          {item.done ? (
            <View style={[layout.row]}>
              <TouchableOpacity onPress={() => toggleItem(item.id)} style={[
                gutters.marginRight_12
              ]}>
                <IconByVariant path={'update'} stroke={colors.gray400} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(item.id)}>
                <IconByVariant path={'delete'} stroke={colors.red500} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[layout.row]}>
              <TouchableOpacity onPress={() => {
                updateItem(item.id, item.text);
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

  return (
    <SafeScreen>
      <View
        style={[
          layout.fullHeight,
          gutters.paddingHorizontal_12,
          backgrounds.gray100
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
              addItem(newTodo);
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