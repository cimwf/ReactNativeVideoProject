import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './view/Home'
import Demo from './view/Demo'
import MovieList from './view/MovieList'
import Detail from './view/Detail'
import Video from './view/Video'

const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'} screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name={'Home'} component={Home} />
        <Stack.Screen name={'MovieList'} component={MovieList} />
        <Stack.Screen name={'Detail'} component={Detail} />
        <Stack.Screen name={'Video'} component={Video} />
        <Stack.Screen name={'Demo'} component={Demo} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
