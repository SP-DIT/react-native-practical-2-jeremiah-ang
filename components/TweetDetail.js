import React from 'react';

import Tweet from './Tweet';

export default function TweetDetail(props) {
    const route = props.route;
    const tweets = route.params.tweets;
    const selectedIndex = route.params.selectedIndex;

    navigation.setOptions({
        tabBarStyle: { display: 'block' },
    });

    return <Tweet tweet={tweets[selectedIndex]}></Tweet>;
}
