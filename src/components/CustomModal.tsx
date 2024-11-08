import React from 'react';
import Modal from 'react-native-modal';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { IconByVariant } from './atoms';

interface CustomModalProps {
  isVisible: boolean;
  isCreate: boolean; // If true, behaves for creating a new item. If false, behaves for updating an existing item.
  toggleVisibility: () => void;

  headerText: string;
  defaultTodo: string;
}

export default function CustomModal(props: CustomModalProps) {
  /**
   * CustomModal component is a modal that can be used for creating or updating an item.
   * For creating, it receives ...
   * Else it receives ...
   */

  const [newTodo, setNewTodo] = React.useState(props.defaultTodo);

  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={props.toggleVisibility}
      onBackButtonPress={props.toggleVisibility}
    >
      <View style={styles.outer}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Add New Item</Text>
          <TouchableOpacity onPress={props.toggleVisibility}>
            <IconByVariant path={'close'} />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="new item"
          defaultValue={newTodo}
          onChangeText={(text) => {setNewTodo(text)}}
          autoFocus={true}
        />

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerFooter} onPress={() => {}}>
            <Text style={styles.footerButton}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerFooter} onPress={() => {}}>
            <Text style={styles.footerButton}>Save</Text>
          </TouchableOpacity>
        </View>

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
    marginLeft: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },

  input: {
    fontSize: 16,
    borderRadius: 16,
    backgroundColor: '#111111',
    paddingLeft: 16,
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
    fontSize: 20,
    backgroundColor: '#8687E7',
    textAlign: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 32,
    marginRight: 32,
    borderRadius: 8,
  }
})