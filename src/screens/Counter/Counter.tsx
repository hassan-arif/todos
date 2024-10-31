import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/theme';
import { IconByVariant, Skeleton } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';
import { useCount } from '@/store/count';

function Counter() {
  const {
    colors,
    variant,
    changeTheme,
    layout,
    gutters,
    fonts,
    components,
  } = useTheme();

  const onChangeTheme = () => {
    changeTheme(variant === 'default' ? 'dark' : 'default');
  };

  const count = useCount((state) => state.count);
  const [isLoading, setLoading] = React.useState(false);

  async function asyncIncrement() {
    setLoading(true);
    await useCount.getState().asyncIncrement();
    setLoading(false);
  }

  return (
    <SafeScreen
      // isError={fetchOneUserQuery.isError}
      // onResetError={fetchOneUserQuery.refetch}
    >
      <ScrollView>
        <View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
          <View style={[gutters.marginTop_40]}>
            <Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>
              Counter: {count}
            </Text>
          </View>

          <View
            style={[
              layout.row,
              layout.justifyBetween,
              layout.fullWidth,
              gutters.marginTop_80
            ]}
          >
            <TouchableOpacity
              style={[components.buttonCircle, gutters.marginBottom_16]}
              testID='plus-button'
              onPress={useCount.getState().increment}
            >
              <IconByVariant path={'plus'} stroke={colors.purple500} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[components.buttonCircle, gutters.marginBottom_16]}
              testID='minus-button'
              onPress={useCount.getState().decrement}
            >
              <IconByVariant path={'minus'} stroke={colors.purple500} />
            </TouchableOpacity>

            <Skeleton
              height={64}
              loading={isLoading}
              style={{ borderRadius: components.buttonCircle.borderRadius }}
              width={64}
            >
              <TouchableOpacity
                style={[components.buttonCircle, gutters.marginBottom_16]}
                testID='plus-button'
                onPress={asyncIncrement}
              >
                <IconByVariant path={'delay'} stroke={colors.purple500} />
              </TouchableOpacity>
            </Skeleton>

            <TouchableOpacity
              onPress={onChangeTheme}
              style={[components.buttonCircle, gutters.marginBottom_16]}
              testID="change-theme-button"
            >
              <IconByVariant path={'theme'} stroke={colors.purple500} />
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default Counter;