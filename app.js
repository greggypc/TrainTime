

// Initialize Firebase
   var config = {
    apiKey: "AIzaSyBP-rFcXQ1n50pK97s4SL85tSSMmncAy8Q",
    authDomain: "fir-testproject-61539.firebaseapp.com",
    databaseURL: "https://fir-testproject-61539.firebaseio.com",
    projectId: "fir-testproject-61539",
    storageBucket: "",
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

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: destination,
    time: trainTime,
    frequency: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Clears all of the text-boxes
  $("#trainNameInput").val("");
  $("#destInput").val("");
  $("#trainTimeInput").val("");
  $("#frequencyInput").val("");
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;

  // Prettify the employee start
  var trainTimeFormatted = moment.unix(trainTime).format('HHmm');

  var nextArrival = 12345;

  var minsAway = 54321;

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  // var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  // console.log(empMonths);

  // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  // Add each train's data into the table
  $("#trainSchedule> tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + minsAway + "</td></tr>");
});
