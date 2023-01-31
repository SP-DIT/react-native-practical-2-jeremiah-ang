import React from 'react';
import PropTypes from 'prop-types';
import { Image, Pressable, Text, View, TextInput, Button } from 'react-native';
import { updateTweet } from '../firebase/tweets';

function Tweet(props) {
    const editing = props.editing;
    const [tweetText, setTweetText] = React.useState(props.tweet.text);
    const [isSeeEvil, setIsSeeEvil] = React.useState(false);
    return (
        <View style={{ flexDirection: 'row', marginBottom: 5, width: '100%' }}>
            <View style={{ marginRight: 5 }}>
                <View style={{ overflow: 'hidden' }}>
                    <Image
                        style={{
                            borderRadius: 25,
                            width: 50,
                            height: 50,
                        }}
                        source={{
                            uri: props.tweet.picture,
                        }}
                    ></Image>
                </View>
            </View>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', marginRight: 5 }}>{props.tweet.fullName}</Text>
                    <Text style={{ color: 'grey' }}>@{props.tweet.username}</Text>
                </View>
                <View>
                    {editing ? (
                        <View>
                            <TextInput value={tweetText} onChangeText={setTweetText}></TextInput>
                            <Button
                                title={'Save'}
                                onPress={function () {
                                    updateTweet(props.tweet.id, tweetText).then(function () {
                                        console.log('Successfully updated');
                                    });
                                }}
                            ></Button>
                        </View>
                    ) : (
                        <Text>{props.tweet.text}</Text>
                    )}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Pressable
                        onPress={function () {
                            setIsSeeEvil(!isSeeEvil);
                        }}
                    >
                        <Text>{isSeeEvil ? '🙉' : '🙈'}</Text>
                    </Pressable>
                    <Text>🙉</Text>
                    <Text>🐒</Text>
                    <Text>🐒</Text>
                </View>
            </View>
        </View>
    );
}

Tweet.propTypes = {
    tweet: PropTypes.shape({
        fullName: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
    }).isRequired,
};

export default Tweet;
