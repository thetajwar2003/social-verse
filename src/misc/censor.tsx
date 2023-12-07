export function censorCurseWords(tweet: string): string {
  const curseWords: string[] = [
    "fuck",
    "fucking",
    "fucker",
    "shit",
    "bitch",
    "ass",
    "asshole",
    "cunt",
    "pussy",
    "motherfucker",
    "kutta",
    "panchor",
    "kuttar bacha",
    "foqirni",
  ];

  let censoredTweetCopy = tweet;
  let curseWordCount = 0;

  curseWords.forEach((curseWord) => {
    const regex = new RegExp(`\\b${curseWord}\\b`, "gi"); // Use word boundaries to match exact words
    const matchCount = (tweet.match(regex) || []).length;
    if (matchCount > 0) {
      curseWordCount += matchCount;
      censoredTweetCopy = censoredTweetCopy.replace(
        regex,
        "*".repeat(curseWord.length)
      );
    }
  });

  if (curseWordCount > 2) {
    return "This message has been blocked due to indecency.";
  }

  return censoredTweetCopy;
}
