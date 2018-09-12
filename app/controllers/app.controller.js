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


// REFACTOR $scope.stateOfGame LABELING TO REDUCE IF TO TWO CHOICES
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

	$scope.popBubble = function(element) {
		$scope.score += parseInt(element.target.innerHTML,10);
		let targetBubble = document.getElementById(element.target.id);
		let pos = Math.floor(Math.random() * (80 - 1)) + 1;
		let newSize = parseInt(window.getComputedStyle(targetBubble).width,10) *0.99;
		let newValue = parseInt(targetBubble.innerHTML,10) +10;
		let newDuration = parseFloat(window.getComputedStyle(targetBubble).animationDuration) - 0.2;

		targetBubble.classList.remove("bubble");
		void targetBubble.offsetWidth;

		targetBubble.classList.add("bubble");
		targetBubble.style.animationDuration = newDuration +'s';
		targetBubble.style.animationDelay = 2 +'s';
		targetBubble.style.width = newSize +'px';
		targetBubble.style.height = newSize +'px';
		targetBubble.style.left = pos +'%';
		targetBubble.innerHTML = newValue;
	}

	function getAnimationState() {
		animations = document.querySelectorAll('.bubble');
		return animations;
	}

	function moveBubbles() {
		$q.when(getAnimationState()).then(function(animations) {
			for (let i = 0; i < animations.length; i++) {
				var initialSpeed = Math.floor(Math.random() * (7000 - 4500)) + 4500;

				animations[i].style.animationDuration = initialSpeed +'ms';
				animations[i].style.animationDelay = i +'s';
				animations[i].style.webkitAnimationPlayState = 'running';			
			};
		})
	}

	function pauseLoop() {
		$q.when(getAnimationState()).then(function(animations) {
			for (let i = 0; i < animations.length; i++) {
				if(gameState === "pause") { 
					animations[i].style.webkitAnimationPlayState = 'paused';
				} else {
					animations[i].style.webkitAnimationPlayState = 'running';  
				}  
			};
		})
	}





		




























};
