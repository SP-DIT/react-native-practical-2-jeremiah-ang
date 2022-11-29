import { FlatList, Pressable } from 'react-native';
import Tweet from './Tweet';
/**
 * <TwitterFeed tweets={["hello", "byebye", "so on..."]} />
 */
export default function TwitterFeed(props) {
    const navigation = props.navigation;
    return (
        <FlatList
            data={props.tweets}
            renderItem={function ({ item, index }) {
                return (
                    <Pressable
                        onPress={function () {
                            navigation.navigate('detail', {
                                tweets: props.tweets,
                                selectedIndex: index,
                            });
                        }}
                    >
                        <Tweet tweet={item} />
                    </Pressable>
                );
            }}
        ></FlatList>
    );
}
