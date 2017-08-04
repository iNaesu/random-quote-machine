var idx = 0;

/* Render new quote on button click. */
$("#new-quote-button").click(function() {
  /* Get and render quote. */
  $.getJSON( "https://favqs.com/api/qotd", function(data) {
    $("#quote").fadeOut(250, function() {
      $("#quote").text(data.quote.body).fadeIn(250);
    });
    $("#author").fadeOut(250, function() {
      $("#author").text(data.quote.author).fadeIn(250);
    });
    
    /* Change bg color.  */
    var bgColors = ["#FCD1CC", "#AEE0F9", "#FFF2B5", "#C3C5E6", "#D1FFBF", "#AEE0F9", "#FCD1CC", "#A8CBD1", "#F7C6D3"];
    if (++idx >= bgColors.length) {
      idx = 0;
    }
    $("#background").css("background-color", bgColors[idx]);
  });
});

/* Tweet quote on Twitter bird click. */
$("#twitter-bird").click(function() {
  var quote = $("#quote").text();
  var author = $("#author").text();
  
  $(this).attr("href", `https://twitter.com/intent/tweet?text=\"${quote}\" ${author}`);
});