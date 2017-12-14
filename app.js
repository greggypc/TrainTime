

// Initialize Firebase
   var config = {
    apiKey: "AIzaSyBP-rFcXQ1n50pK97s4SL85tSSMmncAy8Q",
    authDomain: "fir-testproject-61539.firebaseapp.com",
    databaseURL: "https://fir-testproject-61539.firebaseio.com",
    projectId: "fir-testproject-61539",
    storageBucket: "fir-testproject-61539.appspot.com",
    messagingSenderId: "169699289852"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#buttonAddTrain").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destInput").val().trim();
  var trainTime = moment($("#trainTimeInput").val().trim(), 'HHmm').format("X");
  var frequency = $("#frequencyInput").val().trim();

  //Check for all inputs
	if(trainName === '' || destination === '' || trainTime === '' || frequency === '') {
	  alert("Please fill out all fields.");
	}else {
      database.ref().push({
  	  name: trainName,
      destination: destination,
      time: trainTime,
      frequency: frequency
  });
  }

  // Clears all of the text-boxes
  $("#trainNameInput").val("");
  $("#destInput").val("");
  $("#trainTimeInput").val("");
  $("#frequencyInput").val("");
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;

  //calculations
  var firstTrainTime = moment(trainTime, "HH:mm").subtract(1,"years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTrainTime), "minutes");
  var timeRemainder = diffTime % frequency;
  var minsAway = frequency - timeRemainder;
  var nextArrival = moment().add(minsAway, "minutes").format("hh:mm A");

  // Add each train's data into the table
  $("#trainSchedule> tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + minsAway + "</td></tr>");
});
