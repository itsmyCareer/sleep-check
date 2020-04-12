import {  createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import StartScreen from './StartScreen';
import LoginScreen from './LoginScreen';
import GraphScreen from './GraphScreen';

const AppStackNavigator = createStackNavigator(
    {
        StartScreen: StartScreen,
        LoginScreen: LoginScreen,
        GraphScreen: GraphScreen,
   },
   {headerMode: 'none'}
);


export default createAppContainer(AppStackNavigator);