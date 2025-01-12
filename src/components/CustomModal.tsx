import React from 'react';
import Modal from 'react-native-modal';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { IconByVariant } from './atoms';

type UpdateDescription = {
  id: number;
  description: string;
}

interface CustomModalProps {
  isVisible: boolean;
  isCreate: boolean; // If true, behaves for creating a new item. If false, behaves for updating an existing item.
  toggleVisibility: () => void;

  headerText: string;
  id: number;
  defaultTodo: string;

  addTodo: (todo: string) => void;
  deleteTodo: (id: number) => void;
  updateTodoDescription: (data: UpdateDescription) => void;
}

export default function CustomModal(props: CustomModalProps) {
  /**
   * CustomModal component is a modal that is used to add or update a todo item.
   * @param {boolean} isVisible - Determines if the modal is visible.
   * @param {boolean} isCreate - Determines if the modal is for creating a new item.
   * @param {function} toggleVisibility - Toggles the visibility of the modal. Also clears id, description, and headerText.
   * @param {string} headerText - Determines the header text of the modal.
   * @param {number} id - Determines the id of the todo item.
   * @param {string} defaultTodo - Determines the default todo item description.
   * @param {function} addTodo - Adds a new todo item.
   * @param {function} deleteTodo - Deletes a todo item.
   * @param {function} updateTodoDescription - Updates the description of a todo item.
   * @returns {JSX.Element}
   */

  const [newTodo, setNewTodo] = React.useState(props.defaultTodo);

  function clear() {
    /**
     * clear function is used to clear the input field and toggle the visibility of the modal.
     * @returns {void}
     */
    setNewTodo('')
    props.toggleVisibility()
  }

  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={clear}
      onBackButtonPress={clear}
    >
      <View style={styles.outer}>

        <View style={styles.header}>
          <Text style={styles.headerText}>{props.headerText}</Text>
          <TouchableOpacity onPress={clear}>
            <IconByVariant path={'close'} />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="new item"
          defaultValue={props.defaultTodo}
          onChangeText={(text) => {setNewTodo(text)}}
          autoFocus={true}
        />

        { !props.isCreate ? 
          <View style={styles.footer}>
            <TouchableOpacity style={styles.footerFooter} onPress={() => {
              props.deleteTodo(props.id)
              clear()
            }}>
              <Text style={styles.footerButton}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerFooter} onPress={() => {
              props.updateTodoDescription({
                id: props.id,
                description: newTodo
              })
              clear()
            }}>
              <Text style={styles.footerButton}>Update</Text>
            </TouchableOpacity>
          </View>
        : <View style={styles.footer}>
            <TouchableOpacity style={styles.footerFooter} onPress={() => {
              props.addTodo(newTodo)
              clear()
            }}>
              <Text style={styles.footerButton}>Add</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  outer: {
    margin: 12,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 20,
    fontSize: 28,
    fontWeight: 'bold',
  },

  input: {
    fontSize: 20,
    borderRadius: 16,
    backgroundColor: '#111111',
    paddingLeft: 20,
    paddingRight: 16,
    marginTop: 16,
    marginBottom: 24,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  footerFooter: {
    flex: 1,
  },
  footerButton: {
    fontSize: 22,
    backgroundColor: '#8687E7',
    textAlign: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 32,
    marginRight: 32,
    borderRadius: 8,
  }
})