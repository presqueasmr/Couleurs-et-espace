// CONCEPTION
// en fr -> en JS
// simplifier le pb
// factorser le code (utilisation de boucle)

// DEBUGAGE ;)
// bug de syntaxe : utiliser le inspecteur  pour la localiser
// bug de fonctionnement : utiliser les console.log pour la localiser (voir les différences entre le resultat obtenu et celui attendu

"use strict";
// function imgLoad(){
// 	var URL = window.webkitURL || window.URL;
// 	document.getElementById("gallery__img1").src = URL.createObjectURL(document.getElementById("file_input").files[0]);
// }

var tr, tg, tb, ta;
var width, height;
var photo, canvas;
var pix, imgd, context;
let prevValue =[];
let index = 0;

function prefilter(photo){

	// photo = document.getElementById('gallery__img1');
	canvas = document.getElementById('mycanvas');
	context = canvas.getContext('2d');

	var x = 0;
	var y = 0;

	// redimensionne le canevas aux dimensions de l'image
	width = photo.width;
	height = photo.height;
	canvas.width = width;
	canvas.height = height;

	// recopie l'image dans le canevas
	context.drawImage(photo, 0, 0, width, height);

	// extrait le tableau de pixels du canevas
	imgd = context.getImageData(0, 0, photo.width, photo.height);
	pix = imgd.data;


	// PASSAGE EN 1D POUR SIMPLIFIER LA GESTION DU VOISINAGE
	// 1 tab 1D -> 4 tab 2D (r,g,b,a)
	// déclaration de 4 tableaux à 2 dim (de taille width * height)
	tr = new Array(width).fill().map(() => Array(height));
	tg = new Array(width).fill().map(() => Array(height));
	tb = new Array(width).fill().map(() => Array(height));
	ta = new Array(width).fill().map(() => Array(height));



	// copie des valeurs
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			tr[x][y] = pix[x*4+y*(width*4)+0];
			tg[x][y] = pix[x*4+y*(width*4)+1];
			tb[x][y] = pix[x*4+y*(width*4)+2];
			ta[x][y] = pix[x*4+y*(width*4)+3];
		}
	}
}

function postfilter(photo){
	// RETOUR EN 1D POUR AFFICHER LES MODIFICATIONS
	// 4 tab 2D (r,g,b,a) -> 1 tab 1D POUR METTRE A JOUR L'IMAGE
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			pix[x*4+y*(width*4)+0] = tr[x][y];
			pix[x*4+y*(width*4)+1] = tg[x][y];
			pix[x*4+y*(width*4)+2] = tb[x][y];
			pix[x*4+y*(width*4)+3] = ta[x][y];
		}
	}

	// Draw the ImageData at the given (x,y) coordinates.
	context.putImageData(imgd, 0, 0);

	var data = canvas.toDataURL('image/png');
	photo.setAttribute('src', data);
}

function negatif(){

	// CHARGEMENT DES TABLEAUX DE PIXELS
	prefilter();

	// TRAITEMENT / APPLICATION D'UN FILTRE
	// mise en rouge de la moitier gauche
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			tr[x][y] = 255 - tr[x][y];
			tg[x][y] = 255 - tg[x][y];
			tb[x][y] = 255 - tb[x][y];
			// ta[x][y] = ta[x][y];
		}
	}

	// MISE À JOUR DE L'IMAGE
	postfilter();

}

function noir_et_blanc(idImg){

	let photo = document.querySelector('#'+idImg);
  
	  // CHARGEMENT DES TABLEAUX DE PIXELS
	  prefilter(photo);
  
	  // TRAITEMENT / APPLICATION D'UN FILTRE
	  for (var y = 0; y < height; y++) { 
		for (var x = 0; x < width; x++) {
		
			var moyenne = tr[x][y]*0.3 + tg[x][y]*0.6 + tb[x][y]*0.1;
				
				tr[x][y] = moyenne;
				tg[x][y] = moyenne;
				tb[x][y] = moyenne;
		}
	}
  
	  // MISE À JOUR DE L'IMAGE
	  postfilter(photo);
  
}