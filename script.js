
window.onload = function () {

	if (screen.width < 688) {
		myDelay = setTimeout(closeLandingPage, 3000);

	} else {
		document.getElementById('bubd').addEventListener('ended', myHandler, false);
	}
}

function myHandler(e) {
	console.log("desktop bubble anim done");
	closeLandingPage();
}

$("a.navlink").click(function () {
	animation();
});


var slideWrapper = $(".main-slider"),
	iframes = slideWrapper.find(".embed-player");

// lazyImages = slideWrapper.find('.slide-image'),
// lazyCounter = 0;

// POST commands to YouTube or Vimeo API
/*
function postMessageToPlayer(player, command) {
	if (player == null || command == null) return;
	player.contentWindow.postMessage(JSON.stringify(command), "*");
}
*/

// When the slide is changing
function playPauseVideo(slick, control) {
	var currentSlide, slideType, startTime, player, video;
	var play_count = 0;

	currentSlide = slick.find(".slick-current");
	//slideType = currentSlide.attr("class").split(" ")[1];
	//player = currentSlide.find("iframe").get(0);
	//startTime = currentSlide.data("video-start");
	var current_iframe = currentSlide.find("iframe").get(0);
	var player = [];
	player = new Vimeo.Player(current_iframe);

	//if (slideType === "vimeo") {
	switch (control) {
		case "play":
			/*
			if ((startTime != null && startTime > 0) && !currentSlide.hasClass('started')) {
				currentSlide.addClass('started');
				postMessageToPlayer(player, {
				"method": "setCurrentTime",
				"value": startTime
				});
			}
			*/
			/*
			postMessageToPlayer(player, {
				method: "play",
				value: 1,
			});
			*/
			player.setCurrentTime(0);
			player.play();

			player.getVideoTitle().then(function (title) {
				console.log("----------------------------");
				console.log("title:", title);
			});

			player.off("play");
			player.on("play", function (data) {
				console.log("duration: " + data.duration);
			});

			player.getLoop().then(function (loop) {
				console.log("loop: " + loop);
			});

			player.off("ended");
			player.on("ended", function (data) {
				console.log("video ended");
				play_count++;
				console.log(play_count);

				if (play_count > 1) {
					player.pause();

					// player.unload().then(function () {
					// 	console.log("unload video");
					// });
					play_count = 0;
					slideWrapper.slick("slickNext");
				} else {
					player.setCurrentTime(0);
					player.play();
				}
			});

			/*
			player.on('timeupdate', function (data) {
				//console.log('Percentage watched: ' + data.percent);
				let currentSecond = Math.floor(data.seconds);
				let totalSecond = Math.floor(data.duration);
				//console.log(currentSecond + "/" + totalSecond);
				if (currentSecond >= totalSecond - 1) {
					//this.off('timeupdate');

					console.log(count);
				}
			});
			*/

			break;
		case "pause":
			/*
			postMessageToPlayer(player, {
				"method": "pause",
				"value": 1
			});
			*/

			play_count = 0;
			player.setCurrentTime(0);
			player.pause();
			//unload the video and reload it (to restart the video)
			// var video_src = current_iframe.src;
			// current_iframe.src = "";
			// current_iframe.src = video_src;

			// player.unload().then(function () {
			// 	console.log("unload video");
			// });

			break;
	}

	//}
}

// Resize player
function resizePlayer(iframes, ratio) {
	if (!iframes[0]) return;
	var win = $(".main-slider"),
		width = win.width(),
		playerWidth,
		height = win.height(),
		playerHeight,
		ratio = ratio || 16 / 9;

	// console.log("ratio: " + ratio);
	// console.log("width: " + width);
	// console.log("width/ratio: " + width / ratio);
	// console.log("height: " + height);

	clony = $(".slick-cloned");

	var combined = iframes.add(clony);

	combined.each(function () {
		var current = $(this);
		//if (width / ratio < height) {
		let scrWidth = screen.width;
		if (scrWidth < 688) {
			console.log("video is portrait");
			//playerWidth = Math.ceil(height * ratio);
			playerWidth = width;
			current
				.width(playerWidth)
				.height(playerWidth)
				.css({
					left: (width - playerWidth) / 2,
					top: 0,
				});
		} else {
			console.log("video is landscape");
			playerHeight = Math.ceil(width / ratio);
			current
				.width(width)
				.height(playerHeight)
				.css({
					left: 0,
					top: (height - playerHeight) / 2,
				});
		}
	});
}

