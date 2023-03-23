// checkbox
var panelHeading = document.querySelector('.panel-heading');
var checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.value = 'valeur';
panelHeading.appendChild(checkbox);


checkbox.addEventListener('change', function() {
  if(this.checked) {
    localStorage.setItem('maCheckbox', 'true');
  } else {
    localStorage.setItem('maCheckbox', 'false');
  }
});

if(localStorage.getItem('maCheckbox') === 'true') {
  checkbox.checked = true;
} else {
  checkbox.checked = false;
}

//checkbox1 fin


//checkbox2
var checkbox2 = document.createElement('input');
checkbox2.type = 'checkbox';
checkbox2.value = 'valeur';
panelHeading.appendChild(checkbox2);


checkbox2.addEventListener('change', function() {
  if(this.checked) {
    localStorage.setItem('maCheckbox2', 'true');
  } else {
    localStorage.setItem('maCheckbox2', 'false');
  }
});

if(localStorage.getItem('maCheckbox2') === 'true') {
  checkbox2.checked = true;
} else {
  checkbox2.checked = false;
}

//checkbox2 fin


// Récupération du tableau de la page1
let tableau = document.querySelector('table');

// Récupération des lignes du tableau s'il existe
let lignes;
if(tableau) {
  let tbody = tableau.querySelector('tbody');
  lignes = tbody ? tbody.rows : tableau.rows;
}



// Récupération du tableau de la page2
let tableau2 = document.querySelector('table');

// Récupération des lignes du tableau s'il existe
let lignes2;
if(tableau2) {
  let tbody2 = tableau2.querySelector('tbody');
  lignes2 = tbody2 ? tbody2.rows : tableau2.rows;
}



//recup l'h actuelle
function heureactuelle(){
	let heureactuellevar = new Date();
	let minact = heureactuellevar.getMinutes();
	let hact = heureactuellevar.getHours();
	
	if(minact<10){
		minact = "0"+minact;
	}
	if(hact<10){
		hact = "0"+hact;
	}
	let heureretour = hact +":"+minact;
	return heureretour;
}


//tester si heure dans intervalle
function estEntreHeures(heureDonnee, heureDebut, heureFin) {
  // Convertir les heures en nombre de minutes depuis minuit
  let heureDonneeMin = parseInt(heureDonnee.substr(0, 2)) * 60 + parseInt(heureDonnee.substr(3, 2));
  let heureDebutMin = parseInt(heureDebut.substr(0, 2)) * 60 + parseInt(heureDebut.substr(3, 2));
  let heureFinMin = parseInt(heureFin.substr(0, 2)) * 60 + parseInt(heureFin.substr(3, 2));
  
  // Vérifier si l'heure donnée est entre l'heure de début et l'heure de fin
  return (heureDonneeMin >= heureDebutMin && heureDonneeMin < heureFinMin);
}



// retourne un objet avec le lien et si l'heure est dans l'intervalle
// vrai fonction
function retourLienEtBool(){
	let heureglobale ="";
	let heureglobalesansespaces ="";
	let heuredebut = "";
	let heurefin = "";
	for (var i = 0; i < lignes.length; i++) {
		heureglobale= lignes[i].cells[0].innerHTML;
		heureglobalesansespaces = heureglobale.replace(/ /g,'');
		heuredebut = heureglobalesansespaces.substr(0,5);
		heurefin = heureglobalesansespaces.substr(6,5);
		if(estEntreHeures(heureactuelle(),heuredebut,heurefin)){
			 let cellule = lignes[i].getElementsByTagName("td")[3];
			 let lienredir = cellule.getElementsByTagName("a")[0];
			 let monObjet = {
				estValide: true,
				lien: lienredir
			 };
			 return monObjet;
		}
	}
	let monObjet = {
		estValide: false,
		lien: null
	};
	return monObjet;
}




// fct pause en millisecondes
async function pause(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function VaSurLecours(){
	await pause(5000);
	if (retourLienEtBool().estValide) {
		console.log(retourLienEtBool().lien);
		await pause(5000);
		retourLienEtBool().lien.click();
	}
}


//fonction qui valide la presence
async function valideLaPresence(){
	let cliquepresnece = false;
	let span;
	if(!cliquepresnece && detecteheure()){
		await pause(2000);
		span= document.getElementById("set-presence");
		await pause(2000);
		//console.log(span);
		if(span != null){
			span.click();
			//let click = new Event('click');
			//span.dispatchEvent(click);
			cliquepresnece = true;
			
		}
		else{
			await pause(1000);
			//console.log("test4");
			//console.log(window.location.href);
			await pause(5000);
			location.reload();
		}
	}
	await pause(3000);
	window.location.href="https://www.leonard-de-vinci.net/student/presences/";
}



//fct pour detecter l'heure sur la page 2
function detecteheure(){
	let heureglobale ="";
	let heureglobalesansespaces ="";
	let heuredebut = "";
	let heurefin = "";
	heureglobale= lignes2[0].cells[1].innerHTML;
	//console.log(heureglobale);
	heureglobalesansespaces = heureglobale.replace(/ /g,'');
	heuredebut = heureglobalesansespaces.substr(0,5);
	heurefin = heureglobalesansespaces.substr(6,5);
	if(estEntreHeures(heureactuelle(),heuredebut,heurefin)){
		return true;
	}
	else{
		return false;
	}
}


async function sousmain(){
	await pause(1000);
	if (checkbox.checked) {
		while(!retourLienEtBool().estValide){
			await pause(5000);
			if (!checkbox.checked) {
				break;
			}
		}
		if (retourLienEtBool().estValide) {
			await VaSurLecours();
		}
	}
}

//code main final
checkbox.addEventListener('change', sousmain);
async function mainpage2(){
	if(checkbox2.checked &&window.location.href!="https://www.leonard-de-vinci.net/student/presences/"){
		console.log("test");
		await pause(5000);
		await valideLaPresence();
	}
}
checkbox2.addEventListener('change', mainpage2);
mainpage2();


// va bien sur le cours, clique bien (mais pas de redirection sur le tebleau des cours). optimser pour tout automatiser