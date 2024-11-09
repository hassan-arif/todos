import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

type UpdateCheckbox = {
  id: number;
  isDone: boolean;
}

interface ItemProps {
  id: number,
  isDone: boolean,
  description: string,

  setCreate: (status: boolean) => void,
  toggleModal: () => void,
  setId: (id: number) => void,
  setDescription: (description: string) => void,
  setHeaderText: (headerText: string) => void,
  updateTodoCheckbox: (data: UpdateCheckbox) => void;
}

export default function Item(props: ItemProps) {
  /**
   * Item component is a list item that displays a checkbox and a description.
   * @param {number} id - The id of the todo item.
   * @param {boolean} isDone - The checkbox value of the todo item.
   * @param {string} description - The description of the todo item.
   * @param {function} setCreate - Sets the create status of the modal.
   * @param {function} toggleModal - Toggles the visibility of the modal.
   * @param {function} setId - Sets the id of the todo item.
   * @param {function} setDescription - Sets the description of the todo item.
   * @param {function} setHeaderText - Sets the header text of the modal.
   * @param {function} updateTodoCheckbox - Updates the checkbox value of the todo item.
   * @returns {JSX.Element}
   */
  return (
    <View style={styles.container}>
      <CheckBox
        value={props.isDone}
        disabled={false}
        onValueChange={() => {
          props.updateTodoCheckbox({
            id: props.id, 
            isDone: !props.isDone
          })
        }}
        tintColors={{ true: '#8687E7', false: 'gray' }}
      />
      <TouchableOpacity onPress={() => {
        props.setCreate(false)
        props.setId(props.id)
        props.setDescription(props.description)
        props.setHeaderText('Update Item')
        props.toggleModal()
      }}>
        {
          props.isDone ? (
            <Text style={[styles.text, styles.strikethrough]}>{props.description}</Text>
          ) : (
            <Text style={styles.text}>{props.description}</Text>
          )
        }
      </TouchableOpacity>
    </View>
  )
}

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  text: {
    fontSize: 22,
    color: 'gray',
    paddingBottom: 4,
    marginLeft: 8,
    width: deviceWidth - 80,
  },
  strikethrough: {
    textDecorationLine: 'line-through'
  }
})