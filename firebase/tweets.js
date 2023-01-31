import firestore from './firestore';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';

const tweetsRef = collection(firestore, 'tweets');

export function addTweet(tweet) {
    console.log(tweet);
    return addDoc(tweetsRef, tweet);
}

export function getTweets() {
    return getDocs(tweetsRef).then((snapshot) =>
        snapshot.docs.map((doc) => {
            const id = doc.id;
            const data = doc.data();
            data.id = id;
            return data;
        }),
    );
}

export function updateTweet(id, newTweetText) {
    const tweetReference = doc(firestore, 'tweets', id);
    return updateDoc(tweetReference, {
        text: newTweetText,
    });
}
