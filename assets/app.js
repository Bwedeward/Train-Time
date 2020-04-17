var firebaseConfig = {
  apiKey: "AIzaSyD5QLgGbt3yxc7ioXXFcwXB5_xQKPTZfqw",
  authDomain: "codingbootcamp-f0e70.firebaseapp.com",
  databaseURL: "https://codingbootcamp-f0e70.firebaseio.com",
  projectId: "codingbootcamp-f0e70",
  storageBucket: "codingbootcamp-f0e70.appspot.com",
};

firebase.initializeApp(firebaseConfig);
var dataRef = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";

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
