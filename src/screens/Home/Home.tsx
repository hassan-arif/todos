import React from 'react'
import { Dimensions, View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeScreen } from '@/components/templates'

import { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } from '@/store/todoApi';
import Header from '@/components/Header';
import CustomModal from '@/components/CustomModal';
import CustomButton from '@/components/CustomButton';
import Item from '@/components/Item';

export default function Home() {
  
  let { data, error, isLoading, refetch } = useGetTodosQuery({});
  const [ addTodo ] = useAddTodoMutation();
  const [ deleteTodo ] = useDeleteTodoMutation();
  const [isModalVisible, setModalVisible] = React.useState(false);

  if (error) {
    console.error('error', error);
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  async function addNewTodo(todo: string) {
    await addTodo({
      description: todo,
      isDone: false
    })
      .then(res => console.log(res?.data))
      .catch(err => console.error(err));
  }

  async function deleteSelectedTodo(id: number) {
    await deleteTodo(id)
      .then(res => console.log(res?.data))
      .catch(err => console.error(err));
  }

  async function updateSelectedTodoDescription({ id, description }: { id: number, description: string }) {
    await updateTodo({ id, description })
      .then(res => console.log(res?.data))
      .catch(err => console.error(err));
  }

  async function updateSelectedTodoCheckbox({ id, isDone }: { id: number, isDone: boolean }) {
    await updateTodo({ id, isDone })
      .then(res => console.log(res?.data))
      .catch(err => console.error(err));
  }

  return (
    <SafeScreen>
      <View style={styles.container}>

          <Header
            count={data?.length}
            isLoading={isLoading}
            refetch={refetch}  
          />
        
          <FlatList
          style={{marginBottom: 85}}
            data={data}
          renderItem={({ item }) => <Item {...item} />}
            keyExtractor={item => item.id}
          />
        </View>
        
          <View style={styles.createButton}>
            <CustomButton
              isLoading={isLoading} 
              onPress={toggleModal} 
              path='create' 
              size={64}
            />
          </View>
        
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

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
    paddingHorizontal: 12,
  },
  createButton: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: deviceWidth
  }
})