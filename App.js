// import { StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';
import { QueryClientProvider, QueryClient } from 'react-query';
import Theme from './src/Theme/Theme';
import ThemeContext from './src/Context/ThemeContext';
import UserContext from './src/Context/UserContext';
import ExpoToastContext from './src/Context/ExpoToastContext';

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   },
//   text: {
//     color: 'red',
//   },
// });

const queryClient = new QueryClient();

export default function App() {
  return (
    // <SafeAreaView style={styles.container} flex={1}>
    <QueryClientProvider client={queryClient}>
      <ThemeContext>
        <UserContext>
          <ExpoToastContext>
            <Theme />
          </ExpoToastContext>
        </UserContext>
      </ThemeContext>
    </QueryClientProvider>
    // </SafeAreaView>
  );
}
