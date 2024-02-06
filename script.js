function locomotiveAnimation() {
	gsap.registerPlugin(ScrollTrigger);

	// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

	const locoScroll = new LocomotiveScroll({
		el: document.querySelector("#main"),
		smooth: true,
	});
	// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
	locoScroll.on("scroll", ScrollTrigger.update);

	// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
	ScrollTrigger.scrollerProxy("#main", {
		scrollTop(value) {
			return arguments.length
				? locoScroll.scrollTo(value, 0, 0)
				: locoScroll.scroll.instance.scroll.y;
		}, // we don't have to define a scrollLeft because we're only scrolling vertically.
		getBoundingClientRect() {
			return {
				top: 0,
				left: 0,
				width: window.innerWidth,
				height: window.innerHeight,
			};
		},
		// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
		pinType: document.querySelector("#main").style.transform
			? "transform"
			: "fixed",
	});

	// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
	ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

	// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
	ScrollTrigger.refresh();
}
function loadingAnimation() {
	var tl = gsap.timeline();
	tl.from(".line h1", {
		y: 150,
		stagger: 0.25,
		duration: 0.6,
		delay: 0.5,
	});
	tl.from("#line1-part1", {
		opacity: 0,
		onStart: function () {
			var h5timer = document.querySelector("#line1-part1 h5");
			var grow = 0;
			setInterval(function () {
				if (grow < 100) {
					h5timer.innerHTML = grow++;
				} else {
					h5timer.innerHTML = grow;
				}
			}, 27);
		},
	});
	tl.to(".line h2", {
		animationName: "loaderAnime",
		opacity: 1,
	});
	tl.to("#loader", {
		opacity: 0,
		duration: 0.2,
		delay: 2.6,
	});
	tl.from("#page1", {
		delay: 0.1,
		y: 1600,
		duration: 0.5,
		ease: Power4,
	});
	tl.to("#loader", {
		display: "none",
	});
	tl.from("#nav", {
		opacity: 0,
	});
	tl.from("#hero1 h1,#hero2 h1,#hero3 h2,#hero4 h1", {
		y: 140,
		stagger: 0.2,
	});
	tl.from(
		"#hero1, #page2",
		{
			opacity: 0,
		},
		"-=1.2"
	);
}
function cursorAnimation() {
	Shery.mouseFollower({
		skew: true,
		ease: "cubic-bezier(0.23, 1, 0.320, 1)",
		duration: 1,
	});
	Shery.makeMagnet("#nav-part2 h4");

	var videoContainer = document.querySelector("#video-container");
	var video = document.querySelector("#video-container video");
	videoContainer.addEventListener("mouseenter", function () {
		videoContainer.addEventListener("mousemove", function (dets) {
			gsap.to(".mousefollower", {
				opacity: 0,
			});
			gsap.to("#video-cursor", {
				left: dets.x - 570,
				y: dets.y - 300,
			});
		});
	});
	videoContainer.addEventListener("mouseleave", function () {
		gsap.to(".mousefollower", {
			opacity: 1,
		});
		gsap.to("#video-cursor", {
			left: "70%",
			top: "-15%",
		});
	});

	var flag = 0;
	videoContainer.addEventListener("click", function () {
		if (flag == 0) {
			video.play();
			video.style.opacity = 1;
			document.querySelector(
				"#video-cursor"
			).innerHTML = `<i class="ri-pause-mini-fill"></i>`;
			gsap.to("#video-cursor", {
				scale: 0.5,
			});
			flag = 1;
		} else {
			video.pause();
			video.style.opacity = 0;
			document.querySelector(
				"#video-cursor"
			).innerHTML = `<i class="ri-play-mini-fill"></i>`;
			gsap.to("#video-cursor", {
				scale: 1,
			});
			flag = 0;
		}
	});
}
function sheryAnimation() {
	Shery.imageEffect(".image-div", {
		style: 5,
		gooey: true,
		// debug: true,
		config: {
			a: { value: 2, range: [0, 30] },
			b: { value: -1, range: [-1, 1] },
			zindex: { value: -9996999, range: [-9999999, 9999999] },
			aspect: { value: 0.7241195453907675 },
			ignoreShapeAspect: { value: true },
			shapePosition: { value: { x: 0, y: 0 } },
			shapeScale: { value: { x: 0.5, y: 0.5 } },
			shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
			shapeRadius: { value: 0, range: [0, 2] },
			currentScroll: { value: 0 },
			scrollLerp: { value: 0.07 },
			gooey: { value: true },
			infiniteGooey: { value: false },
			growSize: { value: 4, range: [1, 15] },
			durationOut: { value: 1, range: [0.1, 5] },
			durationIn: { value: 1.5, range: [0.1, 5] },
			displaceAmount: { value: 0.5 },
			masker: { value: true },
			maskVal: { value: 1.23, range: [1, 5] },
			scrollType: { value: 0 },
			geoVertex: { range: [1, 64], value: 1 },
			noEffectGooey: { value: true },
			onMouse: { value: 0 },
			noise_speed: { value: 0.5, range: [0, 10] },
			metaball: { value: 0.33, range: [0, 2] },
			discard_threshold: { value: 0.5, range: [0, 1] },
			antialias_threshold: { value: 0.01, range: [0, 0.1] },
			noise_height: { value: 0.5, range: [0, 2] },
			noise_scale: { value: 10, range: [0, 100] },
		},
	});
}
function flagAnimation() {
	document.addEventListener("mousemove", function (dets) {
		gsap.to("#flag", {
			x: dets.x,
			y: dets.y,
		});
	});
	document.querySelector("#hero3").addEventListener("mouseenter", function () {
		gsap.to("#flag", {
			opacity: 1,
		});
	});
	document.querySelector("#hero3").addEventListener("mouseleave", function () {
		gsap.to("#flag", {
			opacity: 0,
		});
	});
}
function footerAnimation() {
	var clutter = "";
	var clutter2 = "";
	document
		.querySelector("#footer h1")
		.textContent.split("")
		.forEach(function (elem) {
			clutter += `<span>${elem}</span>`;
		});
	document.querySelector("#footer h1").innerHTML = clutter;
	document
		.querySelector("#footer h2")
		.textContent.split("")
		.forEach(function (elem) {
			clutter2 += `<span>${elem}</span>`;
		});
	document.querySelector("#footer h2").innerHTML = clutter2;

	document
		.querySelector("#footer-text")
		.addEventListener("mouseenter", function () {
			gsap.to("#footer h1 span", {
				opacity: 0,
				stagger: 0.05,
			});
			gsap.to("#footer h2 span", {
				delay: 0.35,
				opacity: 1,
				stagger: 0.1,
			});
		});
	document
		.querySelector("#footer-text")
		.addEventListener("mouseleave", function () {
			gsap.to("#footer h1 span", {
				opacity: 1,
				stagger: 0.1,
				delay: 0.35,
			});
			gsap.to("#footer h2 span", {
				opacity: 0,
				stagger: 0.05,
			});
		});
}
const subtitle = document.getElementsByClassName("card-subtitle")[0];

