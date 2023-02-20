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


// Detect authorization state



// References
    var rumbox = document.getElementById('flexRadioDefault2Rum');
    var vodkabox = document.getElementById("flexRadioDefault1Vodka");
    var tequilabox = document.getElementById("flexRadioDefault1Tequila");
    var ginbox = document.getElementById("flexRadioDefault2Gin");
    var whiskeybox = document.getElementById("flexRadioDefault1Whiskey");

    var insBtn = document.getElementById("Insbtn");
    var selBtn = document.getElementById("Selbtn");
    var upBtn = document.getElementById("Upbtn");
    var delBtn = document.getElementById("Delbtn");

// Insert data function 
    function InsertData(){
        const data = getDatabase();
        set(ref(data, "TheRecipes/" + selector.value),{
            Rumbox: rumbox.value,
            Vodkabox: vodkabox.value,
            Tequilabox: tequilabox.value,
            Ginbox: ginbox.value,
            Whiskeybox: whiskeybox.value,
    })
    .then(() => {
        alert("data stored successfully");
        
    })
    .catch((error) => {
            alert("unsuccessful, error"+error);
        });
}

// Select Data
function SelectData(){
    const dbref = ref(getDatabase());

    get(child(dbref, "TheRecipes/"+ selector.value)).then((snapshot)=>{
       if(snapshot.exist()){
        rumbox.value = snapshot.val().Rumbox;
        vodkabox.value = snapshot.val().Vodkabox;
        tequilabox.value = snapshot.val().Tequilabox;
        ginbox.value = snapshot.val().Ginbox;
        whiskeybox.value = snapshot.val().Whiskeybox;
       }
       else{
        console.log("No data found");
       }
    })
    .catch((error) => {
            console.error(error);
        });
}

// Update data function
function UpdateData(){
    const data = getDatabase();
    update(ref(data, "TheRecipes/" + rumbox.value),{
        Rumbox: rumbox.value,
        Vodkabox: vodkabox.value,
        Tequilabox: tequilabox.value,
        Ginbox: ginbox.value,
        Whiskeybox: whiskeybox.value,
})
.then(() => {
    alert("data updated successfully");
    
})
.catch((error) => {
        alert("unsuccessful, error"+error);
    });
}

// Remove data function
function DeletetData(){
    const data = getDatabase();
    push(ref(data, "TheRecipes/" + selector.value))
.then(() => {
    alert("data removed successfully");
    
})
.catch((error) => {
        alert("unsuccessful, error"+error);
    });
}

//Query slelector
window.onload-function(){
document.getElementById('formBid').addEventListener('submit',function(e){
    e.preventDefault();
    var id=Date.now();  //generating a unqiue id
    set(ref(db,'TheRecipes/' + id),{
        flexRadioDefault1Tequila:document.querySelectorAll('input[id="flexRadioDefault1Tequila"]:checked'),
      
    });
    alert('Recipes found');
    formBid.reset();
});
}

// Assign Events to Btns
window.onload-function(){

insBtn.addEventListener('click', InsertData);
selBtn.addEventListener('click', SelectData);
upBtn.addEventListener('click', UpdateData);
delBtn.addEventListener('click', DeletetData);
}
