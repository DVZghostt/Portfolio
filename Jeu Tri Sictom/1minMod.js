<<<<<<< HEAD
document.getElementById("timer").textContent = `⏳ Temps restant : ${tempsRestant}s`;
document.getElementById("end-overlay").style.display = "none";

let jeuActif = false;
let money = 0;
let score = 0;
let erreur = 0;

const moneyElement = document.getElementById("money");
moneyElement.textContent = `💰 Money : ${0}€`;

const scoreElement = document.getElementById("score");
scoreElement.textContent = `😁 Score : ${0}`;
const gainFeedback = document.getElementById("gain-feedback");

const erreurElement = document.getElementById("erreur");
erreurElement.textContent = `😡 Erreur : ${0}`;
const erreurFeedback = document.getElementById("erreur-feedback");

let dechetActuel;
const elementDechet = document.getElementById("trash-item");
const dechets = [
  // ♻️ Jaune : emballages, plastiques, métaux
  { emoji: "🥫", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // boîte de conserve
  { emoji: "🧴", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // bouteille plastique
  { emoji: "🧃", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // brique de jus
  { emoji: "🥤", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // gobelet plastique
  { emoji: "🛍️", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },     // sac plastique
  { emoji: "📦", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // carton
  { emoji: "📰", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // journal
  { emoji: "📃", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // feuille
  { emoji: "📄", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // papier A4
  { emoji: "📚", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // vieux livre
  { emoji: "🧃", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // bouteille de jus (en verre)
  { emoji: "🧻", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // papier toilette usagé

  // 🍃 Compost : déchets organiques
  { emoji: "🍌", poubelle: "bin-compost", namebin: "Composteur" },      // banane (emballage)
  { emoji: "🍎", poubelle: "bin-compost", namebin: "Composteur" },    // pomme
  { emoji: "🥕", poubelle: "bin-compost", namebin: "Composteur" },    // épluchure de carotte
  { emoji: "🥔", poubelle: "bin-compost", namebin: "Composteur" },    // patate
  { emoji: "🍞", poubelle: "bin-compost", namebin: "Composteur" },    // pain
  { emoji: "🍂", poubelle: "bin-compost", namebin: "Composteur" },    // feuilles mortes
  { emoji: "🍇", poubelle: "bin-compost", namebin: "Composteur" },      // raisins abîmés
  { emoji: "🍓", poubelle: "bin-compost", namebin: "Composteur" },      // fraises pourries
  { emoji: "🥬", poubelle: "bin-compost", namebin: "Composteur" },      // feuille de salade
  { emoji: "🌽", poubelle: "bin-compost", namebin: "Composteur" },      // épi de maïs
  { emoji: "🍍", poubelle: "bin-compost", namebin: "Composteur" },      // trognon d’ananas
  { emoji: "🫐", poubelle: "bin-compost", namebin: "Composteur" },      // myrtilles écrasées
  { emoji: "🍉", poubelle: "bin-compost", namebin: "Composteur" },      // reste de pastèque
  { emoji: "🥒", poubelle: "bin-compost", namebin: "Composteur" },      // tranche de concombre
  { emoji: "🍋", poubelle: "bin-compost", namebin: "Composteur" },      // zeste de citron
  { emoji: "🧄", poubelle: "bin-compost", namebin: "Composteur" },      // épluchure d’ail
  { emoji: "🧅", poubelle: "bin-compost", namebin: "Composteur" },      // épluchure d’oignon

  // 🟢 Verte : verre
  { emoji: "🍾", poubelle: "bin-verte", namebin: "Poubelle verte" },      // bouteille de verre
  { emoji: "🥂", poubelle: "bin-verte", namebin: "Poubelle verte" },      // verre
  { emoji: "🧪", poubelle: "bin-verte", namebin: "Poubelle verte" },      // flacon en verre
  { emoji: "🍷", poubelle: "bin-verte", namebin: "Poubelle verte" },      // verre à vin
  { emoji: "🍶", poubelle: "bin-verte", namebin: "Poubelle verte" },      // bouteille de sake / sauce
  { emoji: "🥃", poubelle: "bin-verte", namebin: "Poubelle verte" },      // verre à whisky
  { emoji: "🫙", poubelle: "bin-verte", namebin: "Poubelle verte" },      // pot en verre (confiture)
  { emoji: "🍸", poubelle: "bin-verte", namebin: "Poubelle verte" },      // verre à cocktail
  { emoji: "🫗", poubelle: "bin-verte", namebin: "Poubelle verte" },      // contenant à verser (carafe en verre)

  // ⚫ Grise : ordures ménagères
  { emoji: "💡", poubelle: "bin-grise", namebin: "Poubelle Grise" },      // ampoule
  { emoji: "🧦", poubelle: "bin-grise", namebin: "Poubelle Grise" },      // vieille chaussette
  { emoji: "🍗", poubelle: "bin-grise", namebin: "Poubelle Grise" },      // os de poulet
  { emoji: "🍽️", poubelle: "bin-grise", namebin: "Poubelle Grise" },     // vaisselle cassée
  { emoji: "🧼", poubelle: "bin-grise", namebin: "Poubelle Grise" },     // savon usé
  { emoji: "🧽", poubelle: "bin-grise", namebin: "Poubelle Grise" },     // éponge usée
  { emoji: "🦴", poubelle: "bin-grise", namebin: "Poubelle Grise" },     // os (non compostables)
  { emoji: "🧤", poubelle: "bin-grise", namebin: "Poubelle Grise" },     // gant usagé
  { emoji: "🩹", poubelle: "bin-grise", namebin: "Poubelle Grise" },     // pansement
  { emoji: "🦷", poubelle: "bin-grise", namebin: "Poubelle Grise" },     // dent / os usé (fun 🤓)
  { emoji: "🪥", poubelle: "bin-grise", namebin: "Poubelle Grise" },     // brosse à dents
  { emoji: "🧦", poubelle: "bin-grise", namebin: "Poubelle Grise" },     // (déjà présente) chaussette

    // ⚫ Decheterie: autre
  { emoji: "🌲", poubelle: "bin-dechet", namebin: "Déchèterie" },      // arbre
  { emoji: "🛋️", poubelle: "bin-dechet", namebin: "Déchèterie" },     // canapé
  { emoji: "🛏️", poubelle: "bin-dechet", namebin: "Déchèterie" },     // matelas
  { emoji: "🪑", poubelle: "bin-dechet", namebin: "Déchèterie" },     // chaise
  { emoji: "📺", poubelle: "bin-dechet", namebin: "Déchèterie" },     // vieille télé
  { emoji: "🧯", poubelle: "bin-dechet", namebin: "Déchèterie" },     // extincteur
  { emoji: "🧰", poubelle: "bin-dechet", namebin: "Déchèterie" },     // boîte à outils
  { emoji: "🧊", poubelle: "bin-dechet", namebin: "Déchèterie" },     // frigo
  { emoji: "🔋", poubelle: "bin-dechet", namebin: "Déchèterie" },     // pile (dangereux)
  { emoji: "🪞", poubelle: "bin-dechet", namebin: "Déchèterie" },     // miroir
  { emoji: "🪚", poubelle: "bin-dechet", namebin: "Déchèterie" },     // scie (objets de bricolage)
  { emoji: "🔩", poubelle: "bin-dechet", namebin: "Déchèterie" },     // vis / boulons
  { emoji: "🪓", poubelle: "bin-dechet", namebin: "Déchèterie" },     // bois de coupe
  { emoji: "🪠", poubelle: "bin-dechet", namebin: "Déchèterie" },     // ventouse / objet cassé
];

function startGame() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("end-overlay").style.display = "none";
  jeuActif = true;
  moneyElement.textContent = `💰 Money : ${0}€`;
  scoreElement.textContent = `😁 Score : ${0}`;
  erreurElement.textContent = `😡 Erreur : ${0}`;
  score = 0;
  erreur = 0;
  let tempsRestant = 60;
  document.getElementById("timer").textContent = `⏳ Temps restant : ${tempsRestant}s`;

  const intervalID = setInterval(() => {
    tempsRestant--;
    document.getElementById("timer").textContent = `⏳ Temps restant : ${tempsRestant}s`;

    if (tempsRestant <= 0) {
      clearInterval(intervalID);
      jeuActif = false;
      document.getElementById("timer").textContent = "⏰ Temps écoulé !";
      document.getElementById("end-overlay").style.display = "flex";
    }
  }, 1000);
}


function quitGame() {
  window.location.href = "index.html";
}

function afficherErreur(montant) {
  const gainX = window.innerWidth / 2 + (Math.random() * 100 - 50);
  const gainY = window.innerHeight / 2 + (Math.random() * 50 - 25);

  erreurFeedback.textContent = `-${montant}`;
  erreurFeedback.style.left = `${gainX}px`;
  erreurFeedback.style.top = `${gainY}px`;

  erreurFeedback.style.opacity = 1;
  erreurFeedback.style.transform = "translateY(-20px)";

  setTimeout(() => {
    erreurFeedback.style.opacity = 0;
    erreurFeedback.style.transform = "translateY(0)";
  }, 700);
}

function afficherGain(montant) {
  const gainX = window.innerWidth / 2 + (Math.random() * 100 - 50);
  const gainY = window.innerHeight / 2 + (Math.random() * 50 - 25);

  gainFeedback.textContent = `+${montant}€`;
  gainFeedback.style.left = `${gainX}px`;
  gainFeedback.style.top = `${gainY}px`;

  gainFeedback.style.opacity = 1;
  gainFeedback.style.transform = "translateY(-20px)";

  setTimeout(() => {
    gainFeedback.style.opacity = 0;
    gainFeedback.style.transform = "translateY(0)";
  }, 700);
}

function allowDrop(event) {
    event.preventDefault();
}


function drop(event) {
  if (!jeuActif) return;
  event.preventDefault();
  const poubelle = event.target.id;
  if (poubelle === dechetActuel.poubelle) {
      score += 1;
      money += 1;
      afficherGain(1)
      scoreElement.textContent = `😁 Score : ${score}`;
      moneyElement.textContent = `💰 Money : ${money}€`;
  } else {
      erreur += 1;
      afficherErreur(1)
      erreurElement.textContent = `😡 Erreur : ${erreur}`;
  }

  dechetActuel = dechets[Math.floor(Math.random() * dechets.length)];
  elementDechet.textContent = dechetActuel.emoji;
}

dechetActuel = dechets[Math.floor(Math.random() * dechets.length)];
elementDechet.textContent = dechetActuel.emoji;

elementDechet.addEventListener("dragstart", function(event) {
    event.dataTransfer.setData("text", event.target.id);
});
=======
document.getElementById("timer").textContent = `⏳ Temps restant : ${tempsRestant}s`;
document.getElementById("end-overlay").style.display = "none";

let jeuActif = false;
let money = 0;
let score = 0;
let erreur = 0;

const moneyElement = document.getElementById("money");
moneyElement.textContent = `💰 Money : ${0}€`;

const scoreElement = document.getElementById("score");
scoreElement.textContent = `😁 Score : ${0}`;
const gainFeedback = document.getElementById("gain-feedback");

const erreurElement = document.getElementById("erreur");
erreurElement.textContent = `😡 Erreur : ${0}`;
const erreurFeedback = document.getElementById("erreur-feedback");

let dechetActuel;
const elementDechet = document.getElementById("trash-item");
const dechets = [
  // ♻️ Jaune : emballages, plastiques, métaux
  { emoji: "🥫", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // boîte de conserve
  { emoji: "🧴", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // bouteille plastique
  { emoji: "🧃", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // brique de jus
  { emoji: "🥤", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // gobelet plastique
  { emoji: "🛍️", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },     // sac plastique
  { emoji: "📦", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // carton
  { emoji: "📰", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // journal
  { emoji: "📃", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // feuille
  { emoji: "📄", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // papier A4
  { emoji: "📚", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // vieux livre
  { emoji: "🧃", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // bouteille de jus (en verre)
  { emoji: "🧻", poubelle: "bin-jaune", namebin: "Poubelle Jaune" },      // papier toilette usagé

  // 🍃 Compost : déchets organiques
  { emoji: "🍌", poubelle: "bin-compost", namebin: "Composteur" },      // banane (emballage)
  { emoji: "🍎", poubelle: "bin-compost", namebin: "Composteur" },    // pomme
  { emoji: "🥕", poubelle: "bin-compost", namebin: "Composteur" },    // épluchure de carotte
  { emoji: "🥔", poubelle: "bin-compost", namebin: "Composteur" },    // patate
  { emoji: "🍞", poubelle: "bin-compost", namebin: "Composteur" },    // pain
  { emoji: "🍂", poubelle: "bin-compost", namebin: "Composteur" },    // feuilles mortes
  { emoji: "🍇", poubelle: "bin-compost", namebin: "Composteur" },      // raisins abîmés
  { emoji: "🍓", poubelle: "bin-compost", namebin: "Composteur" },      // fraises pourries
  { emoji: "🥬", poubelle: "bin-compost", namebin: "Composteur" },      // feuille de salade
  { emoji: "🌽", poubelle: "bin-compost", namebin: "Composteur" },      // épi de maïs
  { emoji: "🍍", poubelle: "bin-compost", namebin: "Composteur" },      // trognon d’ananas
  { emoji: "🫐", poubelle: "bin-compost", namebin: "Composteur" },      // myrtilles écrasées
  { emoji: "🍉", poubelle: "bin-compost", namebin: "Composteur" },      // reste de pastèque
  { emoji: "🥒", poubelle: "bin-compost", namebin: "Composteur" },      // tranche de concombre
  { emoji: "🍋", poubelle: "bin-compost", namebin: "Composteur" },      // zeste de citron
  { emoji: "🧄", poubelle: "bin-compost", namebin: "Composteur" },      // épluchure d’ail
  { emoji: "🧅", poubelle: "bin-compost", namebin: "Composteur" },      // épluchure d’oignon

  // 🟢 Verte : verre
  { emoji: "🍾", poubelle: "bin-verte", namebin: "Poubelle verte" },      // bouteille de verre
  { emoji: "🥂", poubelle: "bin-verte", namebin: "Poubelle verte" },      // verre
  { emoji: "🧪", poubelle: "bin-verte", namebin: "Poubelle verte" },      // flacon en verre
  { emoji: "🍷", poubelle: "bin-verte", namebin: "Poubelle verte" },      // verre à vin
  { emoji: "🍶", poubelle: "bin-verte", namebin: "Poubelle verte" },      // bouteille de sake / sauce
  { emoji: "🥃", poubelle: "bin-verte", namebin: "Poubelle verte" },      // verre à whisky
  { emoji: "🫙", poubelle: "bin-verte", namebin: "Poubelle verte" },      // pot en verre (confiture)
  { emoji: "🍸", poubelle: "bin-verte", namebin: "Poubelle verte" },      // verre à cocktail
  { emoji: "🫗", poubelle: "bin-verte", namebin: "Poubelle verte" },      // contenant à verser (carafe en verre)

  // ⚫ Grise : ordures ménagères
  { emoji: "💡", poubelle: "bin-grise", namebin: "Poubelle Grise" },      // ampoule
  { emoji: "🧦", poubelle: "bin-grise", namebin: "Poubelle Grise" },      // vieille chaussette
  { emoji: "🍗", poubelle: "bin-grise", namebin: "Poubelle Grise" },      // os de poulet
  { emoji: "🍽️", poubelle: "bin-grise", namebin: "Poubelle Grise" },     // vaisselle cassée
  { emoji: "🧼", poubelle: "bin-grise", namebin: "Poubelle Grise" },     // savon usé
  { emoji: "🧽", poubelle: "bin-grise", namebin: "Poubelle Grise" },     // éponge usée
  { emoji: "🦴", poubelle: "bin-grise", namebin: "Poubelle Grise" },     // os (non compostables)
  { emoji: "🧤", poubelle: "bin-grise", namebin: "Poubelle Grise" },     // gant usagé
  { emoji: "🩹", poubelle: "bin-grise", namebin: "Poubelle Grise" },     // pansement
  { emoji: "🦷", poubelle: "bin-grise", namebin: "Poubelle Grise" },     // dent / os usé (fun 🤓)
  { emoji: "🪥", poubelle: "bin-grise", namebin: "Poubelle Grise" },     // brosse à dents
  { emoji: "🧦", poubelle: "bin-grise", namebin: "Poubelle Grise" },     // (déjà présente) chaussette

    // ⚫ Decheterie: autre
  { emoji: "🌲", poubelle: "bin-dechet", namebin: "Déchèterie" },      // arbre
  { emoji: "🛋️", poubelle: "bin-dechet", namebin: "Déchèterie" },     // canapé
  { emoji: "🛏️", poubelle: "bin-dechet", namebin: "Déchèterie" },     // matelas
  { emoji: "🪑", poubelle: "bin-dechet", namebin: "Déchèterie" },     // chaise
  { emoji: "📺", poubelle: "bin-dechet", namebin: "Déchèterie" },     // vieille télé
  { emoji: "🧯", poubelle: "bin-dechet", namebin: "Déchèterie" },     // extincteur
  { emoji: "🧰", poubelle: "bin-dechet", namebin: "Déchèterie" },     // boîte à outils
  { emoji: "🧊", poubelle: "bin-dechet", namebin: "Déchèterie" },     // frigo
  { emoji: "🔋", poubelle: "bin-dechet", namebin: "Déchèterie" },     // pile (dangereux)
  { emoji: "🪞", poubelle: "bin-dechet", namebin: "Déchèterie" },     // miroir
  { emoji: "🪚", poubelle: "bin-dechet", namebin: "Déchèterie" },     // scie (objets de bricolage)
  { emoji: "🔩", poubelle: "bin-dechet", namebin: "Déchèterie" },     // vis / boulons
  { emoji: "🪓", poubelle: "bin-dechet", namebin: "Déchèterie" },     // bois de coupe
  { emoji: "🪠", poubelle: "bin-dechet", namebin: "Déchèterie" },     // ventouse / objet cassé
];

function startGame() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("end-overlay").style.display = "none";
  jeuActif = true;
  moneyElement.textContent = `💰 Money : ${0}€`;
  scoreElement.textContent = `😁 Score : ${0}`;
  erreurElement.textContent = `😡 Erreur : ${0}`;
  score = 0;
  erreur = 0;
  let tempsRestant = 60;
  document.getElementById("timer").textContent = `⏳ Temps restant : ${tempsRestant}s`;

  const intervalID = setInterval(() => {
    tempsRestant--;
    document.getElementById("timer").textContent = `⏳ Temps restant : ${tempsRestant}s`;

    if (tempsRestant <= 0) {
      clearInterval(intervalID);
      jeuActif = false;
      document.getElementById("timer").textContent = "⏰ Temps écoulé !";
      document.getElementById("end-overlay").style.display = "flex";
    }
  }, 1000);
}


function quitGame() {
  window.location.href = "index.html";
}

function afficherErreur(montant) {
  const gainX = window.innerWidth / 2 + (Math.random() * 100 - 50);
  const gainY = window.innerHeight / 2 + (Math.random() * 50 - 25);

  erreurFeedback.textContent = `-${montant}`;
  erreurFeedback.style.left = `${gainX}px`;
  erreurFeedback.style.top = `${gainY}px`;

  erreurFeedback.style.opacity = 1;
  erreurFeedback.style.transform = "translateY(-20px)";

  setTimeout(() => {
    erreurFeedback.style.opacity = 0;
    erreurFeedback.style.transform = "translateY(0)";
  }, 700);
}

function afficherGain(montant) {
  const gainX = window.innerWidth / 2 + (Math.random() * 100 - 50);
  const gainY = window.innerHeight / 2 + (Math.random() * 50 - 25);

  gainFeedback.textContent = `+${montant}€`;
  gainFeedback.style.left = `${gainX}px`;
  gainFeedback.style.top = `${gainY}px`;

  gainFeedback.style.opacity = 1;
  gainFeedback.style.transform = "translateY(-20px)";

  setTimeout(() => {
    gainFeedback.style.opacity = 0;
    gainFeedback.style.transform = "translateY(0)";
  }, 700);
}

function allowDrop(event) {
    event.preventDefault();
}


function drop(event) {
  if (!jeuActif) return;
  event.preventDefault();
  const poubelle = event.target.id;
  if (poubelle === dechetActuel.poubelle) {
      score += 1;
      money += 1;
      afficherGain(1)
      scoreElement.textContent = `😁 Score : ${score}`;
      moneyElement.textContent = `💰 Money : ${money}€`;
  } else {
      erreur += 1;
      afficherErreur(1)
      erreurElement.textContent = `😡 Erreur : ${erreur}`;
  }

  dechetActuel = dechets[Math.floor(Math.random() * dechets.length)];
  elementDechet.textContent = dechetActuel.emoji;
}

dechetActuel = dechets[Math.floor(Math.random() * dechets.length)];
elementDechet.textContent = dechetActuel.emoji;

elementDechet.addEventListener("dragstart", function(event) {
    event.dataTransfer.setData("text", event.target.id);
});
>>>>>>> 805e55e0415894b8735caf9e220819eda18b9887
