var firebaseConfig = {
  apiKey: "AIzaSyD19t4Q2_YUvCy4-EidcFDz0p2LP2aAj74",
  authDomain: "traintime-46b2f.firebaseapp.com",
  databaseURL: "https://traintime-46b2f.firebaseio.com",
  projectId: "traintime-46b2f",
  storageBucket: "traintime-46b2f.appspot.com",
};

firebase.initializeApp(firebaseConfig);
var dataRef = firebase.database();

$("#runTrain").on("click", function (event) {
  event.preventDefault();

  trainName = $("#trainNameInput").val().trim();
  destination = $("#destinationInput").val().trim();
  firstTrainTime = $("#firstTrainInput").val().trim();
  frequency = $("#frequencyInput").val().trim();

  console.log(trainName);
  console.log(destination);

  dataRef.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP,
  });
});
dataRef.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var trainName1 = childSnapshot.val().trainName;
  var destination1 = childSnapshot.val().destination;
  var firstTrainTime1 = childSnapshot.val().firstTrainTime;
  var frequency1 = childSnapshot.val().frequency;

  console.log("trainName1");
  var firstTimeConverted = moment(firstTrainTime1, "HH:mm");
  var currentTime = moment();
  var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  var tRemainder = diffTime % frequency1;
  var tMinutesTillTrain = frequency1 - tRemainder;
  var nextTrain = currentTime.add(tMinutesTillTrain, "minutes");

  var newRow = $("<tr>").append(
    $("<td>").text(trainName1),
    $("<td>").text(destination1),
    $("<td>").text(frequency1),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain),
  );
  console.log(newRow);

  $(".table-primary > tbody").append(newRow);
});
