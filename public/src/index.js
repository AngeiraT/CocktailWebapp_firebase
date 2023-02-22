import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import { getDatabase, ref, set, get, child, update, push} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

// Firebase configuration
const firebaseApp = initializeApp({
    apiKey: "AIzaSyC6hfthMOXTzCiOVuyIzKf5010eumTYg6Q",
    authDomain: "cocktail-selector-6b974.firebaseapp.com",
    projectId: "cocktail-selector-6b974",
    storageBucket: "cocktail-selector-6b974.appspot.com",
    messagingSenderId: "682099494306",
    appId: "1:682099494306:web:6013d2bfb7f4b4e98c36fb"
});

// Initialize firebase
const db = getFirestore(firebaseApp);
const data = getDatabase(firebaseApp);


// Method to add an event listener to the checkbox.

var checkbox = document.getElementById("myCheckbox");

checkbox.addEventListener("change", function() {
  if (this.checked) {
    // Checkbox is checked.
    // Store data to Firebase.
    database.ref('checkedValue').set(true);
  } else {
    // Checkbox is unchecked.
    // Remove data from Firebase.
    database.ref('checkedValue').set(false);
  }
});

 // Read data. Retrived data to update the checkbox state
 var checkbox = document.getElementById("myCheckbox");

database.ref('checkedValue').once('value', function(snapshot) {
  var isChecked = snapshot.val();

  checkbox.checked = isChecked;
});


// Retrieve the values of the checked checkboxes from the form and store them in an array.
const checkboxes = document.querySelectorAll('input[type="radio"]:checked');
const selectedSpirits = [];
checkboxes.forEach((checkbox) => {
  selectedSpirits.push(checkbox.value);
});

// Store the cocktail recipe in the Firebase database for future reference. You can use a Firebase database write operation to add the cocktail recipe to the database.
firebase.database().ref('cocktails').push({
    name: recipeName,
    ingredients: selectedSpirits,
    instructions: recipeInstructions
  });

    
    const saveButton = document.querySelector('#save-button');
  saveButton.addEventListener('click', () => {
    // Save the cocktail recipe to the database
    firebase.database().ref('cocktails').push({
      name: recipeName,
      ingredients: selectedSpirits,
      instructions: recipeInstructions
    });
  
    // Update the UI to let the user know that the recipe has been saved
    const message = document.createElement('p');
    message.textContent = 'Cocktail recipe saved!';
    document.body.appendChild(message);
  });
  
 // How to store spirits
 // Initialize Firebase
var firebaseConfig = {
    // Your Firebase project configuration
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the Firebase Realtime Database
  var database = firebase.database();
  
  // Listen to changes in the form
  var form = document.querySelector('#cocktail-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    // Get the selected spirit values
    var spirits = [];
    var checkboxes = form.querySelectorAll('input[name="spirit"]:checked').value;
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        spirits.push(checkboxes[i].value);
      }
    }
    // Store the selected spirits in Firebase
    var recipeRef = database.ref('cocktail-recipes').push();
    recipeRef.set({
      spirits: spirits
    });
  });

  const functions = require('firebase-functions');
  const admin = require('firebase-admin');
  const axios = require('axios');
  
  admin.initializeApp();
  
  exports.generateCocktailRecipe = functions.database.ref('cocktail-recipes/{recipeId}/spirits')
    .onWrite(async (change, context) => {
      // Get the selected spirits from the database
      const recipeId = context.params.recipeId;
      const spirits = change.after.val();
      // Call the cocktail recipe API
      const response = await axios.get(`https://example.com/recipes?spirits=${spirits.join(',')}`);
      const recipe = response.data;
      // Store the generated recipe in the database
      const recipeRef = admin.database().ref(`cocktail-recipes/${recipeId}`);
      recipeRef.update({
        recipe: recipe
      });
    });
  

  
  
  
  
  const form = document.querySelector('form');
  const database = firebase.database();
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const checkedSpirit = document.querySelector('input[name="spirit"]:checked').value;
    database.ref('selectedSpirit').set(checkedSpirit);
    // generate a cocktail recipe based on the selected spirit and store it in Firebase as well
  });
  

