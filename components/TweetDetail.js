import React from 'react';

import Tweet from './Tweet';

export default function TweetDetail(props) {
    const route = props.route;
    const tweets = route.params.tweets;
    const selectedIndex = route.params.selectedIndex;

    return <Tweet tweet={tweets[selectedIndex]} editing={true}></Tweet>;
}
