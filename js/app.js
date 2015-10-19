var WereWolf = {
  showLoader: function() {
    $('#result .loading').removeClass('hidden');
  },
  hideLoader: function() {
    $('#result .loading').addClass('hidden');
  },
  fetchConfig: function(playersCount) {
    $.ajax({
      url: "https://were-wolf.herokuapp.com/suggest",
      jsonp: "callback",
      dataType: "jsonp",
      data: {players: playersCount},
      success: WereWolf.showResult
    });
  },
  showResult: function(data){
    WereWolf.hideLoader();
    $('#result').append(JSON.stringify(data));
  }
}

$(document).ready(function() {
  $('#ask-trigger').click(function() {
    WereWolf.showLoader();
    WereWolf.fetchConfig($('#players-count').val());
  });
});
