console.log('this is loaded');

//(option 2)
//exports.twitterKeys = {
//    consumer_key: '31NGgDbjKJIAL1wInLbwzl8X5',
//    consumer_secret: 'CoN5GdHkgIhyUn0ZvTnSXn0wH1tHtG0Yz7YfcyjAWmOudTXJFh',
//    access_token_key: '757294851922784257-ip3sIoRORROWZoIYMeEn5lVfyO8UEE8',
//    access_token_secret: 'aqqUU029YEkISJD0Fm4ZHkyuWz8KRrwso5bXSaJ30P9XY'
//};
//
//exports.spotifyKeys = {
//    id: '35637af43da7466899da86de70f2275a',
//    secret: '35d0ba82a1494af6a739d8bf32f0b769'
//};


//(option 3)
exports.twitterKeys = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotifyKeys = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};