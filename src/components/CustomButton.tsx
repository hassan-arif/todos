import { useTheme } from "@/theme";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { IconByVariant } from "./atoms";

interface BtnProps {
  isLoading: boolean;
  onPress: () => void;
  path: string
  size: number
}

export default function CustomButton(props: BtnProps) {
  /**
   * CustomButton component is a button that is either a loading spinner or an icon.
   * It receives isLoading, onPress, path, and size.
   * isLoading is a boolean that determines if the button should be a loading spinner. onPress is a function that is called when the button is pressed. path is a string that determines the icon to display. size is a number that determines the size of the icon.
   */

  const { colors 
  } = useTheme();

  if (props?.isLoading) {
    return (
      <ActivityIndicator size={"large"} color={colors.gray400} />
    )
  }

  return (
    <TouchableOpacity onPress={props.onPress}>
      <IconByVariant
        path={props.path}
        width={props.size}
        height={props.size}
      />
    </TouchableOpacity>
  )
}