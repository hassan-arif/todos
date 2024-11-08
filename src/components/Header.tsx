import { useTheme } from "@/theme";
import { Text } from "react-native";

export default function Header(props: { count: string }) {
  const { gutters, fonts
  } = useTheme();

  return (
    <Text style={[
      fonts.size_32, fonts.gray200, fonts.bold, gutters.marginTop_16, gutters.marginBottom_16
    ]}>Task List {props.count}</Text>
  )
}