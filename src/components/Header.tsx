import { StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";

interface HeaderProps {
  count: number;
  isLoading: boolean;
  refetch: () => void;
}

export default function Header(props: HeaderProps) {
  /**
   * Header component is a header that displays the title of the app and a refresh button.
   * It receives count, isLoading, and refetch.
   * count is a number that determines the number of tasks in the list. isLoading is a boolean that determines if the refresh button should be a loading spinner. refetch is a function that is called when the refresh button is pressed.
   */

  return ( 
    <View style={styles.header}>

      <Text style={styles.headerText}>
        Task List {props.count && `(${props.count})`}
      </Text>

      <CustomButton
        isLoading={props.isLoading}
        onPress={props.refetch}
        path={'refresh'}
        size={26}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 16,
    marginBottom: 16,
  },
});