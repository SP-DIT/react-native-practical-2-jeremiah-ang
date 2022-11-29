import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React from 'react';
import ProfileScreen from './components/ProfileScreen';
import TwitterScreen from './components/TwitterScreen';

const Tab = createBottomTabNavigator();

function AppTab(props) {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="Tweets" component={TwitterScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <AppTab />
        </NavigationContainer>
    );
}
