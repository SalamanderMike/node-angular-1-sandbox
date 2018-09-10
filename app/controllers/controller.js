export default function AppController ($scope, $animateCss, $timeout, $q) {
	'ngInject';
	var app = this;
	var animations = [];
	var thisBubble = [];
	var gameState;
	var bubblePerSecond = null;
	var secureClosureCount = 0;
	let bubbleKey = 0;
	let x = 0;
	$scope.generateBubbles = false;
	$scope.stateOfGame = "Start";
	$scope.addToScore = 0;
	$scope.score = "0000000";
	$scope.speed = 10;
	$scope.bubbles = {};

	function getAnimationState() {
		animations = document.querySelectorAll('.bubble');
		return animations;
	}


	function newBubbles() {
		var horizontalPos = Math.floor(Math.random() * (89 - 5)) + 5;
		var size = Math.floor(Math.random() * (85 - 10)) + 10;
		var initialSpeed = Math.floor(Math.random() * (7000 - 4500)) + 4500;
		$timeout.cancel(bubblePerSecond);
		if (bubbleKey >= 30) {
			return;
		} else {
			var key = (bubbleKey).toString();
			$scope.bubbles[key] = bubbleKey;

			$q.when(getAnimationState()).then(function(animations) {
				for (let i = 0; i < animations.length; i++) {
					animations[i].style.webkitAnimationPlayState = 'running';

					if (i+1 == animations.length) {
						console.log(i,"horizontalPos",horizontalPos + "%");
						animations[i].style.top = 0 + 'px';
						animations[i].style.left = horizontalPos + '%';
						animations[i].style.width = size + 'px';
						animations[i].style.height = size + 'px';
						animations[i].animate([
							{ transform: 'translateY(10vh)' }, 
							{ transform: 'translateY(100vh)' }
							], { 
							duration: initialSpeed,
							iterations: Infinity
						});
					}
				};
				bubblePerSecond = $timeout(function() {
					bubbleKey = bubbleKey + 1;
					newBubbles();
				},1000)
			})
		}
	}

	function pauseLoop() {
		$timeout.cancel(bubblePerSecond);
		if (gameState === "pause") {
			secureClosureCount++;
			$q.when(getAnimationState()).then(function(animations) {
				for (var i = 0; i < animations.length; i++) {
					animations[i].style.webkitAnimationPlayState = 'paused';
				};
			}, (function() {
				if (secureClosureCount < 80) {
					bubblePerSecond = $timeout(pauseLoop, 100)
				} else {
					$timeout.cancel(bubblePerSecond);
				}
			})());
		} else {
			$q.when(getAnimationState()).then(function(animations) {
				for (var i = 0; i < animations.length; i++) {
					animations[i].style.webkitAnimationPlayState = 'running';
				};
			}, newBubbles());
		}
	}


	$scope.toggleAnimation = function(state) {
		secureClosureCount = 0;
		gameState = state;
		var style;

		if (gameState === "new") {
			$scope.generateBubbles = true;
			$scope.stateOfGame = "Pause";
			// thisBubble = document.querySelectorAll('.bubble');
			// console.log("initial:",thisBubble);

			newBubbles();
		} else if (gameState === "pause") {
			$scope.stateOfGame = "Resume";
			pauseLoop();
		} else {
			$scope.stateOfGame = "Pause";
			pauseLoop();
		}
	};


























};
