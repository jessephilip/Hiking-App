var name;
var photoURL;
var url;
var trailName;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD8E_ldij-eqNtnNEC4lVOsoo0TIX8H4P0",
    authDomain: "ranger-155816.firebaseapp.com",
    databaseURL: "https://ranger-155816.firebaseio.com",
    storageBucket: "ranger-155816.appspot.com",
    messagingSenderId: "927765344047"
};
firebase.initializeApp(config);

  // Get a reference to the database service
var database = firebase.database();


database.ref().orderByChild("dateAdded").limitToLast(20).on("child_added", function(childsnapshot) {

      photoURL = childsnapshot.val().url;
      trailName = childsnapshot.val().name;
      $(".photoBlock").append("<div class= \"photo\">"+"<h3 class=\"capitalize\">"+trailName+"</h3 > "+" < img src = \" "+photoURL +" \" > </div>");

},
function(errorObject) {

// In case of error this will print the error
console.log("The read failed: " + errorObject.code);
});

$("#photoSubmit").on("click", function(event) {
event.preventDefault();
url = $("#photoInput").val().trim();
name = $("#nameInput").val().trim();

//if users doesnt input both values, it will prevent a post
if (url.length === 0 || name.length === 0) {
    return;

} else {
    database.ref().push({name: name, url: url, dateAdded: firebase.database.ServerValue.TIMESTAMP});
}

});
