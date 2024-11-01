import React from 'react'
import { Text, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeScreen } from '@/components/templates'
import { useTodo } from '@/store/todo'
import { useTheme } from '@/theme';

function Todo() {
  const { gutters, fonts } = useTheme();
  const todos = useTodo((state) => state.todos);

  return (
    <SafeScreen>
      <ScrollView>
        <View style={[gutters.paddingHorizontal_12]}>

          <FlatList
            data={todos}
            renderItem={
              ({item}) => <View style={[gutters.paddingTop_12]}>
                <Text style={[fonts.gray200, fonts.size_16]}>{item.text}</Text>
              </View>
            }
            keyExtractor={item => item.id}
            />

        </View>
      </ScrollView>
    </SafeScreen>
  )
}

export default Todo