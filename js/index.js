/* Start of Script ---------------------------------------------------------- */

$(document).ready(function() {
  $('#new-quote-button').click(function() {
    /* Get quote & refresh the app */
    getQuote(displayApp);
  });

  /* Tweet quote on Twitter bird click. */
  $('#twitter-bird').click(function() {
    const quote = $('#quote').text();
    const author = $('#author').text();
    $(this).attr(
      'href', `https://twitter.com/intent/tweet?text='${quote}' ${author}`
    );
  });
});


/* Globals ------------------------------------------------------------------ */

let idx = 0;


/* Function Declarations ---------------------------------------------------- */

/**
 * Get quote from FavQs API
 * URL: https://favqs.com
 * @param {function} callback
 */
function getQuote(callback) {
  $.ajax({
    url: 'https://favqs.com/api/qotd',
    timeout: 5000,
    success: function(quoteData) {
      /* Limit the character count to 140 */
      if (quoteData.quote.body.length <= 140) {
        callback(quoteData.quote);
      } else {
          getQuote(displayApp);
      }
    },
    error: function(error) {
      /* Fall back to a hardcoded quote */
      const quote = {
        'body': 'Be yourself; everyone else is taken.',
        'author': 'Oscar Wilde',
      };
      callback(quote);
    },
  });
}

/**
 * Display app
 * @param {Object} quoteData
 * @param {string} quoteData.body
 * @param {string} quoteData.author
 */
function displayApp(quoteData) {
  const quote = $('#quote');
  const author = $('#author');

  /* Quote */
  quote.fadeOut(250, function() {
    quote.text(quoteData.body).fadeIn(250);
  });

  /* Author */
  author.fadeOut(250, function() {
    author.text(quoteData.author).fadeIn(250);
  });

  /* Change bg color  */
  const bgColors = [
    '#FCD1CC', '#AEE0F9', '#FFF2B5', '#C3C5E6', '#D1FFBF', '#AEE0F9', '#FCD1CC',
    '#A8CBD1', '#F7C6D3',
  ];
  if (++idx >= bgColors.length) {
    idx = 0;
  }
  $('body').css('background-color', bgColors[idx]);
}


