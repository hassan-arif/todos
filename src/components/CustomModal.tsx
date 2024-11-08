import Modal from 'react-native-modal';
import { View, Text } from 'react-native';

type propsObj = {
  isVisible: boolean;
  isCreate: boolean; // If true, behaves for creating a new item. If false, behaves for updating an existing item.
  toggleVisibility: () => void;
}

export default function CustomModal(props: propsObj) {
  /**
   * CustomModal component is a modal that can be used for creating or updating an item.
   * For creating, it receives ...
   * Else it receives ...
   */
  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={props.toggleVisibility}
      onBackButtonPress={props.toggleVisibility}
    >
      <View style={[
        { margin: 20, backgroundColor: 'gray' }
      ]}>
        {props.isCreate ? (
          <Text>Add Item</Text>
        ) : (
          <Text>Update Item</Text>
        )}
      </View>
    </Modal>
  );
}