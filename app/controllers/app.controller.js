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
			targetBubble.style.height = param.size +'px';
			targetBubble.style.width = param.size +'px';
			targetBubble.style.lineHeight = (param.size) +'px';
			targetBubble.style.fontSize = (param.fontSize) +'px';
			targetBubble.innerHTML = param.scorePoints;
			targetBubble.style.animationDelay = 1 +'s';
			targetBubble.style.left = param.posX +'%';
		})
	}

	$scope.changeSpeed = function(speed) {
		let ratePerInch = 1000 / speed;
		$q.when(getAnimationState()).then(function(animations) {
			for (let i = 0; i < animations.length; i++) {
				let offset3D = Math.random() * (1 - .2) + .2;
				animations[i].style.animationDuration = ratePerInch + offset3D +'s';
				animations[i].style.opacity = 1;
			};
		})
	}

	$scope.hideBubbles = function() {
		$q.when(getAnimationState()).then(function(animations) {
			for (let i = 0; i < animations.length; i++) {
				animations[i].style.opacity = 0;
			};
		})
	}

	function toggleAnimation(gameState) {
		switch (gameState) {
			case 'Pause':
				$q.when(getAnimationState()).then(function(animations) {
					for (let i = 0; i < animations.length; i++) {
						animations[i].style.pointerEvents = 'auto';
						animations[i].style.webkitAnimationPlayState = 'running';
					};
				})
				break;
			case 'Resume':
				$q.when(getAnimationState()).then(function(animations) {
					for (let i = 0; i < animations.length; i++) {
						animations[i].style.pointerEvents = 'none';
						animations[i].style.webkitAnimationPlayState = 'paused';
					};
				})
				break;
			default:
				// START
				$q.when(getAnimationState()).then(function(animations) {
					for (let i = 0; i < animations.length; i++) {
						animations[i].style.animationDuration = (1000 / $scope.speed) + newParams().offset3D +'s';
						animations[i].style.webkitAnimationPlayState = 'running';			
						animations[i].style.animationDelay = i +'s';
					};
				}
			)
		}
	}

	// viewportAdj adjusts for window size, but is only static
	// offset3D augments for a slight 3D effect to make visuals more interesting
	function newParams(targetBubble) {
		if (targetBubble) {
			let viewportAdj = (window.innerWidth / 70) + 67;
			let size = Math.floor(Math.random() * (100 - 10)) + 10;
			let posX = Math.floor(Math.random() * (viewportAdj - 1)) + 1;
			let score = 11 - Math.floor(size / 10);
			let fontPx = size * .85;
			return {
				scorePoints: score,
				fontSize: fontPx,
				size: size,
				posX: posX
			}
		} else {
			return {
				offset3D: Math.random() * (1 - .2) + .2
			}
		}
	}






	function getAnimationState() {
		return document.querySelectorAll('.bubble');
	}




		




























};
