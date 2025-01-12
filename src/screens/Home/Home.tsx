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
  /**
   * Home screen is the main screen of the app.
   * It fetches the todos from the API and displays them in a list.
   * It also has a button to create a new todo item.
   * It uses the Header, CustomModal, CustomButton, and Item components.
   * It uses the useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, and useUpdateTodoMutation hooks.
   * It uses the addNewTodo, deleteSelectedTodo, updateSelectedTodoDescription, and updateSelectedTodoCheckbox functions.
   * It uses the isCreate, isModalVisible, headerText, id, and description states.
   * It uses the toggleModal function.
   * @returns {JSX.Element}
   */
  
  let { data, isLoading, refetch } = useGetTodosQuery({});
  const [ addTodo ] = useAddTodoMutation();
  const [ deleteTodo ] = useDeleteTodoMutation();
  const [ updateTodo ] = useUpdateTodoMutation();

  const [ isCreate, setIsCreate ] = React.useState(true);
  const [ isModalVisible, setModalVisible ] = React.useState(false);
  const [ headerText, setHeaderText ] = React.useState('');
  const [ id, setId ] = React.useState(-1);
  const [ description, setDescription ] = React.useState('');

  const toggleModal = () => {
    /**
     * toggleModal function is used to toggle the visibility of the modal.
     * @returns {void}
     */
    setModalVisible(!isModalVisible);
  };

  async function addNewTodo(todo: string) {
    /**
     * addNewTodo function is used to add a new todo item to the list.
     * @param {string} todo - The description of the todo item to add.
     * @returns {void}
     */
    await addTodo({
      description: todo,
      isDone: false
    })
      .then(res => console.log(res?.data))
      .catch(err => console.error(err));
  }

  async function deleteSelectedTodo(id: number) {
    /**
     * deleteSelectedTodo function is used to delete a todo item from the list.
     * @param {number} id - The id of the todo item to delete.
     * @returns {void}
     */
    await deleteTodo(id)
      .then(res => console.log(res?.data))
      .catch(err => console.error(err));
  }

  async function updateSelectedTodoDescription({ id, description }: { id: number, description: string }) {
    /**
     * updateSelectedTodoDescription function is used to update the description of a todo item.
     * @param {number} id - The id of the todo item to update.
     * @param {string} description - The new description of the todo item.
     * @returns {void}
     */
    await updateTodo({ id, description })
      .then(res => console.log(res?.data))
      .catch(err => console.error(err));
  }

  async function updateSelectedTodoCheckbox({ id, isDone }: { id: number, isDone: boolean }) {
    /**
     * updateSelectedTodoCheckbox function is used to update the checkbox of a todo item.
     * @param {number} id - The id of the todo item to update.
     * @param {boolean} isDone - The new checkbox value of the todo item.
     * @returns {void}
     */
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
          renderItem={({ item }) => <Item 
            {...item}

            setCreate={setIsCreate}
            toggleModal={toggleModal}
            setId={setId}
            setDescription={setDescription}
            setHeaderText={setHeaderText}
            updateTodoCheckbox={updateSelectedTodoCheckbox}
          />}
          keyExtractor={item => item.id}
        />
        
        <View style={styles.createButton}>
          <CustomButton
            isLoading={isLoading} 
            onPress={() => {
              setIsCreate(true)
              setHeaderText('Create New Item')
              toggleModal()
            }} 
            path='create' 
            size={64}
          />
        </View>

      </View>

      <CustomModal 
        isCreate={isCreate}
        isVisible={isModalVisible} 
        toggleVisibility={() => {
          setId(-1)
          setDescription('')
          setHeaderText('')
          toggleModal()
        }}
        headerText={headerText}
        id={id}
        defaultTodo={description}
        addTodo={addNewTodo}
        deleteTodo={deleteSelectedTodo}
        updateTodoDescription={updateSelectedTodoDescription}
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