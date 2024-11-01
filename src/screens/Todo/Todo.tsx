import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeScreen } from '@/components/templates'
import { useTodo } from '@/store/todo'
import { useTheme } from '@/theme';
import { IconByVariant } from '@/components/atoms';

function Todo() {
  const { layout, gutters, fonts, colors,
    // backgrounds 
  } = useTheme();
  const todos = useTodo((state) => state.todos);

  return (
    <SafeScreen>
      <ScrollView>
        <View style={[gutters.padding_12]}>
          <Text style={[fonts.size_32, fonts.gray200, fonts.bold]}>Todo List</Text>
        </View>

        <View style={[gutters.paddingHorizontal_12]}>

          <FlatList
            data={todos}
            renderItem={
              ({item}) => <View style={[
                // backgrounds.gray100, 
                gutters.marginBottom_12
              ]}>
                <View style={[
                  layout.row, 
                  layout.justifyBetween, 
                  gutters.paddingTop_12
                ]}>
                  <Text style={[
                    fonts.gray200, 
                    fonts.size_16, 
                    // backgrounds.gray200
                  ]}>{item.text}</Text>

                  <View style={[layout.row]}>
                    <TouchableOpacity onPress={() => {}} style={[
                      gutters.marginRight_12,
                      // backgrounds.gray400
                    ]}>
                      <IconByVariant path={'update'} stroke={colors.gray400} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}} style={[
                      // backgrounds.gray400
                    ]}>
                      <IconByVariant path={'delete'} stroke={colors.red500} />
                    </TouchableOpacity>
                  </View>
                </View>
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