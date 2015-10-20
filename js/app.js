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
    $('#result .data').removeClass('hidden');
    WereWolf.populatePlayersData(data.players);
    WereWolf.populateProbabilitiesData(data.probabilities);
  },
  populatePlayersData: function(players) {
    playersData = "";
    for(var playerType in players) {
      playersData += "<dt>" + playerType + "</dt>";
      playersData += "<dd>" + players[playerType] + "</dd>";
    }
    $('#result dl.players').html(playersData);
  },
  populateProbabilitiesData: function(probabilities) {
    probabilitiesData = "";
    for(var probabilityType in probabilities) {
      probabilitiesData += "<dt>" + probabilityType.split("_")[0] + "</dt>";
      probabilitiesData += "<dd>" + probabilities[probabilityType] + "%</dd>"
    }
    $('#result dl.probabilities').html(probabilitiesData);
  }
}

$(document).ready(function() {
  $('#ask-trigger').click(function() {
    WereWolf.showLoader();
    WereWolf.fetchConfig($('#players-count').val());
  });
});
