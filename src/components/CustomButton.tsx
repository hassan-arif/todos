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
   * CustomButton component is a button that displays an icon.
   * @param {boolean} isLoading - Determines if the button is in a loading state.
   * @param {function} onPress - Function to execute when the button is pressed.
   * @param {string} path - Determines the icon to display.
   * @param {number} size - Determines the size of the icon.
   * @returns {JSX.Element}
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