import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TwitterApp from './TwitterApp';
import TweetDetail from './TweetDetail';

const Stack = createStackNavigator();

export default function TwitterScreen(props) {

    return (
        <Stack.Navigator>
            <Stack.Screen name="feed" component={TwitterApp} />
            <Stack.Screen name="detail" component={TweetDetail} />
        </Stack.Navigator>
    );
}
