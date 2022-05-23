import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import Theme from "./src/Theme/Theme";
import ThemeContext from "./src/Context/ThemeContext";
import UserContext from "./src/Context/UserContext";
import ExpoToastContext from "./src/Context/ExpoToastContext";

export default function App() {
  return (
    <SafeAreaView style={styles.container} flex={1}>
      <ThemeContext>
        <UserContext>
          <ExpoToastContext>
            <Theme />
          </ExpoToastContext>
        </UserContext>
      </ThemeContext>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  text: {
    color: "red",
  },
});
