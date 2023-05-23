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
	let width = screen.width;
	if (width < 688) {
		document.getElementById("bubble").src = "video/bubble-mobile.webm";
	}

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
				"https://player.vimeo.com/video/822509710?autoplay=0&muted=1&controls=0&autopause=0";
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

	/*
  slideWrapper.on("lazyLoaded", function (event, slick, image, imageSource) {
	lazyCounter++;
	if (lazyCounter === lazyImages.length) {
	  lazyImages.addClass('show');
	  slideWrapper.slick("slickPlay");
	}
  });
  */

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
			swipe: false,
			swipeToSlide: false,
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
	.to(".loader__element", 1, {
		scaleX: 50,
		scaleY: 50,
		translateX: -500,
		translateY: 500,
		ease: "expo.In",
	});

/*
var t2 = gsap.timeline();
t2.pause();
t2.set('.loader2', {
  display: 'block'
}).set('.loader__element2', {
  transformOrigin: 'center right',
}).to('.loader__element2', 1, {
  scaleX: 1,
  ease: 'expo.inOut',
  stagger: 0.1,
}).set('.loader__element2', {
  transformOrigin: 'center left',
}).to('.loader__element2', 1, {
  scaleX: 0,
  ease: 'expo.inOut',
  stagger: -0.1,
}).set('.loader2', {
  display: 'none',
});
*/

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

/*
function animation2() {
  t2.seek(1.0);
  t2.play();
}
*/

//exit animation of landing page
function animation3() {
	t3.play(0);
}

function animCompleted() {
	window.location.href = "about.html";
}

// document.addEventListener('click', animation);
$("a.navlink").click(function () {
	animation();
});

//function to hide the landing page
function finished() {
	myDelay = setTimeout(animation3, 3000);
}
