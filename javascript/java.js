topics = [
    "basketball",
    "soccer",
    "hockey",
    "tennis",
    "swimming",
    "waterpolo"
]
  
//Function to create buttons
function createButtons() {
$('#sportButtons').empty();
for (i=0;i<topics.length;i++) {
    $('#sportButtons').append(`<button data-sport="${topics[i]}" data-state="still">${topics[i]}</button>`)
}
$("button").on("click", function() {
    let sport = $(this).attr("data-sport");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      sport + "&api_key=tXqajQtcY23aO672C11wYe8MSiNCLoMG&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        let results = response.data;

        for (let i = 0; i < results.length; i++) {
          let gifDiv = $("<div class='item'>");

          let rating = results[i].rating;

          let ratingP = $("<p>").text("Rating: " + rating);

          let sportImage = $("<img>");
          sportImage.attr("src", results[i].images.fixed_height_still.url);

          gifDiv.prepend(sportImage);
          gifDiv.prepend(ratingP);
         

          $("#sports").prepend(gifDiv);
        
          
          $("img").on("click",function() {
            sportImage.attr("src", results[i].images.fixed_height.url);

            $("img").on("click",function() {
                sportImage.attr("src", results[i].images.fixed_height_still.url);
            })
        })
        }

        
      });
  });
}

//Adding new sport add functionality
$("#addSport").on("click", function(event) {
    event.preventDefault();
    let inputSport = $("#sport-input").val().trim();
    topics.push(inputSport);
    createButtons();
})

createButtons();