const createWord = (text, index) => {
	const word = document.createElement("span");

	word.innerHTML = `${text} `;

	word.classList.add("card-subtitle-word");

	word.style.transitionDelay = `${index * 40}ms`;

	return word;
};

const addWord = (text, index) => subtitle.appendChild(createWord(text, index));

const createSubtitle = (text) => text.split(" ").map(addWord);

createSubtitle(
	"FoundIt: Redefining lost item recovery with tech innovation and community focus. Secure, private, and future-ready."
);

let index = 0,
	interval = 1000;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const animate = (star) => {
	star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
	star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

	star.style.animation = "none";
	star.offsetHeight;
	star.style.animation = "";
};

for (const star of document.getElementsByClassName("magic-star")) {
	setTimeout(() => {
		animate(star);

		setInterval(() => animate(star), 1000);
	}, index++ * (interval / 3));
}
document.getElementById("cards").onmousemove = (e) => {
	const cards = document.querySelectorAll(".card1");

	for (const card of cards) {
		const rect = card.getBoundingClientRect(),
			x = e.clientX - rect.left,
			y = e.clientY - rect.top;

		card.style.setProperty("--mouse-x", `${x}px`);
		card.style.setProperty("--mouse-y", `${y}px`);
	}
};
// text effect
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval1 = null;

document.querySelector("#page3 h1 ").onmouseover = (event) => {
	let iteration = 0;

	clearInterval(interval1);

	interval1 = setInterval(() => {
		event.target.innerText = event.target.innerText
			.split("")
			.map((letter, index) => {
				if (index < iteration) {
					return event.target.dataset.value[index];
				}

				return letters[Math.floor(Math.random() * 26)];
			})
			.join("");

		if (iteration >= event.target.dataset.value.length) {
			clearInterval(interval1);
		}

		iteration += 1 / 3;
	}, 30);
};
document.querySelector("#page4 h1 ").onmouseover = (event) => {
	let iteration = 0;

	clearInterval(interval1);

	interval1 = setInterval(() => {
		event.target.innerText = event.target.innerText
			.split("")
			.map((letter, index) => {
				if (index < iteration) {
					return event.target.dataset.value[index];
				}

				return letters[Math.floor(Math.random() * 26)];
			})
			.join("");

		if (iteration >= event.target.dataset.value.length) {
			clearInterval(interval1);
		}

		iteration += 1 / 3;
	}, 30);
};
// qr animation
const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const randomChar = () => chars[Math.floor(Math.random() * (chars.length - 1))],
	randomString = (length) => Array.from(Array(length)).map(randomChar).join("");

const card = document.querySelector(".card2"),
	letters1 = card.querySelector(".card-letters2");

const handleOnMove = (e) => {
	const rect = card.getBoundingClientRect(),
		x = e.clientX - rect.left,
		y = e.clientY - rect.top;

	letters1.style.setProperty("--x", `${x}px`);
	letters1.style.setProperty("--y", `${y}px`);

	letters1.innerText = randomString(1500);
};

card.onmousemove = (e) => handleOnMove(e);

card.ontouchmove = (e) => handleOnMove(e.touches[0]);

const contributor = () => {
	const gaurav = document.getElementById("card1");
	const yash = document.getElementById("card2");
	const prathemsh = document.getElementById("card3");
	const aditya = document.getElementById("card4");

	gaurav.onclick = () => {
		let url = "https://github.com/chaudhariGaurav07";
		window.open(url, "_blank");
	};
	yash.onclick = () => {
		let url = "https://github.com/YashVarpe05";
		window.open(url, "_blank");
	};
	prathemsh.onclick = () => {
		let url = "https://github.com/";
		window.open(url, "_blank");
	};
	aditya.onclick = () => {
		let url = "https://github.com/SuryawanshiAditya";
		window.open(url, "_blank");
	};
};
contributor();
loadingAnimation();
cursorAnimation();
locomotiveAnimation();
sheryAnimation();
flagAnimation();
footerAnimation();
