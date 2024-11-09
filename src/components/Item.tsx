import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

interface ItemProps {
  id: number,
  isDone: boolean,
  description: string,
}

export default function Item(props: ItemProps) {
  return (
    <View style={styles.container}>
      <CheckBox
        value={props.isDone}
        disabled={false}
        onValueChange={() => {}}
        tintColors={{ true: '#8687E7', false: 'gray' }}
      />
      <TouchableOpacity onPress={() => {}}>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    marginRight: 22,
  },
  text: {
    fontSize: 22,
    color: 'gray',
    paddingBottom: 4,
    marginLeft: 8,
  },
  strikethrough: {
    textDecorationLine: 'line-through'
  }
})