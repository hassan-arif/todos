import { useTheme } from "@/theme";
import { Text } from "react-native";

export default function Header(props: { count: number }) {
  /**
   * Header component is a simple component that displays the title of the app and the count of tasks.
   * It receives tasks' count.
   */

  const { gutters, fonts
  } = useTheme();

  if (!props.count) {
    return (
      <Text style={[
        fonts.size_32, fonts.gray200, fonts.bold, gutters.marginTop_16, gutters.marginBottom_16
      ]}>Task List</Text>
    )
  }

  return (
    <Text style={[
      fonts.size_32, fonts.gray200, fonts.bold, gutters.marginTop_16, gutters.marginBottom_16
    ]}>Task List {props.count}</Text>
  )
}