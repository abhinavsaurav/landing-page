/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * @description Defining Global Variables
 *
 */

let sectionVal = document.getElementsByTagName("section");
let ulReference = document.getElementById("navbar__list");
let portionOnScreen = new Array(sectionVal.length);

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * @description calculates the index position for current section on-screen
 *
 * @returns index position of the container to be made active
 *
 */

function calculate_minm() {
	let maxm = -1;
	let ind = -1;
	for (let i = 0; i < portionOnScreen.length; i++) {
		if (portionOnScreen[i] > maxm) {
			maxm = portionOnScreen[i];
			ind = i;
		}
	}
	return ind;
}

/**
 * @description Removes the highlight from the section container
 *
 */

function removeYourActiveClass() {
	document
		.getElementsByClassName("your-active-class")[0]
		.classList.remove("your-active-class");
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

/**
 * @description the percentage of screen occupied by section container and
 * 				then changing content based on screen area occupied by containers.
 *
 */

function calcPortionOfScreenOccupied() {
	let temp = -1;
	for (let j = 0; j < sectionVal.length; j++) {
		let top = sectionVal[j].getBoundingClientRect().top;
		let btm = sectionVal[j].getBoundingClientRect().bottom;
		let contHt = sectionVal[j].offsetHeight;
		let windowHt = window.innerHeight;

		if (top < 0 && btm < 0) {
			portionOnScreen[j] = 0;
		} else if (top < 0 && btm > 0 && btm < windowHt) {
			portionOnScreen[j] = btm;
		} else if (top >= 0 && btm > 0 && top < windowHt && btm < windowHt) {
			portionOnScreen[j] = contHt;
		} else if (top < windowHt && btm > windowHt) {
			portionOnScreen[j] = windowHt - top;
		} else {
			portionOnScreen[j] = 0;
		}
	}
	temp = calculate_minm();
	removeYourActiveClass();
	sectionVal[temp].classList.add("your-active-class");
	document.getElementsByClassName("active")[0].classList.remove("active");
	document.getElementById(`link${temp}`).classList.add("active");
}

/**
 * End Main Functions
 * Begin Events
 *
 */

/**
 *  Building nav menu
 */

for (let i = 0; i < sectionVal.length; i++) {
	let id = sectionVal[i].id;
	let listText = sectionVal[i].dataset.nav;
	const elem = document.createElement("li");
	const anchorElem = document.createElement("a");
	anchorElem.textContent = listText;
	anchorElem.setAttribute("href", `#${id}`);
	anchorElem.setAttribute("data-link", `${id}`);
	anchorElem.setAttribute("id", `link${i}`);
	if (i == 0) {
		anchorElem.setAttribute("class", "menu__link active");
	} else {
		anchorElem.setAttribute("class", "menu__link");
	}
	elem.appendChild(anchorElem);
	ulReference.appendChild(elem);
}

/**
 * @description Event for Scrolling to section on link click and setting section as active too.
 */

ulReference.addEventListener("click", function (event) {
	event.preventDefault();
	const sect = document.getElementById(event.target.dataset.link);
	sect.scrollIntoView({
		behavior: "smooth",
	});
	removeYourActiveClass();
	sect.classList.add("your-active-class");
});

/**
 * Event listener for changing the active sections on scrolling
 */

document.addEventListener("scroll", calcPortionOfScreenOccupied);
