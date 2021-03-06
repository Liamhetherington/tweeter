function createTweetElement(tweet) {
  let $tweet = $('<article>').addClass('tweet');
  let $header = $('<header>');
    let $userAvatar = $('<img>').attr('src', tweet.user.avatars.large);
    let $userID = $('<h3>').text(tweet.user.name);
    let $userHandle = $('<h2>').text(tweet.user.handle);

  let $content = $('<div>');
    let $userNewTweet = $('<p>').text(tweet.content.text);

  let $footer = $('<footer>');
    let $date = moment(tweet.created_at).fromNow();
    let $like = $('<img>').addClass('icon').attr('src',"https://img.icons8.com/material/24/000000/facebook-like.png");
    let $retweet = $('<img>').addClass('icon').attr('src', "https://img.icons8.com/ios/50/000000/retweet-filled.png");
    let $flag = $('<img>').addClass('icon').attr('src', "https://img.icons8.com/ios/50/000000/flag-filled.png");

    $header
    .append($userAvatar)
    .append($userID)
    .append($userHandle);
    $content
    .append($userNewTweet);
    $footer
    .append($date)
    .append($flag)
    .append($like)
    .append($retweet)
    $tweet
    .append($header)
    .append($content)
    .append($footer);
  return $tweet;
}

function renderTweets (tweets) {
 $('.tweet-container').empty();
 let $newContainer = $('.tweet-container');
 tweets.forEach(function (tweet) {
  let $post = createTweetElement(tweet)
  $newContainer.prepend($post)
  })
}

function loadTweets () {
  $.ajax({
    type: "GET",
    url: '/tweets',
    data: JSON,
    success: function (data) {
      renderTweets(data)
    }
  })
}

loadTweets();

$(document).ready(function () {

  $('.compose').on("click", function () {
    $('.new-tweet').slideToggle() && $('#tweetinput').focus();
  });

   $(function () {
    let $submission = $('form');
    $submission.submit("submit", function (event) {
    $('#long-error').hide();
    $('#empty-error').hide();

      let tweetLength = $('#tweetinput').val().length;
      event.preventDefault();
      if (tweetLength === 0 || tweetLength === " " || tweetLength === null) {
        $('#empty-error').hide().slideToggle();
      } else if (tweetLength > 140) {
        $('#long-error').hide().slideToggle();
      } else {
        $.ajax({
          type: 'POST',
          url:'/tweets',
          data: $('#new-post').serialize(),
          success:(function () {
             loadTweets();
             $('#tweetinput').val('');
             $('.counter').text(140)
          })
        })
      }
    });
  });
});