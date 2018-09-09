export default function AppController ($scope, $animateCss, $timeout, $q) {
	'ngInject';
	var app = this;
	var animations;
	var bubblePerSecond = null;
	var n = 0;
	$scope.generateBubbles = false;
	$scope.stateOfGame = "Start";
	$scope.score = "0000000";
	$scope.speed = 10;
	$scope.bubbles = {"1": 1};

	function getAnimationState() {
		var animations = document.querySelectorAll('.bubble');
		return animations;
	}


	function newBubbles() {
		n++;
		if (n > 8) {
			alert('End Of Game');
			return;
		} else {
			var key = (n).toString();
			$scope.bubbles[key] = n;

			$q.when(getAnimationState()).then(function(animations) {
				for (var i = 0; i < animations.length; i++) {
					animations[i].style.webkitAnimationPlayState = 'running';
					console.log(animations[i].style.webkitAnimationPlayState);
				};
			})
			bubblePerSecond = $timeout(newBubbles, 1000);
		}
	}



	$scope.toggleAnimation = function(gameState) {
		var style;

		if (gameState === "new") {
			$scope.generateBubbles = true;
			$scope.stateOfGame = "Pause";
			$timeout.cancel(bubblePerSecond);
			newBubbles();
		} else if (gameState === "pause") {
			$scope.stateOfGame = "Resume";
			$timeout.cancel(bubblePerSecond);
			bubblePerSecond = null;
			$q.when(getAnimationState()).then(function(animations) {
				for (var i = 0; i < animations.length; i++) {
					animations[i].style.webkitAnimationPlayState = 'paused';
					// console.log(animations[i].style.webkitAnimationPlayState);
				}
			})
		} else {
			$q.when(getAnimationState()).then(function(animations) {
				$scope.stateOfGame = "Pause";
				$timeout.cancel(bubblePerSecond);
				bubblePerSecond = null;
				for (var i = 0; i < animations.length; i++) {
					animations[i].style.webkitAnimationPlayState = 'running';
					// console.log(animations[i].style.webkitAnimationPlayState);
				}
			}, newBubbles())
		}
	};


























};
