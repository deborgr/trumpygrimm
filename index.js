var c = require('./config.js');
var Twitter = require('twitter');
var Markov = require('markov-strings');
var fs = require('fs');

var tweets = [];
var txt = [];
var data = [];
var markov, client, contents;

//get the txt file and push sentences in to array
contents = fs.readFileSync(__dirname + './grimm.txt');
var txt = contents.toString().split(".");
for(var i = 0; i < (txt.length-1); i++) {
  txt[i] = txt[i].toString().replace(/[^a-z0-9]/gmi, " ").replace(/\s+/g, " ");
  data.push(txt[i]);
}

exports.createClient = function() {

      client = new Twitter({
      consumer_key: c.consumer_key,
      consumer_secret: c.consumer_secret,
      access_token_key: c.access_token_key,
      access_token_secret: c.access_token_secret
    });
}

exports.createMarkov = function(fileUrl, tweetParams) {
  if(!fileUrl) {
    var fileUrl = './grimm.txt';
  }
  //get the txt file and push sentences in to array
  contents = fs.readFileSync(fileUrl);
  var txt = contents.toString().split(".");
    for(var i = 0; i < (txt.length-1); i++) {
      txt[i] = txt[i].toString().replace(/[^a-z0-9]/gmi, " ").replace(/\s+/g, " ");
      data.push(txt[i]);
    }

  if (!tweetParams) {
    var tweetParams = {
      q: 'Trump',
      lang: 'en',
      count: 500,
      result_type: 'recent'
    }
  };

  client.get('search/tweets', tweetParams, function(error, tweetsres, response) {
    //console.log(tweets);  // The favorites.
    for(var i = 0; i < tweetsres.statuses.length; i++) {
      var tweet = tweetsres.statuses[i];
      tweet.text = tweet.text.toString().replace(/RT /g, '').replace(/(@\S+)/gi,'').replace(/(http\S+)/gi, '');
      //replace(/[^a-z0-9]/gmi, " ").replace(/\s+/g, " ");
      tweets.push(tweet);
      data.push(tweet.text);
      //data.push(txt[i]);
    }
    newMarkov();
  });
}

exports.getNewSentence = function(callback) {
  if(markov != null ) {
    console.log('markov exists');
    markov.generateSentence()
    .then(result => {
        console.log(result);
        callback(result);
      })
  } else {
    console.log('No markov instance available');
    return 'no markov instance';
  }
}

// Some options to generate Twitter-ready strings
function newMarkov() {

  var options = {
    maxLength: 140,
    minWords: 10,
    minScore: 20,
  };

    //new instance
    markov = new Markov(data, options);
    console.log(markov);
    var markovStrings = [];
    // Build the corpus
    markov.buildCorpus();
}

//MARKOV part
/*
fs.readFile('./grimm.txt', 'utf8', function(err, contents) {
    //console.log(contents);
    var txt = contents.split(".");
    for(var i = 0; i < (txt.length-1); i++) {
      //txt[i] = ++txt[i];
      //console.log('NEW SENTENCE: '+txt[i]);
      data.push(txt[i]);
    }
});
*/
