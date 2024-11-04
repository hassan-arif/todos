import React from 'react'
import { Text, View } from 'react-native';
import { SafeScreen } from '@/components/templates'
import { useTheme } from '@/theme';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(); //Ignore all log notifications

function Todo() {
  const { layout, gutters, fonts
  } = useTheme();

  return (
    <SafeScreen>
      <View
        style={[
          layout.fullHeight,
          gutters.paddingHorizontal_12,
          { backgroundColor: 'black' },
        ]}
      >
        <Text style={[fonts.gray200, fonts.size_24, fonts.bold]}>
          Todo
        </Text>
      </View>
    </SafeScreen>
  )
}

export default Todo