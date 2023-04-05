document.cookie = 'cookie_name=cookie_value; SameSite=None; Secure'


/* Ce code permet de créer un diaporama qui affiche trois images différentes à tour de rôle toutes les cinq secondes,
 avec une légende qui change de couleur à chaque changement d'image. Le diaporama est créé à partir d'un élément HTML ayant l'id 'diaporama', 
 qui doit exister dans la page. */

/* Création des variables */
let i = 1
const nbr = 3
const diaporama = document.getElementById('diaporama')

/* Fonction qui change l'image affichée et la légende */
function setNextImage() {
  const div = document.createElement('div') 
  div.className = 'photo'
  div.style.background = `url(im${i}.webp)`
  div.style.backgroundPosition = 'center'
  div.style.backgroundRepeat = 'no-repeat'
  div.style.backgroundSize = 'cover'
  diaporama.appendChild(div)
  i = (i % nbr) + 1 // incrémentation du compteur i, modulo

  /* Si le diaporama contient plus de trois images, la première est supprimée */
  if (diaporama.children.length > nbr) {
    diaporama.removeChild(diaporama.children[0])
  }

  /* Création de l'élément div qui contiendra la légende */
  const caption = document.createElement('div')
  caption.className = 'caption'
  caption.innerHTML = 'Bienvenue sur VinyLand! <br> La référence en matière de vinyles!'
  div.appendChild(caption)

  /* Changement de couleur de fond de la légende en fonction de l'image affichée */
  if (i === 1) {
    caption.style.backgroundColor = 'rgba(152, 114, 78, 0.712)' // couleur marron
  } else if (i === 2) {
    caption.style.backgroundColor = 'rgba(144, 238, 144, 0.712)' // couleur vert clair
  } else if (i === 3) {
    caption.style.backgroundColor = 'rgba(250, 128, 114, 0.712)' // couleur rouge clair
  }

  setTimeout(setNextImage, 5000) // appel récursif de la fonction setNextImage toutes les cinq secondes
}

setNextImage() // appel initial de la fonction setNextImage pour lancer le diaporama


/* La fonction "updatePrice" met à jour le prix et la quantité d'un article dans le panier de la boutique en ligne.
 Elle prend en paramètre le nom de l'article, un booléen pour savoir 
 s'il faut augmenter ou diminuer la quantité, et le prix de l'article. */
 function updatePrice(itemName, increase, itemPrice) {
  /* On commence par récupérer la quantité actuelle de l'article dans le panier,
   et on la stocke dans la variable "currentQuantity". Si l'article n'est pas déjà dans le panier, 
   on met la quantité à 0. */
  const currentQuantity = cart[itemName] ? cart[itemName].quantity : 0;
  /* Si "increase" est vrai, on ajoute un article au panier 
  (en augmentant la quantité et le prix total de l'article). Sinon, on enlève un article du panier
   (en diminuant la quantité et le prix total de l'article). */
  if (increase) {
    cart[itemName] = {
      quantity: currentQuantity + 1,
      totalPrice: (cart[itemName]?.totalPrice || 0) + itemPrice
    };
  } else {
    const currentCart = cart[itemName];
    if (currentCart) {
      const newQuantity = Math.max(currentQuantity - 1, 0);
      const newTotalPrice = Math.max(currentCart.totalPrice - itemPrice, 0);
      cart[itemName] = {
        quantity: newQuantity,
        totalPrice: newTotalPrice
      };
    }
  }
  /* On met ensuite à jour l'affichage de la quantité et du prix total de l'article dans la page HTML. */
  const quantityElement = document.querySelector(`#${itemName.replace(/ /g,"-")} .quantity`);
  if(quantityElement) {
    quantityElement.textContent = cart[itemName].quantity;
  }
  const priceElement = document.querySelector(`#${itemName.replace(/ /g,"-")} .price`);
  if(priceElement) {
    priceElement.textContent = cart[itemName].totalPrice.toFixed(2) + "€ TTC";
  }
}


// Initialise un objet panier vide
let cart = {};

// Fonction qui sera appelée lorsque l'utilisateur ajoute un élément au panier
function addToCart() {
  alert("Panier mis à jour");
}

