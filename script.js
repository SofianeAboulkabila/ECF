document.cookie = 'cookie_name=cookie_value; SameSite=None; Secure'

let i = 1
const nbr = 3
const diaporama = document.getElementById('diaporama')

function setNextImage() {
  const div = document.createElement('div')
  div.className = 'photo'
  div.style.background = `url(im${i}.webp)`
  div.style.backgroundPosition = 'center'
  div.style.backgroundRepeat = 'no-repeat'
  div.style.backgroundSize = 'cover'
  diaporama.appendChild(div)
  i = (i % nbr) + 1

  if (diaporama.children.length > nbr) {
    diaporama.removeChild(diaporama.children[0])
  }

  const caption = document.createElement('div')
  caption.className = 'caption'
  caption.innerHTML = 'Bienvenue sur VinyLand! <br> La référence en matière de vinyles!'
  div.appendChild(caption)

  if (i === 1) {
    caption.style.backgroundColor = 'rgba(152, 114, 78, 0.712)' // couleur marron
  } else if (i === 2) {
    caption.style.backgroundColor = 'rgba(144, 238, 144, 0.712)' // couleur vert clair
  } else if (i === 3) {
    caption.style.backgroundColor = 'rgba(250, 128, 114, 0.712)' // couleur rouge clair
  }

  setTimeout(setNextImage, 5000)
}

setNextImage()

function updatePrice(itemName, increase, itemPrice) {
  const currentQuantity = cart[itemName] ? cart[itemName].quantity : 0;
  if (increase) {
    cart[itemName] = {
      quantity: currentQuantity + 1,
      totalPrice: (cart[itemName]?.totalPrice || 0) + itemPrice
    };
  } else {
    cart[itemName] = {
      quantity: Math.max(currentQuantity - 1, 0),
      totalPrice: (cart[itemName]?.totalPrice || 0) - itemPrice
    };
  }
  const quantityElement = document.querySelector(`#${itemName.replace(/ /g,"-")} .quantity`);
  if(quantityElement) {
    quantityElement.textContent = cart[itemName].quantity;
  }
  const priceElement = document.querySelector(`#${itemName.replace(/ /g,"-")} .price`);
  if(priceElement) {
    priceElement.textContent = cart[itemName].totalPrice.toFixed(2) + "€ TTC";
  }
}


let cart = {};

function addToCart() {
  alert("Panier mis à jour");
}


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


const form = document.querySelector('form');

// Désactive l'agrandissement du champ "Message"
const messageInput = document.getElementById('message');
messageInput.style.resize = 'none';


messageInput.addEventListener('input', validateMessage);

function validateMessage() {
  const message = messageInput.value.trim();
  const submitButton = document.getElementById('submit-button');
  if (message.length < 20) {
    messageInput.setCustomValidity("Le message doit contenir au moins 20 caractères.");
    submitButton.disabled = true;
  } else {
    messageInput.setCustomValidity("");
    submitButton.disabled = false;
  }
}


messageInput.addEventListener('input', validateMessage);

// Ajoute un gestionnaire d'événements au formulaire pour vérifier la case "J'accepte les conditions d'utilisation"
form.addEventListener('submit', (event) => {
  const acceptCheckbox = document.getElementById('accepter');
  if (!acceptCheckbox.checked) {
    alert("Veuillez accepter les conditions d'utilisation pour envoyer le message.");
    event.preventDefault();
  } else {
    alert("Votre message a bien été envoyé.");
  }
});