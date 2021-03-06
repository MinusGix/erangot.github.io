$(document).ready(function () {
	$('#intro').modal('show');
	class Item {
		constructor (name, num=0) {
			this.name = name;
			this.amount = num;
			this.hue = 0;
			this.saturation = 0;
			this.brightness = 0;
		}

		static make (name, num) {
			return new Item(name, num);
		}

		copy (item) {
			this.copyHue(item);
			this.copySaturation(item);
			this.copyBrightness(item);
		}

		copyHue (item) {
			this.hue = item.hue;
		}

		copySaturation (item) {
			this.saturation = item.saturation;
		}

		copyBrightness(item) {
			this.brightness = item.brightness;
		}

		set (hue, saturation, brightness) {
			this.hue = hue;
			this.saturation = saturation;
			this.brightness = brightness;
		}
	}
	items = {
		fringe: new Item("fringe", 21),
		back: new Item("back", 23),
		topa: new Item("topa", 22),
		bottom: new Item("bottom", 20),

		eyes: new Item("eyes", 15),
		eyebrows: new Item("eyebrows", 10),
		mouth: new Item("mouth", 17),
		topb: new Item("topb", 11),

		dress: new Item("dress", 8),
		shoes: new Item("shoes", 7),
		hat: new Item("hat", 19),
		acc: new Item("acc", 18),

		ltph: new Item("ltph", 10),
		beard: new Item("beard", 3),
		eyewear: new Item("eyewear", 13),
		emotion: new Item("emotion", 5),

		other: new Item("other", 6),
		cape: new Item("cape", 6),
		scarf: new Item("scarf", 11)
	}
	//variable declarations

	hair = [items.fringe, items.back, items.beard];//hair items are items that have same color.

	//initialize all content in ITEM DRAWER tab
	for (let name in items) {
		for (let i = 1; i <= items[name].amount; i++) {
			let img = document.createElement('img');
			img.setAttribute("src", "img/" + name + "/" + name + i + ".png");
			img.setAttribute("class", "item-option");
			img.setAttribute("onClick", "changeImg('" + name + "', " + i + ");");
			$("." + name + "Items").append(img);
		}
	}

	//generates color picker palette
	let pickerID = 1;
	let pickerHue = [0, 45, 70, 100, 200, 300];
	let pickerBrightness = 500;

	for (let brightnessLevel = 0; brightnessLevel < 3; brightnessLevel++) {
		for (let currentHue = 0; currentHue < 6; currentHue++) {
			let saturation = 10;
			// for (var saturation = 10; saturation < 70; saturation += 30) { but that's ugly.
			for (let c = 0; c < 2; c++) { //saturation                  
				let picker = document.createElement("div");

				picker.setAttribute("id", "picker" + pickerID);
				picker.setAttribute("class", "picker");
				picker.setAttribute("onClick", "picker(" + pickerHue[currentHue] + ", " + saturation + "," + pickerBrightness + ")");

				$(".color-picker").append(picker);

				document.getElementById("picker" + pickerID).style.filter = 
                "hue-rotate(" + pickerHue[currentHue] + "deg) saturate(" + saturation + "%) brightness(" + pickerBrightness + "%)";

				pickerID++;
				saturation += 30;
			}
			//no changes on hue    
		}
		pickerBrightness -= 210;
	}

	//initialize to eyes items
	document.getElementById("eyesTab").style = "display: block";
	current = items.eyes;
	
	randomizer();	
});

//set sliders to which item is selected
function setColor(instance) {
	current = instance;
	
	if (current.name !== "eyes" && current.name !== "eyebrows" && current.name !== "mouth" && current.name !== "ltph") {
		document.getElementById("Slider-hue").value = current.hue;
		document.getElementById("Slider-saturation").value = current.saturation;
		document.getElementById("Slider-brightness").value = current.brightness;
	}	
} 

function randomNumber(min=0, max=10) {
	return Math.floor(Math.random() * (max - min)) + min; // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
}