// DOM Ready
$(function () {
	// Initialize

	//check if coming from about page
	//if yes, check if referrer is valid (click on icon) or invalid (click on nok logo)
	try {
		let prevURL = document.referrer;
		const url = new URL(prevURL);
		console.log("Prevous page: " + url.pathname);

		if (url.pathname.indexOf("about.html") > -1) {
			console.log("came from about page, no landing page shown");
			$('.landing').hide();
			//animation2();
		} else {
			console.log("not coming from about page");
			$('.landing').show();
		}
	} catch (err) {
		console.log("error with referrer url");
		$('.landing').show();
	}

	//reset the src of the mobile bubble webp so it will restart
	document.getElementById('bubm').style.visibility = "hidden";
	document.getElementById('bubm').src = "";
	document.getElementById('bubm').style.visibility = "visible";
	document.getElementById('bubm').src = "video/bub-m.webp";

	slideWrapper.on("init", function (slick) {
		slick = $(slick.currentTarget);
		//newSrc();
		setTimeout(function () {
			playPauseVideo(slick, "play");
		}, 2400);

		let width = screen.width;
		if (width < 688) {
			//mobile
			resizePlayer(iframes, 1 / 1);
			//set the source of vimeo to mobile version
			document.getElementById("slide1").src =
				"https://player.vimeo.com/video/829706398?autoplay=0&muted=1&controls=0&autopause=0";
			document.getElementById("slide2").src =
				"https://player.vimeo.com/video/822509710?autoplay=0&muted=1&controls=0&autopause=0";
			document.getElementById("slide3").src =
				"https://player.vimeo.com/video/822510328?autoplay=0&muted=1&controls=0&autopause=0";
			document.getElementById("slide4").src =
				"https://player.vimeo.com/video/822510689?autoplay=0&muted=1&controls=0&autopause=0";
			document.getElementById("slide5").src =
				"https://player.vimeo.com/video/822510639?autoplay=0&muted=1&controls=0&autopause=0";
			document.getElementById("slide6").src =
				"https://player.vimeo.com/video/825722079?autoplay=0&muted=1&controls=0&autopause=0";
			document.getElementById("slide7").src =
				"https://player.vimeo.com/video/825722519?autoplay=0&muted=1&controls=0&autopause=0";
		} else {
			resizePlayer(iframes, 16 / 9);
		}
	});

	slideWrapper.on("beforeChange", function (event, slick) {
		console.log("beforeChange");
		slick = $(slick.$slider);
		playPauseVideo(slick, "pause");
	});
	slideWrapper.on("afterChange", function (event, slick) {
		console.log("afterChange");
		slick = $(slick.$slider);
		playPauseVideo(slick, "play");
	});

	$(".go-prev").click(function () {
		//console.log("go-prev");
		slideWrapper.slick("slickPrev");
	});

	$(".go-next").click(function () {
		//console.log("go-next");
		slideWrapper.slick("slickNext");
	});

	if ($.fn.slick) {
		// check if slick exist
		//start the slider
		slideWrapper.slick({
			autoplaySpeed: 4000,
			autoplay: false,
			lazyLoad: "progressive",
			infinite: true,
			speed: 600,
			arrows: true,
			dots: false,
			draggable: false,
			touchMove: false,
			swipe: true,
			swipeToSlide: true,
			accessibility: false,
			cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)",
		});
	}
});

// Resize event
// $(window).on("resize.slickVideoPlayer", function () {
//   resizePlayer(iframes, 16 / 9);
// });

var tl = gsap.timeline({ onComplete: animCompleted });
tl.pause();
tl.set(".loader", {
	display: "block",
})
	.set(".loader__element", {
		transformOrigin: "center center",
		borderRadius: "100%",
	})
	.to(".loader__element", 1.2, {
		scaleX: 50,
		scaleY: 50,
		translateX: -500,
		translateY: 500,
		ease: "expo.InOut",
	});


var t2 = gsap.timeline({ onComplete: animCompleted2 });
t2.pause();
t2.set(".loader", {
	display: "block",
	backgroundColor: 'black',
})
	.set(".loader__element", {
		transformOrigin: "center center",
		borderRadius: "100%",
	})
	.to(".loader__element", 1, {
		scaleX: 50,
		scaleY: 50,
		translateX: -500,
		translateY: 500,
		ease: "expo.In",
	}).set(".loader", {
		display: "none",
	});


var t3 = gsap.timeline();
if ($(".landing")[0]) {
	t3.pause();
	t3.to(".landing", 1, {
		transform: "translateX(-100vw)",
		ease: "expo.inOut",
	}).set(".landing", {
		display: "none",
	});
}

//exit animation of main page
function animation() {
	tl.play(0);
}

function animation2() {
	t2.reverse(0);
}

//exit animation of landing page
function closeLandingPage() {
	t3.play(0);
}

function animCompleted() {
	window.location.href = "about.html";
}

function animCompleted2() {
	//window.location.href = "index.html";
}




