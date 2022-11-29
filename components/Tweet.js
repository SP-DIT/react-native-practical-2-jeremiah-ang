import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

export default function Tweet(props) {
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
                    <Text>{props.tweet.text}</Text>
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
