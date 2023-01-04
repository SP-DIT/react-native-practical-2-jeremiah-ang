import firestore from './firestore';
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';

const tweetsRef = collection(firestore, 'tweets');

export function addTweet(tweet) {
    console.log(tweet);
    return addDoc(tweetsRef, tweet);
}

export function getTweets() {
    return getDocs(tweetsRef).then((snapshot) => snapshot.docs.map((doc) => doc.data()));
}
