import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllFriends from './components/AllFriends';
import Friend from './components/Friend';

const Stack = createNativeStackNavigator();

const getHeaderTitle = (title) => {
  return {
    title,
    headerTitleStyle: {
      fontWeight: "bold"
    }
  }
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen name="AllFriends" component={AllFriends} options={getHeaderTitle("All Friends")} />
        <Stack.Screen name="Friend" component={Friend} options={getHeaderTitle("Your Friend")} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
