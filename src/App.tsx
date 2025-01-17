import 'react-native-gesture-handler';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MMKV } from 'react-native-mmkv';

import { ThemeProvider } from '@/theme';
import ApplicationNavigator from '@/navigation/Application';

import '@/translations';
import { Provider } from 'react-redux';
import { store } from '@/store/index';

// Ignore all log notifications on emulator
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export const storage = new MMKV();

function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider storage={storage}>
            <ApplicationNavigator />
          </ThemeProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
