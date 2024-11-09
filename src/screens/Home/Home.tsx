import React from 'react'
import { Dimensions, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeScreen } from '@/components/templates'
import { useTheme } from '@/theme';
import { IconByVariant } from '@/components/atoms';

import { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation } from '@/store/todoApi';
import Header from '@/components/Header';
import CustomModal from '@/components/CustomModal';
import CustomButton from '@/components/CustomButton';

const deviceWidth = Dimensions.get('window').width;

export default function Home() {
  const { layout, gutters, fonts, colors
  } = useTheme();
  
  let { data, error, isLoading, refetch } = useGetTodosQuery();
  const [ addTodo ] = useAddTodoMutation();
  const [ deleteTodo ] = useDeleteTodoMutation();
  const [isModalVisible, setModalVisible] = React.useState(false);

  if (error) {
    console.error('error', error);
  }

  // Handles onPress on create todo (plus) button. This toggles the visibility of the modal (isModalVisible state).
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  async function addNewTodo(todo: string) {
    await addTodo({
      description: todo,
      isDone: false
    })
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }

  async function deleteSelectedTodo(id: number) {
    await deleteTodo(id)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }

  function renderItem(props: any) {
    const { item } = props
    let listItem = item.description

    return (
      <View style={[ 
        gutters.marginBottom_12
      ]}>
        {/* {item.completed ? ( */}
          <View style={[
            layout.row, 
            layout.justifyBetween, 
            gutters.paddingTop_12
          ]}>
            <Text style={[
              fonts.gray200, 
              fonts.size_16,
              {width: '85%'}
            ]}>{item.description}</Text>

            <View style={[layout.row]}>
              <TouchableOpacity onPress={() => {
                // dispatch(toggleTodos({
                //   id: item.id,
                //   completed: false
                // }));
              }} style={[
                gutters.marginRight_12
              ]}>
                <IconByVariant path={'update'} stroke={colors.gray400} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                deleteSelectedTodo(item.id);
              }}>
                <IconByVariant path={'delete'} stroke={colors.red500} />
              </TouchableOpacity>
            </View>
          </View>

        {/* ) : (

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
                // dispatch(updateTodos({
                //   id: item.id,
                //   title: listItem
                // }));
              }} style={[
                gutters.marginRight_12
              ]}>
                <IconByVariant path={'save'} stroke={colors.gray400} />
              </TouchableOpacity>
            </View>
          </View>
        )} */}
      </View>
    )
  }

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
          <Header
            count={data?.length}
            isLoading={isLoading}
            refetch={refetch}  
          />
        
          <FlatList
            style={{marginBottom: 180}}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        
        {
          !isModalVisible && 
          <View style={styles.createButton}>
            <CustomButton
              isLoading={isLoading} 
              onPress={toggleModal} 
              path='create' 
              size={64}
            />
          </View>
        }
        
      </View>

      <CustomModal 
        isCreate={true}
        isVisible={isModalVisible} 
        toggleVisibility={toggleModal}

        headerText='Add New Item'
        defaultTodo=''

        addTodo={addNewTodo}
      />

    </SafeScreen>
  )
}

const styles = StyleSheet.create({
  createButton: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: deviceWidth
  }
})