function randomizer() {
	let skin = randomNumber(1, 6); // 1, 2, 3, 4, 5
	document.getElementById("base").src = ("img/base/base" + skin + ".png");

	for (let name in items) {
		if (name !== "eyes" && name !== "eyebrows" && name !== "mouth" && name !== "acc" && name !== "ltph" && name !== "emotion" && name !== "other") {
			let item = items[name];
			item.set(
				randomNumber(0, 360),
				randomNumber(0, 50),
				randomNumber(0, 500)
			);

			if (item.brightness <= 40) {
				item.brightness = 40;
			}
		}
	}

	items.back.copy(items.fringe);
	items.beard.copy(items.fringe);
	
	setColor(current); //set sliders to which item is selected

	//random select images from folder
	for (let name in items) {
		let item = document.getElementById(name);
		let randomVal = randomNumber(0, items[name].amount) + 1;

		if (name !== 'shoes' && name !== 'beard' && name !== 'eyewear') {
			item.src = "img/" + name + "/" + name + randomVal + ".png";
		}

		if (name !== "eyes" && name !== "eyebrows" && name !== "mouth" && name !== "acc" && name !== "ltph" && name !== "emotion" && name !== "other") {
			setFilter(items[name]);
		}
	}


	let hasDress = randomNumber(0, 3) === 0;
	// Randomly gets if base wears a dress or not. 0 for normal and 1 for dress.

	if (hasDress) { // Resets Top A, B and Bottom if Dress is present.
		document.getElementById("topa").src = "img/topa/topa1.png";
		document.getElementById("topb").src = "img/topb/topb1.png";
		document.getElementById("bottom").src = "img/bottom/bottom1.png";
		document.getElementById("cape").src = "img/cape/cape1.png";
		document.getElementById("scarf").src = "img/scarf/scarf1.png";

		let dress = 0;
		while (dress <= 1) {
			dress = randomNumber(1, items.dress.amount + 1)
		}

		document.getElementById("dress").src = "img/dress/dress" + dress + ".png";

	} else { // Returns normal clothes
		document.getElementById("dress").src = "img/dress/dress1.png";
	}
}

//replace current image
function changeImg(item, num) {
	document.getElementById(item).src = ("img/" + item + "/" + item + num + ".png");
}

//resets current appearance
function clearImg() {
	let itemNames = ["topa", "topb", "bottom", "dress", "shoes", "hat",
		"acc", "ltph", "eyewear", "emotion", "other", "cape", "scarf"
	];
	for (let i = 0; i < itemNames.length; i++) {
		let name = itemNames[i];
		document.getElementById(name).src = "img/" + name + "/" + name + "1.png";
	}
} 

// ran in the html file
//select items from dropdown menu
function setTab(itemName) {
	document.getElementById("skinTab").style = "display: none";

	for (let name in items) {
		document.getElementById(name + "Tab").style = "display: none";
	}

	document.getElementById(itemName + "Tab").style = "display: block";
	setColor(items[itemName]);
}

//shows color picker menu
function showPicker() {
	document.getElementById("color-picker").style = "display: block";
	document.getElementById("color-custom").style = "display: none";
} 

//shows custom color menu
function showCustom() {
	document.getElementById("color-custom").style = "display: block";
	document.getElementById("color-picker").style = "display: none";
}

//premade color palette
function picker(hue, saturation, brightness) {
	if (current.name !== "eyes" && current.name !== "eyebrows" && current.name !== "mouth" && current.name !== "acc" 
		&& current.name !== "ltph" && current.name !== "emotion" && current.name !== "other") {

		current.set(hue, saturation, brightness)
		
		setColor(current);
		setFilter(current);
	}

	if (hair.includes(current)) {
		for (let i = 0; i < hair.length; i++) {
			hair[i].set(hue, saturation, brightness);

			setColor(hair[i]);
			setFilter(hair[i]);
		}
	}
} 

function setFilter (item) {
	document.getElementById(item.name).style.filter = `hue-rotate(${item.hue}deg) saturate(${item.saturation}%) brightness(${item.brightness}%)`;
}

//----VALUES FOR GENERAL COLOR SLIDER-------------------
["hue", "saturation", "brightness"].forEach(attribute => document.getElementById("Slider-" + attribute).addEventListener("input", function (evt) {
	if (hair.includes(current)) {
		items.fringe[attribute] = this.value;
		items.back[attribute] = this.value;
		items.beard[attribute] = this.value;

		setFilter(items.fringe);
		setFilter(items.back);
		setFilter(items.beard);
	} else if (!["eyes", "eyebrows", "mouth", "acc", "ltph", "emotion", "other"].includes(current.name)) {
		current[attribute] = this.value;
		setFilter(current);
	}
}));