// Ajoute un événement de clic à chaque bouton "Ajouter au panier"
document.querySelectorAll(".ajouter-panier").forEach(function (button) {
  button.addEventListener("click", function () {
    addToCart(button.id);
  });
});

// Ajouter un événement de clic pour le bouton "Panier"
document.querySelector("button[data-bs-target='#panierModal']").addEventListener("click", function () {

  let total = 0;
  let modalTableBody = document.querySelector("#panierTableBody");
  let modalTotal = document.querySelector("#panierTotal");

  // Ajouter les éléments du panier au tableau dans la modale
modalTableBody.innerHTML = "";
Object.entries(cart).forEach(function ([itemName, item]) {
  let tr = document.createElement("tr");
  let itemNameTd = document.createElement("td");
  let quantityTd = document.createElement("td");
  let totalPriceTd = document.createElement("td");
  let itemImageTd = document.createElement("td");
  let itemImage = document.createElement("img");

  itemNameTd.textContent = itemName;
  quantityTd.textContent = item.quantity;
  totalPriceTd.textContent = item.totalPrice.toFixed(2) + "€";
  itemImage.src = itemName + ".webp";
  itemImage.width = "32";
  itemImage.height = "32";

  tr.appendChild(itemImageTd);
  itemImageTd.appendChild(itemImage);
  tr.appendChild(itemNameTd);
  tr.appendChild(quantityTd);
  tr.appendChild(totalPriceTd);
  modalTableBody.appendChild(tr);

  total += item.totalPrice;
});


  // Afficher le total du panier dans la fenêtre modale
  modalTotal.textContent = total.toFixed(2) + "€";

  // Ouvrir la modale
  let panierModal = new bootstrap.Modal(document.querySelector("#panierModal"));
  panierModal.show();


});

// Sélectionne le formulaire
const form = document.querySelector('form');

// Désactive l'agrandissement du champ "Message"
const messageInput = document.getElementById('message');
messageInput.style.resize = 'none';

// Ajoute un gestionnaire d'événements pour valider le champ "Message"
messageInput.addEventListener('input', validateMessage);

function validateMessage() {
  const message = messageInput.value.trim();
  const submitButton = document.getElementById('submit-button');
  // Si le message est trop court, affiche un message d'erreur et désactive le bouton d'envoi
  if (message.length < 20) {
    messageInput.setCustomValidity("Le message doit contenir au moins 20 caractères.");
    submitButton.disabled = true;
    // Sinon, efface le message d'erreur et active le bouton d'envoi
  } else {
    messageInput.setCustomValidity("");
    submitButton.disabled = false;
  }
}


messageInput.addEventListener('input', validateMessage);

// Ajoute un gestionnaire d'événements au formulaire pour vérifier la case "J'accepte les conditions d'utilisation"
form.addEventListener('submit', (event) => {
  const acceptCheckbox = document.getElementById('accepter');
   // Si la case "J'accepte les conditions d'utilisation" n'est pas cochée, affiche un message d'erreur et empêche l'envoi du formulaire
  if (!acceptCheckbox.checked) {
    alert("Veuillez accepter les conditions d'utilisation pour envoyer le message.");
    event.preventDefault();
  } else {
    alert("Votre message a bien été envoyé.");
  }
});

// Récupère les données météorologiques de Marseille à partir de l'API Weatherstack
const apiKey = 'bdb54dd97ca6bcdd31718e150573358d';
const city = 'Marseille';

fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const cityNameElement = document.getElementById('city-name');
    const temperatureElement = document.getElementById('temperature');
    const weatherIconElement = document.getElementById('weather-icon');
     // Affiche le nom de la ville dans l'élément correspondant
    if (data && data.location && data.location.name) {
      cityNameElement.textContent = data.location.name;
    }
    // Affiche la température actuelle dans l'élément correspondant
    if (data && data.current && data.current.temperature) {
      temperatureElement.textContent = data.current.temperature + '°C';
    }
    // Affiche l'icône météorologique et sa description dans les éléments correspondants  
    if (data && data.current && data.current.weather_icons && data.current.weather_icons[0]) {
      weatherIconElement.src = data.current.weather_icons[0];
      weatherIconElement.alt = data.current.weather_descriptions[0];
    }
  })
  .catch(error => {
    console.error(error);
  });