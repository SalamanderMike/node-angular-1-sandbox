export default function AppController ($scope, $animateCss, $timeout, $q) {
	'ngInject';
	var app = this;
	var animations;
	var gameState;
	var bubblePerSecond = null;
	var secureClosureCount = 0;
	var bubbleKey = 0;
	$scope.generateBubbles = false;
	$scope.stateOfGame = "Start";
	$scope.score = "0000000";
	$scope.speed = 10;
	$scope.bubbles = {"0": 0};

	function getAnimationState() {
		var animations = document.querySelectorAll('.bubble');
		return animations;
	}


	function newBubbles() {
		$timeout.cancel(bubblePerSecond);
		bubbleKey++;
		if (bubbleKey > 8) {
			return;
		} else {
			var key = (bubbleKey).toString();
			$scope.bubbles[key] = bubbleKey;

			$q.when(getAnimationState()).then(function(animations) {
				for (var i = 0; i < animations.length; i++) {
					animations[i].style.webkitAnimationPlayState = 'running';
				};
			})
			// console.log("newBubbles Triggered");
			bubblePerSecond = $timeout(newBubbles, 1000);
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
