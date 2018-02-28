//----INITIALIZE DOCUMENT------------------------------------------------------------------------------------------------------
$(document).ready(function () {

	$('#intro').modal('show');

	//variable declarations   
	hue = {}
	sat = {}
	bri = {}
	selected = "";
	itemname = ["fringe", "back", "topa", "bottom",
		"eyes", "eyebrows", "mouth", "topb",
		"dress", "shoes", "hat", "acc",
		"ltph", "beard", "eyewear", "emotion",
		"other", "cape", "scarf"
	];
	itemdirlength = [21, 23, 22, 20,
		15, 10, 17, 11,
		8, 7, 19, 18,
		10, 3, 13, 5,
		6, 6, 11
	];

	hair = ["fringe", "back", "beard"]; //hair items are items that have same color.

	//initialize all content in ITEM DRAWER tab
	for (var j = 0; j <= itemname.length - 1; j++) {
		for (var i = 1; i <= itemdirlength[j]; i++) {
			var img = document.createElement("IMG");
			img.setAttribute("src", "img/" + itemname[j] + "/" + itemname[j] + i + ".png");
			img.setAttribute("class", "item-option");
			img.setAttribute("onClick", "changeImg('" + itemname[j] + "', " + i + ");");
			$("." + itemname[j] + "Items").append(img);
		}
	}

	//generates color picker palette
	var x = 1; //picker id
	var hu = [0, 45, 70, 100, 200, 300]; //picker hue
	var br = 500; //picker brightness  

	for (var a = 0; a <= 2; a++) { //brightness

		for (var b = 0; b <= 5; b++) { //hue
			var sa = 10; //picker saturation  

			for (var c = 0; c <= 1; c++) { //saturation                  
				var picker = document.createElement("div");
				picker.setAttribute("id", "picker" + x);
				picker.setAttribute("class", "picker");
				picker.setAttribute("onClick", "picker(" + hu[b] + " ," + sa + " ," + br + ")");
				$(".color-picker").append(picker);

				document.getElementById("picker" + x).style.filter =
					"hue-rotate(" + hu[b] + "deg) saturate(" + sa + "%) brightness(" + br + "%)";

				x = x + 1;
				sa = sa + 30;
			}
			//no changes on hue    
		}
		br = br - 210;
	}

	//randomizes items
	randomizer();

	//initialize to eyes items
	document.getElementById("eyesTab").style = "display: block";
});
//------------------------------------------------------------------------------------------------------------------------------

//ALL MOTHAFUKCIN FUNCTIONS-----------------------------------------------------------------------------------------------------

function setColor(instance) {
	selected = instance;
	if (selected == "eyes" || selected == "eyebrows" || selected == "mouth" || selected == "ltph") {

	} else {
		document.getElementById("Slider-hue").value = hue[selected];
		document.getElementById("Slider-sat").value = sat[selected];
		document.getElementById("Slider-bri").value = bri[selected];
	}
} //set sliders to which item is selected

function randomizer() {
	var skin = Math.floor(Math.random() * 6);
	if (skin == 0) {
		skin = 1;
	}
	document.getElementById("base").src = ("img/base/base" + skin + ".png");

	//global 'variable' variables for changing color
	for (i = 0; i <= itemname.length - 1; i++) {
		var inst = itemname[i];

		if (itemname[i] == "eyes" ||
			itemname[i] == "eyebrows" ||
			itemname[i] == "mouth" ||
			itemname[i] == "acc" ||
			itemname[i] == "ltph" ||
			itemname[i] == "emotion" ||
			itemname[i] == "other") {} else {
			hue[inst] = Math.floor(Math.random() * 360);
			sat[inst] = Math.floor(Math.random() * 50);
			bri[inst] = Math.floor(Math.random() * 500);

			if (bri[inst] <= 40) {
				bri[inst] = 40;
			}
		}
	}
	hue.back = hue.fringe;
	sat.back = sat.fringe;
	bri.back = bri.fringe;
	hue.beard = hue.fringe;
	sat.beard = sat.fringe;
	bri.beard = bri.fringe;

	setColor(selected); //set sliders to which item is selected

	//random select images from folder
	for (i = 0; i <= itemname.length - 1; i++) {
		var inst = itemname[i];
		var item = document.getElementById(inst);
		var randomVal = Math.floor(Math.random() * itemdirlength[i]);

		if (i == 9) {} else if (i == 13) {} else if (i == 14) {} else {
			item.src = ("img/" + inst + "/" + inst + "" + (randomVal + 1) + ".png"); // Change item randomly
		}

		if (itemname[i] == "eyes" ||
			itemname[i] == "eyebrows" ||
			itemname[i] == "mouth" ||
			itemname[i] == "acc" ||
			itemname[i] == "ltph" ||
			itemname[i] == "emotion" ||
			itemname[i] == "other") {} else { // Proceed to change color.
			item.style.filter = "hue-rotate(" + hue[inst] + "deg) saturate(" + sat[inst] + "%) brightness(" + bri[inst] + "%)";
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
			dress = Math.floor(Math.random() * itemdirlength[8] + 1);
		}

		document.getElementById("dress").src = "img/dress/dress" + dress + ".png";

	} else { // Returns normal clothes
		document.getElementById("dress").src = "img/dress/dress1.png";
	}
}

function changeImg(item, num) {
	document.getElementById(item).src = ("img/" + item + "/" + item + num + ".png");
} //replace current image

function clearImg() {
	var x = ["topa", "topb", "bottom", "dress", "shoes", "hat",
		"acc", "ltph", "eyewear", "emotion", "other", "cape", "scarf"
	];
	for (var i = 0; i <= x.length - 1; i++) {
		document.getElementById(x[i]).src = "img/" + x[i] + "/" + x[i] + "1.png";
	}
} //resets current appearance

