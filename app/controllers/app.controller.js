export default function AppController ($scope, $animateCss, $timeout, $q) {
	'ngInject';
	const app = this;
	$scope.gameState = "Start";
	$scope.score = 0;
	$scope.speed = 10;

	$scope.gameStateChange = function(gameState) {
		 if (gameState === 'Start') {
		 	$scope.gameState = "Pause";
		 	toggleAnimation();
		 } else {
		 	$scope.gameState = gameState;
		 	toggleAnimation(gameState);
		 }
	};

	$scope.popBubble = function(element) {
		var targetBubble = document.getElementById(element.target.id);
		$scope.score += parseInt(element.target.innerHTML,10);
		targetBubble.classList.remove("bubble");
		void targetBubble.offsetWidth;
		targetBubble.classList.add("bubble");

		$q.when(newParams(targetBubble)).then(function(param) {
			targetBubble.style.animationDuration = param.fallSpeed +'s';
			targetBubble.style.height = param.size +'px';
			targetBubble.style.width = param.size +'px';
			targetBubble.style.lineHeight = (param.size) +'px';
			targetBubble.innerHTML = param.scorePoints;
			targetBubble.style.animationDelay = 2 +'s';
			targetBubble.style.left = param.posX +'%';
		})
	}

	function toggleAnimation(gameState) {
		switch (gameState) {
			case 'Pause':
				$q.when(getAnimationState()).then(function(animations) {
					for (let i = 0; i < animations.length; i++) {
						animations[i].style.webkitAnimationPlayState = 'running';
					};
				})
				break;
			case 'Resume':
				$q.when(getAnimationState()).then(function(animations) {
					for (let i = 0; i < animations.length; i++) {
						animations[i].style.webkitAnimationPlayState = 'paused';
					};
				})
				break;
			default:
				// START
				$q.when(getAnimationState()).then(function(animations) {
					for (let i = 0; i < animations.length; i++) {
						animations[i].style.animationDuration = newParams().fallSpeed +'s';
						animations[i].style.webkitAnimationPlayState = 'running';			
						animations[i].style.animationDelay = i +'s';
					};
				}
			)
		}
	}

	function newParams(targetBubble) {
		if (targetBubble) {
			return {
				newFallSpeed: parseFloat(window.getComputedStyle(targetBubble).animationDuration) - 0.2,
				size: parseInt(window.getComputedStyle(targetBubble).width,10) *0.99,
				scorePoints: parseInt(targetBubble.innerHTML,10) +10,
				posX: Math.floor(Math.random() * (80 - 1)) + 1
			}
		} else {
			return {
				fallSpeed: Math.random() * (7 - 4.5) + 4.5
			}
		}
	}










	function getAnimationState() {
		return document.querySelectorAll('.bubble');
	}




		




























};
