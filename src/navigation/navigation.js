import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();
import { enableScreens } from 'react-native-screens';
import transactionListPage from '../containers/transactionsListsPage';
import detailPage from '../containers/detailListsPage';
enableScreens();
export default function App() {
  return (
    <NavigationContainer>
        <>
            <Stack.Navigator>
                <Stack.Screen name={'transactionList'} options={{headerShown: false}} component={transactionListPage} />
                <Stack.Screen name={'detail'} options={{headerShown: false}} component={detailPage} />
            </Stack.Navigator>
        </>
      </NavigationContainer>
  );
}