function selectItem(val) {
	document.getElementById("skinTab").style = "display: none";

	for (i = 0; i <= itemname.length - 1; i++) {
		document.getElementById(itemname[i] + "Tab").style = "display: none";
	}

	document.getElementById(val + "Tab").style = "display: block";
	setColor(val);

} //select items from dropdown menu

function showPicker() {
	document.getElementById("color-picker").style = "display: block";
	document.getElementById("color-custom").style = "display: none";
} //shows color picker menu

function showCustom() {
	document.getElementById("color-custom").style = "display: block";
	document.getElementById("color-picker").style = "display: none";
} //shows custom color menu

function picker(a, b, c) {

	if (selected == "eyes" ||
		selected == "eyebrows" ||
		selected == "mouth" ||
		selected == "acc" ||
		selected == "ltph" ||
		selected == "emotion" ||
		selected == "other") {} else {
		var x = document.getElementById(selected);
		x.style.filter = "hue-rotate(" + a + "deg) saturate(" + b + "%) brightness(" + c + "%)";
		hue[selected] = a;
		sat[selected] = b;
		bri[selected] = c;
		setColor(selected);
	}

	if (selected == "fringe" || selected == "back" || selected == "beard") {
		for (var i = 0; i <= hair.length - 1; i++) {

			var y = hair[i];

			var x = document.getElementById(y);
			x.style.filter = "hue-rotate(" + a + "deg) saturate(" + b + "%) brightness(" + c + "%)";

			hue[y] = a;
			sat[y] = b;
			bri[y] = c;
			setColor(y);
		}
	}
} //premade color palette
//---------------------------------------------------------------------------------------------------------------------------------------------

//----VALUES FOR GENERAL COLOR SLIDER----------------------------------------------------------------------------------------------------------
document.getElementById("Slider-hue").oninput = function () {
	if (selected == "fringe" || selected == "back" || selected == "beard") {
		document.getElementById("fringe").style.filter =
			"hue-rotate(" + this.value + "deg) saturate(" + sat.fringe + "%) brightness(" + bri.fringe + "%)";

		document.getElementById("back").style.filter =
			"hue-rotate(" + this.value + "deg) saturate(" + sat.back + "%) brightness(" + bri.back + "%)";

		document.getElementById("beard").style.filter =
			"hue-rotate(" + this.value + "deg) saturate(" + sat.beard + "%) brightness(" + bri.beard + "%)";

		hue.fringe = this.value;
		hue.back = this.value;
		hue.beard = this.value;
	} else if (selected == "eyes" ||
		selected == "eyebrows" ||
		selected == "mouth" ||
		selected == "acc" ||
		selected == "ltph" ||
		selected == "emotion" ||
		selected == "other") {} else {
		document.getElementById(selected).style.filter =
			"hue-rotate(" + this.value + "deg) saturate(" + sat[selected] + "%) brightness(" + bri[selected] + "%)";
		hue[selected] = this.value;
	}
} //hue      


document.getElementById("Slider-sat").oninput = function () {
	if (selected == "fringe" || selected == "back" || selected == "beard") {
		document.getElementById("fringe").style.filter =
			"hue-rotate(" + hue.fringe + "deg) saturate(" + this.value + "%) brightness(" + bri.fringe + "%)";

		document.getElementById("back").style.filter =
			"hue-rotate(" + hue.back + "deg) saturate(" + this.value + "%) brightness(" + bri.back + "%)";

		document.getElementById("beard").style.filter =
			"hue-rotate(" + hue.beard + "deg) saturate(" + this.value + "%) brightness(" + bri.beard + "%)";

		sat.fringe = this.value;
		sat.back = this.value;
		sat.beard = this.value;
	} else if (selected == "eyes" ||
		selected == "eyebrows" ||
		selected == "mouth" ||
		selected == "acc" ||
		selected == "ltph" ||
		selected == "emotion" ||
		selected == "other") {} else {
		document.getElementById(selected).style.filter =
			"hue-rotate(" + hue[selected] + "deg) saturate(" + this.value + "%) brightness(" + bri[selected] + "%)";
		sat[selected] = this.value;
	}
} //saturation 


document.getElementById("Slider-bri").oninput = function () {
	if (selected == "fringe" || selected == "back" || selected == "beard") {
		document.getElementById("fringe").style.filter =
			"hue-rotate(" + hue.fringe + "deg) saturate(" + sat.fringe + "%) brightness(" + this.value + "%)";

		document.getElementById("back").style.filter =
			"hue-rotate(" + hue.back + "deg) saturate(" + sat.back + "%) brightness(" + this.value + "%)";

		document.getElementById("back").style.filter =
			"hue-rotate(" + hue.beard + "deg) saturate(" + sat.beard + "%) brightness(" + this.value + "%)";

		bri.fringe = this.value;
		bri.back = this.value;
		bri.beard = this.value;
	} else if (itemname[i] == "eyes" ||
		itemname[i] == "eyebrows" ||
		itemname[i] == "mouth" ||
		itemname[i] == "acc" ||
		itemname[i] == "ltph" ||
		itemname[i] == "emotion" ||
		itemname[i] == "other") {} else {
		document.getElementById(selected).style.filter =
			"hue-rotate(" + hue[selected] + "deg) saturate(" + sat[selected] + "%) brightness(" + this.value + "%)";
		bri[selected] = this.value;
	}
} //brightness
//-----------------------------------------------------------------------------------------------------------------------------------------------