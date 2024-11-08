import { useTheme } from "@/theme";
import { Text } from "react-native";

export default function Header(props: { count: string }) {
  /**
   * Header component is a simple component that displays the title of the app and the count of tasks.
   * It receives string of tasks' count or an empty one.
   */
  
  const { gutters, fonts
  } = useTheme();

  return (
    <Text style={[
      fonts.size_32, fonts.gray200, fonts.bold, gutters.marginTop_16, gutters.marginBottom_16
    ]}>Task List {props.count}</Text>
  )
}