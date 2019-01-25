$(function () {
  $("#compose").click(function () {
    $(".new-tweet").toggle(400, "linear");
    $(".newTweet").focus();
  });

// ******************** AJAX STUFF ******************** //

  function loadTweets() {
    $.ajax({
      method: 'get',
      url: '/tweets',

      }).done(function(res){
        renderTweets(res);
    }); //ajax call finishes here

  }

  $("#submitTweet").submit( function(event) {
    event.preventDefault();
    const textChar = $(this).serialize();
    console.log("This is TextCha", textChar);
    const textLength = $(".newTweet").val().length;
    if (textLength === 0){
      $(".error").text("Please enter a message").slideDown();
      return false;
    } else if (textLength > 140) {
      $(".error").text("Please get your characters under 140!").slideDown();
      return false;
    }

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: textChar,
    }).done(function(){
       loadTweets();
      $('#submitTweet').get(0).reset();
      $(".error").hide();
      $(".counter").text("140");
    })

  });



// ******************** AJAX STUFF ENDED **************** //

  function createTweetElement(data) {
    var tweetUser = data.user.name;
    var tweetAvatars = data.user.avatars.small;
    var tweetHandle = data.user.handle;
    var tweetContent = data.content.text;
    var tweetCreated = moment(data.created_at).fromNow();


    var $tweet = $("<article>").addClass('tweet').html(

      `<header>
        <div><img src="${tweetAvatars}"></div>
        <div><h2>${tweetUser}</h2></div>
        <div class="tweetHandle"><h4>${tweetHandle}</h4></div>
      </header>
        <p>${tweetContent}</p>
      <footer>
        ${tweetCreated}
      </footer>`
    )

    return $tweet;
  }

  function renderTweets(tweets) {
   $("#tweet_container").empty();
    for (let tweet of tweets) {
      var $tweet = createTweetElement(tweet);
      $('#tweet_container').prepend($tweet);
    }
  }

  loadTweets()
});



