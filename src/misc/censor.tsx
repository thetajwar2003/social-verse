import React, { useState } from 'react';

const CensorTweet = () => {
  const [userTweet, setUserTweet] = useState('');
  const [censoredTweet, setCensoredTweet] = useState('');

  const censorCurseWords = (tweet: string): string => {
    const curseWords: string[] = ["fuck", "fucking","fucker", "shit", "bitch", "ass", "asshole", "cunt", "pussy", "motherfucker"]; 

    let censoredTweetCopy = tweet;

    curseWords.forEach((curseWord) => {
      const regex = new RegExp(curseWord, 'gi'); 
      censoredTweetCopy = censoredTweetCopy.replace(regex, '*'.repeat(curseWord.length));
    });

    return censoredTweetCopy;
  };

  const handleTweetChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tweet = event.target.value;
    setUserTweet(tweet);
    const censored = censorCurseWords(tweet);
    setCensoredTweet(censored);
  };

  return (
    <div>
      <label htmlFor="tweet">Your Tweet:</label>
      <textarea id="tweet" value={userTweet} onChange={handleTweetChange} />
      
      <div>
        <strong>Censored Tweet:</strong>
        <p>{censoredTweet}</p>
      </div>
    </div>
  );
};

export default CensorTweet;
