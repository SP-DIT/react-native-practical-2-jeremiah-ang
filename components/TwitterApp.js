import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import TwitterFeed from './TwitterFeed';
import Constants from 'expo-constants';
import { getTweets as getFirebaseTweets, addTweet as addFirebaseTweet } from '../firebase/tweets';
import { Link } from '@react-navigation/native';
import TweetDetail from './TweetDetail';

const Stack = createStackNavigator();

function TwitterApp(props) {
    const navigation = props.navigation;
    const [isLoading, setIsLoading] = React.useState(true);
    const [tweets, setTweets] = React.useState([]);

    React.useEffect(() => {
        setIsLoading(true);
        const unsubscribe = navigation.addListener('focus', () => {
            getFirebaseTweets()
                .then(function (tweets) {
                    setTweets(tweets);
                })
                .catch(function (error) {
                    console.error(error);
                })
                .finally(function () {
                    setIsLoading(false);
                });
        });

        return unsubscribe;
    }, [navigation]);

    React.useEffect(function () {
        getFirebaseTweets()
            .then(function (tweets) {
                console.log(tweets);
                setTweets(tweets);
            })
            .catch(function (error) {
                console.error(error);
            })
            .finally(function () {
                setIsLoading(false);
            });
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? <Text>Loading...</Text> : <TwitterFeed tweets={tweets} navigation={navigation} />}
            <Link to={{ screen: 'Add Tweet' }}>
                <button>Add Tweet</button>
            </Link>
            <StatusBar style="auto" />
        </View>
    );
}

function AddTweet(props) {
    const navigation = props.navigation;
    const [newTweet, setNewTweet] = React.useState('');
    return (
        <View>
            <TextInput
                value={newTweet}
                onChangeText={function (value) {
                    setNewTweet(value);
                }}
            ></TextInput>
            <Button
                onPress={function () {
                    fetch('https://randomuser.me/api/')
                        .then((response) => response.json())
                        .then((body) => {
                            const fullName = body.results[0].name.first + ' ' + body.results[0].name.last;
                            const username = body.results[0].login.username;
                            const picture = body.results[0].picture.thumbnail;
                            const newTweetDocument = {
                                fullName,
                                username,
                                picture,
                                text: newTweet,
                            };
                            addFirebaseTweet(newTweetDocument)
                                .then(function () {
                                    setNewTweet('');
                                    navigation.navigate('App')
                                })
                                .catch(function (error) {
                                    console.error(error);
                                });
                        });
                }}
                title={'Add Tweet'}
            />
        </View>
    );
}

export default function TwitterScreen(props) {
    return (
        <Stack.Navigator initialRouteName={'App'}>
            <Stack.Screen name="App" component={TwitterApp} />
            <Stack.Screen name="Add Tweet" component={AddTweet} />
            <Stack.Screen name="detail" component={TweetDetail} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
