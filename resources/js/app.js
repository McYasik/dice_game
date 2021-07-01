// Partie 1 - Les variables

let scoresGlobals = [0,0];
let scoreEnCours = 0;
let joueurActif = 1;
let jouer = true;

// Initialisation de la partie

nvjeu();

// lancé de dé & implémentation

let launch_btn = document.querySelector(".btn-lancer");
let dice = document.querySelector(".de");

launch_btn.addEventListener("click", () => {
    
    if (jouer)
    {
        let dicevalue = Math.floor(Math.random() * 6)+1;
    
        dice.style.display = "block";
        dice.src = `resources/images/de-${dicevalue}.png`; //les quotes inversées !!

        if (dicevalue !== 1)
        {
            scoreEnCours += dicevalue;
            document.getElementById(`encours-${joueurActif}`).textContent = scoreEnCours;
        }
        else
        {
            joueur_suivant();
        }
    }
})


// commuter le score


let commute_btn = document.querySelector(".btn-commuter");

commute_btn.addEventListener("click", () => {

    if (jouer)
    {
        let i = joueurActif-1; // value possible d'être mise directement dans le []
        scoresGlobals[i] += scoreEnCours;

        document.getElementById(`score-${joueurActif}`).textContent = scoresGlobals[i];

        //idem que raté
        if (scoresGlobals[i] >= 100)
        {
            document.getElementById(`nom-${joueurActif}`).textContent = 'You win !!';
            document.querySelector(".de").style.display = "none";
            document.querySelector(`.joueur-${joueurActif}-panel`).classList.add('vainqueur');
            document.querySelector(`.joueur-${joueurActif}-panel`).classList.remove('active');

            // document.querySelector(".btn-lancer").setAttribute('disabled', true);
            // document.querySelector(".btn-commuter").setAttribute('disabled', true);

            jouer = false;
        }
        else
        {
            joueur_suivant();
        }
    }
})


// changer de joueur


function joueur_suivant()
{
    document.getElementById(`encours-${joueurActif}`).textContent = 0;

    document.querySelector(`.joueur-${joueurActif}-panel`).classList.toggle('active');

    joueurActif === 1 ? joueurActif = 2 : joueurActif = 1;

    scoreEnCours = 0;

    document.getElementById(`encours-${joueurActif}`).textContent = 0;

    document.querySelector(`.joueur-${joueurActif}-panel`).classList.toggle('active');
    // les toggles sont fait avec le $ mais, à deux joueurs, autant de pas s'embêter
    // et mettre en dur pour chaque.

    dice.style.display = "none";
}

// nouveau jeu

let reset = document.querySelector(".btn-nouveau");

reset.addEventListener("click", ()=> {
    nvjeu();
})

function nvjeu()
{
    scoresGlobals = [0,0];
    scoreEnCours = 0;
    joueurActif = 1;
    jouer = true;

    document.getElementById("score-1").textContent = "0";
    document.getElementById("score-2").textContent = "0";
    document.getElementById("encours-1").textContent = "0";
    document.getElementById("encours-2").textContent = "0";
    document.querySelector(".de").style.display = "none";

    document.querySelector(`.joueur-1-panel`).classList.remove('vainqueur');
    document.querySelector(`.joueur-2-panel`).classList.remove('vainqueur');
    document.querySelector(`.joueur-1-panel`).classList.add('active');
    document.querySelector(`.joueur-2-panel`).classList.remove('active');

    document.getElementById(`nom-1`).textContent = 'Joueur 1';
    document.getElementById(`nom-2`).textContent = 'Joueur 2';
}

