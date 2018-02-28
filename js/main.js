//----INITIALIZE DOCUMENT------------------------------------------------------------------------------------------------------
$(document).ready(function () {

	$('#intro').modal('show');

	//variable declarations
	color = {
		hue: {},
		saturation: {},
		brightness: {}
	};
	items = { // [name]: [amount of images]
		fringe: 21,
		back: 23,
		topa: 22,
		bottom: 20,

		eyes: 15,
		eyebrows: 10,
		mouth: 17,
		topb: 11,

		dress: 8,
		shoes: 7,
		hat: 19,
		acc: 18,

		ltph: 10,
		beard: 3,
		eyewear: 13,
		emotion: 5,

		other: 6,
		cape: 6,
		scarf: 11
	};

	hair = ["fringe", "back", "beard"]; //hair items are items that have same color.

	//initialize all content in ITEM DRAWER tab
	for (var name in items) {
		for (var i = 1; i <= items[name]; i++) {
			var img = document.createElement('img');
			img.setAttribute("src", "img/" + name + "/" + name + i + ".png");
			img.setAttribute("class", "item-option");
			img.setAttribute("onClick", "changeImg('" + name + "', " + i + ");");
			$("." + name + "Items").append(img);
		}
	}
	

	//generates color picker palette
	var pickerID = 1; //picker id
	var hu = [0, 45, 70, 100, 200, 300]; //picker hue
	var br = 500; //picker brightness  

	for (var a = 0; a <= 2; a++) { //brightness
		for (var b = 0; b <= 5; b++) { //hue
			var saturation = 10; //picker saturation  

			for (var c = 0; c <= 1; c++) { //saturation                  
				var picker = document.createElement("div");

				picker.setAttribute("id", "picker" + pickerID);
				picker.setAttribute("class", "picker");
				picker.setAttribute("onClick", "picker(" + hu[b] + " ," + saturation + " ," + br + ")");

				$(".color-picker").append(picker);

				document.getElementById("picker" + pickerID).style.filter =
					"hue-rotate(" + hu[b] + "deg) saturate(" + saturation + "%) brightness(" + br + "%)";

				pickerID++;
				saturation += 30;
			}
			//no changes on hue    
		}
		br -= 210;
	}

	//initialize to eyes items
	document.getElementById("eyesTab").style = "display: block";
	current = 'eyes';
	
	//randomizes items
	randomizer();	
});
//------------------------------------------------------------------------------------------------------------------------------

//ALL MOTHAFUKCIN FUNCTIONS-----------------------------------------------------------------------------------------------------

function setColor(instance) {
	//current = instance;
	if (current !== "eyes" && current !== "eyebrows" && current !== "mouth" && current !== "ltph") {
		document.getElementById("Slider-hue").value = color.hue[current];
		document.getElementById("Slider-sat").value = color.saturation[current];
		document.getElementById("Slider-bri").value = color.brightness[current];
	}	
} //set sliders to which item is selected

function randomizer() {
	var skin = Math.floor(Math.random() * 6);
	if (skin == 0) {
		skin = 1;
	}
	document.getElementById("base").src = ("img/base/base" + skin + ".png");

	//global 'variable' variables for changing color
	for (var name in items) {
		if (name !== "eyes" && name !== "eyebrows" && name !== "mouth" && name !== "acc" && name !== "ltph" && name !== "emotion" && name !== "other") {
			color.hue[name] = Math.floor(Math.random() * 360);
			color.saturation[name] = Math.floor(Math.random() * 50);
			color.brightness[name] = Math.floor(Math.random() * 500);

			if (color.brightness[name] <= 40) {
				color.brightness[name] = 40;
			}
		}
	}

	color.hue.back = color.hue.fringe;
	color.saturation.back = color.saturation.fringe;
	color.brightness.back = color.brightness.fringe;
	color.hue.beard = color.hue.fringe;
	color.saturation.beard = color.saturation.fringe;
	color.brightness.beard = color.brightness.fringe;

	setColor(current); //set sliders to which item is selected

	//random select images from folder
	for (var name in items) {
		var item = document.getElementById(name);
		var randomVal = Math.floor(Math.random() * items[name]);

		if (name !== 'shoes' && name !== 'beard' && name !== 'eyewear') {
			item.src = "img/" + name + "/" + name + (randomVal + 1) + ".png";
		}

		if (name !== "eyes" && name !== "eyebrows" && name !== "mouth" && name !== "acc" && name !== "ltph" && name !== "emotion" && name !== "other") {
			item.style.filter = "hue-rotate(" + color.hue[name] + "deg) saturate(" + color.saturation[name] + "%) brightness(" + color.brightness[name] + "%)";
		}
	}


	var dressOrNot = Math.floor(Math.random() * 3);
	// Randomly gets if base wears a dress or not. 0 for normal and 1 for dress.

	if (dressOrNot == 0) { // Resets Top A, B and Bottom if Dress is present.
		document.getElementById("topa").src = "img/topa/topa1.png";
		document.getElementById("topb").src = "img/topb/topb1.png";
		document.getElementById("bottom").src = "img/bottom/bottom1.png";
		document.getElementById("cape").src = "img/cape/cape1.png";
		document.getElementById("scarf").src = "img/scarf/scarf1.png";

		var dress = 0;
		while (dress <= 1) {
			dress = Math.floor(Math.random() * items.dress + 1);
		}

		document.getElementById("dress").src = "img/dress/dress" + dress + ".png";

	} else { // Returns normal clothes
		document.getElementById("dress").src = "img/dress/dress1.png";
	}
}

