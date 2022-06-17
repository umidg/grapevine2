import { StyleSheet, Platform, StatusBar, SafeAreaView } from "react-native";
import Theme from "./src/Theme/Theme";
import { Context } from "./src/Exports/index";
export default function App() {
  const { ThemeContext, UserContext, ExpoToastContext } = Context;
  return (
    // <SafeAreaView style={styles.container} flex={1}>
    <ThemeContext>
      <UserContext>
        <ExpoToastContext>
          <Theme />
        </ExpoToastContext>
      </UserContext>
    </ThemeContext>
    // </SafeAreaView>
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
