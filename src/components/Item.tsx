import { View, Text } from 'react-native';

interface ItemProps {
  id: number,
  isDone: boolean,
  description: string,
}

export default function Item(props: ItemProps) {
  return (
    <View>
      <Text>props.id</Text>
      <Text>props.isDone</Text>
      <Text>props.description</Text>
    </View>
  )
}