function changeImg(item, num) {
	current = item;
	document.getElementById(item).src = ("img/" + item + "/" + item + num + ".png");
} //replace current image

function clearImg() {
	var x = ["topa", "topb", "bottom", "dress", "shoes", "hat",
		"acc", "ltph", "eyewear", "emotion", "other", "cape", "scarf"
	];
	for (var i = 0; i < x.length; i++) {
		document.getElementById(x[i]).src = "img/" + x[i] + "/" + x[i] + "1.png";
	}
} //resets current appearance

function selectItem(item) {
	document.getElementById("skinTab").style = "display: none";

	for (var name in items) {
		document.getElementById(name + "Tab").style = "display: none";
	}
	//selected = val;
	document.getElementById(item + "Tab").style = "display: block";
	setColor(item);

} //select items from dropdown menu

function showPicker() {
	document.getElementById("color-picker").style = "display: block";
	document.getElementById("color-custom").style = "display: none";
} //shows color picker menu

function showCustom() {
	document.getElementById("color-custom").style = "display: block";
	document.getElementById("color-picker").style = "display: none";
} //shows custom color menu

function picker(hue, saturation, brightness) {
	if (current !== "eyes" && current !== "eyebrows" && current !== "mouth" && current !== "acc" 
		&& current !== "ltph" && current !== "emotion" && current !== "other") {
		var currentElement = document.getElementById(current);
		currentElement.filter = "hue-rotate(" + hue + "deg) saturate(" + saturation + "%) brightness(" + brightness + "%)";
		color.hue[current] = hue;
		color.saturation[current] = saturation;
		color.brightness[current] = brightness;

		setColor(current);
	}

	if (current == "fringe" || current == "back" || current == "beard") {
		for (var i = 0; i < hair.length; i++) {

			var hairType = hair[i];

			var hairElement = document.getElementById(hairType);
			hairElement.style.filter = "hue-rotate(" + hue + "deg) saturate(" + saturation + "%) brightness(" + brightness + "%)";

			color.hue[hairType] = hue;
			color.saturation[hairType] = saturation;
			color.brightness[hairType] = brightness;
			setColor(hairType);
		}
	}
} //premade color palette

function setFilter (name) {
	let element = document.getElementById(name);
	if (!element) throw new TypeError(name + " is not a valid id for setting a filter on!");

	element.style.filter = `hue-rotate(${color.hue[name]}) saturate(${color.saturation[name]}) brightness(${color.brightness[name]})`;
}
//---------------------------------------------------------------------------------------------------------------------------------------------

//----VALUES FOR GENERAL COLOR SLIDER----------------------------------------------------------------------------------------------------------
document.getElementById("Slider-hue").oninput = function () {
	if (current == "fringe" || current == "back" || current == "beard") {
		color.hue.fringe = this.value;
		color.hue.back = this.value;
		color.hue.beard = this.value;
		
		setFilter("fringe");
		setFilter("back");
		setFilter("beard");
	} else if (current !== "eyes" && current !== "eyebrows" && current !== "mouth" && current !== "acc" && current !== "ltph" && current !== "emotion" && current !== "other") {
		color.hue[current] = this.value;
		setFilter(current);
	}
} //hue      


document.getElementById("Slider-sat").oninput = function () {
	if (current == "fringe" || current == "back" || current == "beard") {
		color.saturation.fringe = this.value;
		color.saturation.back = this.value;
		color.saturation.beard = this.value;

		setFilter("fringe");
		setFilter("back");
		setFilter("beard");
	} else if (current !== "eyes" && current !== "eyebrows" && current !== "mouth" && current !== "acc" && current !== "ltph" && current !== "emotion" && current !== "other") {
		color.saturation[current] = this.value;
		setFilter(current);
	}
} //saturation 

document.getElementById("Slider-bri").oninput = function () {
	if (current == "fringe" || current == "back" || current == "beard") {
		color.brightness.fringe = this.value;
		color.brightness.back = this.value;
		color.brightness.beard = this.value;

		setFilter("fringe");
		setFilter("back");
		setFilter("beard");
	} else if (current !== "eyes" && current !== "eyebrows" && current !== "mouth" && current !== "acc" && current !== "ltph" && current !== "emotion" && current !== "other") {
		color.brightness[current] = this.value;
		setFilter(current);
	}
} //brightness
//-----------------------------------------------------------------------------------------------------------------------------------------------