// Sélection de l'élément HTML affichant l'argent et initialisation avec la valeur sauvegardée ou 0
const money = document.getElementById('money');
let savedMoney = localStorage.getItem('money');
money.innerText = (savedMoney !== null && !isNaN(savedMoney) ? parseInt(savedMoney) : 0) + '$';

// Sélection des éléments HTML pour les interactions avec l'utilisateur
const click = document.getElementById('click');
const showModal = document.getElementById('shop');
const modal = document.getElementById('modal');
const buyX10 = document.getElementById('buyButtonX10');
const buyX10disabled = document.getElementById('buyButtonX10disabled');
const buyX20 = document.getElementById('buyButtonX20');
const buyX20disabled = document.getElementById('buyButtonX20disabled');
const buyX50 = document.getElementById('buyButtonX50');
const buyX50disabled = document.getElementById('buyButtonX50disabled');
const buyX100 = document.getElementById('buyButtonX100');
const buyX100disabled = document.getElementById('buyButtonX100disabled');

// Charger moneyIncrement depuis le stockage local ou utiliser la valeur par défaut (1)
let moneyIncrement = parseInt(localStorage.getItem('moneyIncrement')) || 1;
let hiddenButtons = JSON.parse(localStorage.getItem('hiddenButtons')) || [];
let shownButtons = JSON.parse(localStorage.getItem('shownButtons')) || [];

// Si des identifiants sont enregistrés, masquer et afficher les boutons correspondants
hiddenButtons.forEach(buttonId => document.getElementById(buttonId).classList.add('hidden'));
shownButtons.forEach(buttonId => document.getElementById(buttonId).classList.remove('hidden'));

// Fonction pour incrémenter l'argent
function increaseMoney() {
    let currentMoney = parseInt(money.innerText);
    let newMoney = currentMoney + moneyIncrement;
    money.innerText = newMoney + ' $';
    localStorage.setItem('money', newMoney); // Sauvegarde du nouvel argent dans le stockage local
}

// Écouteur d'événement pour le clic
click.addEventListener('click', increaseMoney);

// Interval pour incrémenter l'argent automatiquement
setInterval(increaseMoney, 1000);

// Afficher le modal lors du clic sur le bouton
showModal.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

// Fermer le modal lors du clic sur le bouton de fermeture
closeModal.addEventListener("click", () => {
    modal.classList.add('hidden');
});

// Fonction pour acheter un bonus x10, x20, x50 ou x100
function buyBonus(incrementValue, cost, buttonToHide, buttonToShow) {
    let currentMoney = parseInt(money.innerText);
    if (currentMoney >= cost) {
        money.innerText = (currentMoney - cost) + ' $';
        moneyIncrement = incrementValue;
        localStorage.setItem('moneyIncrement', moneyIncrement);
        buttonToHide.classList.add('hidden');
        buttonToShow.classList.remove('hidden');
        // Ajouter les IDs des boutons masqués et affichés aux tableaux
        hiddenButtons.push(buttonToHide.id);
        shownButtons.push(buttonToShow.id);
        // Enregistrer les tableaux d'IDs de boutons dans le stockage local
        localStorage.setItem('hiddenButtons', JSON.stringify(hiddenButtons));
        localStorage.setItem('shownButtons', JSON.stringify(shownButtons));
    } else {
        alert('Vous n\'avez pas assez d\'argent pour acheter cet article');
    }
    modal.classList.add('hidden');
}


buyX10.addEventListener('click', () => buyBonus(10, 100, buyX10, buyX10disabled)); // appelle la fonction buyBonus avec les paramètres correspondants
buyX20.addEventListener('click', () => buyBonus(20, 500, buyX20, buyX20disabled)); // appelle la fonction buyBonus avec les paramètres correspondants
buyX50.addEventListener('click', () => buyBonus(50, 1500, buyX50, buyX50disabled)); // appelle la fonction buyBonus avec les paramètres correspondants
buyX100.addEventListener('click', () => buyBonus(100, 3500, buyX100, buyX100disabled)); // appelle la fonction buyBonus avec les paramètres correspondants