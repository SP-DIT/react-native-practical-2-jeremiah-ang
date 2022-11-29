import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import TwitterFeed from './TwitterFeed';
import Constants from 'expo-constants';

export default function TwitterScreen(props) {
    const navigation = props.navigation;
    const [tweets, setTweets] = React.useState([]);
    const [newTweet, setNewTweet] = React.useState('');
    return (
        <View style={styles.container}>
            <TwitterFeed tweets={tweets} navigation={navigation} />
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
                                setTweets([
                                    {
                                        fullName,
                                        username,
                                        picture,
                                        text: newTweet,
                                    },
                                    ...tweets,
                                ]);
                                setNewTweet('');
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
