// import { StyleSheet, Platform, StatusBar } from 'react-native';

import Theme from "./src/Theme/Theme";
import { Context } from "./src/Exports/index";
import { LogBox } from "react-native";
import { QueryClientProvider, QueryClient } from "react-query";
LogBox.ignoreLogs(["ViewPropTypes will be removed"]);

export default function App() {
  const { ThemeContext, UserContext, ExpoToastContext, PostContext } = Context;
  const queryClient = new QueryClient();
  return (
    // <SafeAreaView style={styles.container} flex={1}>
    <ThemeContext>
      <QueryClientProvider client={queryClient}>
        <UserContext>
          {/* <PostContext> */}
          <ExpoToastContext>
            <Theme />
          </ExpoToastContext>
          {/* </PostContext> */}
        </UserContext>
      </QueryClientProvider>
    </ThemeContext>
    // </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   },
//   text: {
//     color: 'red',
//   },
// });
