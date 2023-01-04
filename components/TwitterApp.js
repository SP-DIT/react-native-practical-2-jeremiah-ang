import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import TwitterFeed from './TwitterFeed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

export default function TwitterScreen(props) {
    const navigation = props.navigation;
    const [isLoading, setIsLoading] = React.useState(true);
    const [tweets, setTweets] = React.useState([]);
    const [newTweet, setNewTweet] = React.useState('');

    React.useEffect(function () {
        AsyncStorage.getItem('tweets')
            .then(function (tweetsJSON) {
                if (!tweetsJSON) return;
                setTweets(JSON.parse(tweetsJSON));
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
                                const newTweets = [
                                    {
                                        fullName,
                                        username,
                                        picture,
                                        text: newTweet,
                                    },
                                    ...tweets,
                                ];
                                AsyncStorage.setItem('tweets', JSON.stringify(newTweets))
                                    .then(function () {
                                        setTweets(newTweets);
                                        setNewTweet('');
                                    })
                                    .catch(function (error) {
                                        console.error(error);
                                    });
                            });
                    }}
                    title={'Add Tweet'}
                />
            </View>
            <StatusBar style="auto" />
        </View>
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
