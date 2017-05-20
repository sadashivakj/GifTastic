	
      // Declare initial array of animals
      var animals = ["Dog", "Cat", "Rabbit", "Hamster"];

      // This function will render the buttons
      function renderButtons(){

      	console.log("Entering renderButtons function");

      	//Clear the existing set of buttons
      	$("#buttons").empty();

      	for(var i=0; i<animals.length; i++){
      		console.log(animals[i]);
      		var btn = $("<button>");
      		btn.addClass("animal");
      		btn.attr("data-name", animals[i]);
      		btn.text(animals[i]);
      		$("#buttons").append(btn);
      	}

      	console.log("Exiting renderButtons function");
      }

      //when Add Animal button is clicked 
      $("#add_animal").on("click", function(event){
      	console.log("entering inside the button clicked event function");
      	event.preventDefault();
      	//get the input 
      	var animal = $("#animal_input").val();
      	console.log("New animal entered by user - "+animal);

      	animals.push(animal);
      	// Calling renderButtons which handles the processing of our animal array
      	console.log("Updated animals array - "+animals);
      	renderButtons();
      	console.log("Exiting button clicked event function");
      })

      function displayAnimalGif(){
      	console.log("Entering displayAnimalGif function");
      	//get the animal button selected by the user 
      	var animal = $(this).attr("data-name");
      	console.log("Selected Animal - "+animal);

      	//construct queryURL to make gif API call to get 5 gif images
      	//var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="+animal;
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=5";

      	console.log("queryURL before making ajax call - "+queryURL);
      	
      	//make the ajax call to gif API
      	$.ajax({
      		url: queryURL,
      		method: "GET"
      	}).done(function(response){ // perform operation on the response
                  console.log("Got the output from the api call - "+response);
                  var results = response.data;
                  console.log("results object - "+results);
                  console.log("number of elements in the array - "+results.length);
                  for(var j = 0; j < results.length; j++){
                        console.log("entering the for loop");
                        var gifDiv = $("<div class='item'>");
                        var rating = results[j].rating;
                        console.log("rating - "+rating);
                        var p = $("<p>").text("Rating: " +rating);
                        //dynamically create an image tag for the animal
                        var animalImage = $("<img>");
                        var imageUrl = results[j].images.fixed_height.url;
                        console.log("imageUrl - "+imageUrl);
                        //add the src tag and assign the gif image url
                        animalImage.attr("src", imageUrl);
                        animalImage.attr("alt", animal+" image");
                        gifDiv.prepend(p);
                        gifDiv.prepend(animalImage);
                        //prepend the gif image based on the response 
                        $("#display_gif").prepend(gifDiv);
                        console.log("Going to the next element of the for loop");
                  }
            });
      	console.log("Exiting displayAnimalGif function");
      }

      // Function for displaying animal info Using $(document).on to add event listeners to dynamically generated elements
      $(document).on("click", ".animal", displayAnimalGif);

      //Call this function to display initialize set of buttons 
      renderButtons();