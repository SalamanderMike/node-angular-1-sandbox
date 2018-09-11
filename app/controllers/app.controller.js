export default function AppController ($scope, $animateCss, $timeout, $q) {
	'ngInject';
	var app = this;
	var gameState;
	var animations = [];
	var bubblePerSecond = null;
	var secureClosureCount = 0;
	$scope.stateOfGame = "Start";
	$scope.score = 0;
	$scope.speed = 10;

	$scope.toggleAnimation = function(state) {
		var style;
		gameState = state;
		secureClosureCount = 0;

		if (gameState === "new") {
			$scope.stateOfGame = "Pause";
			moveBubbles();
		} else if (gameState === "pause") {
			$scope.stateOfGame = "Resume";
			pauseLoop();
		} else {
			$scope.stateOfGame = "Pause";
			pauseLoop();
		}
	};

	$scope.collectScore = function(score) {
		$scope.score += score;
	}

	function getAnimationState() {
		animations = document.querySelectorAll('.bubble');
		// console.log(".bubble Children:",animations);
		return animations;
	}

	 $scope.getAnimationState = function() {
		animations = document.querySelectorAll('.bubble');
		console.log(".bubble Children",animations);
	}



	function moveBubbles() {
		$q.when(getAnimationState()).then(function(animations) {
			for (let i = 0; i < animations.length; i++) {
				var initialSpeed = Math.floor(Math.random() * (7000 - 4500)) + 4500;
				animations[i].style.webkitAnimationPlayState = 'running';
				animations[i].animate([
					{ transform: 'translateY(10vh)' }, 
					{ transform: 'translateY(100vh)' }
					], { 
					duration: initialSpeed,
					iterations: Infinity,
					delay: i * 1000
				});
			};
		})
	}

	function pauseLoop() {
		// console.log("In LOOP");
		$timeout.cancel(bubblePerSecond);
		if (gameState === "pause") {
			// console.log("In PAUSE");
			secureClosureCount++;
			$q.when(getAnimationState()).then(function(animations) {
				// console.log("animations.length",animations.length);
				for (let i = 0; i < animations.length; i++) {
					animations[i].style.webkitAnimationPlayState = 'paused';
					// console.log("webkitAnimationPlayState",animations[i].style.webkitAnimationPlayState);
				};
			}, (function() {
				if (secureClosureCount < 10) {
					bubblePerSecond = $timeout(pauseLoop, 100)
				} else {
					$timeout.cancel(bubblePerSecond);
				}
			})());
		} else {
			// console.log("In RESUME");
			$q.when(getAnimationState()).then(function(animations) {
				for (let i = 0; i < animations.length; i++) {
					animations[i].style.webkitAnimationPlayState = 'running';
				};
			}, moveBubbles());
		}
	}




























};
