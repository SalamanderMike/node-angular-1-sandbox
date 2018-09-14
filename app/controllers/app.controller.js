export default function AppController ($scope, $animateCss, $timeout, $q) {
	'ngInject';
	const app = this;
	const rainbow = ['yellow','blue','cyan','pink','red','green','purple'];
	$scope.gameState = "Start";
	$scope.score = 0;
	$scope.speed = 100;

	// dynamicBubbleNum = Fewer bubbles on smaller screens to prevent clutter
	var dynamicBubbleNum = 15 - Math.floor((window.innerWidth) / 128);

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
	};

	$scope.changeSpeed = function() {
		$q.when(getAnimationState()).then(function(animations) {
			for (let i = 0; i < animations.length - dynamicBubbleNum; i++) {
				let inverse = 100 - ($scope.speed / 10);
				animations[i].style.animationDuration = (1000 / $scope.speed) + newParams().offset3D +'s';
				animations[i].style.webkitAnimationPlayState = 'running';
				animations[i].style.opacity = 1;
			};
		})
	};

	$scope.hideBubbles = function() {
		$q.when(getAnimationState()).then(function(animations) {
			for (let i = 0; i < animations.length; i++) {
				animations[i].style.webkitAnimationPlayState = 'paused';
				animations[i].style.opacity = .4;
			};
		})
	};

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
					for (let i = 0; i < animations.length - dynamicBubbleNum; i++) {
						let color = Math.floor(Math.random() * (6 - 0)) + 0;
						let angleY = Math.floor(Math.random() * (10 - 0)) + 0;
						let angleX = Math.floor(Math.random() * (10 - 0)) - 10;
						let flare = Math.floor(Math.random() * (30 - 10)) + 10;
						animations[i].style.boxShadow = ' inset '+angleX+'px '+angleY+'px 30px 0px '+rainbow[color];
						animations[i].style.animationDuration = (1000 / $scope.speed) + newParams().offset3D +'s';
						animations[i].style.webkitAnimationPlayState = 'running';
						animations[i].style.animationDelay = i +'s';
					};
				}
			)
		}
	};

	// viewportAdj adjusts for window size, but is only static
	// offset3D augments for a slight 3D effect to make visuals more interesting
	function newParams(targetBubble) {
		let averageOffset = 48 - ($scope.speed / 2);
		if (targetBubble) {
			let viewportAdj = (window.innerWidth / 70) + 67;
			let size = Math.floor(Math.random() * (100 - 10)) + 10;
			let posX = Math.floor(Math.random() * (viewportAdj - 1)) + 1;
			let offset3D = Math.random() * (averageOffset - 1) + 1
			let score = 11 - Math.floor(size / 10);
			let fontPx = size * .85;
			return {
				scorePoints: score,
				offset3D: offset3D,
				fontSize: fontPx,
				size: size,
				posX: posX
			}
		} else {
			return {
				offset3D: Math.random() * (averageOffset - 1) + 1
			}
		}
	};











		
























	function getAnimationState() {
		return document.querySelectorAll('.bubble');
	};

	// addEventListener on window resize to clear bubbles that may be flowing off viewport
	(function() {
		var resizeDelay;
		window.addEventListener('resize', throttleViewportResize, false);

		function throttleViewportResize() {
			if ( !resizeDelay ) {
				resizeDelay = $timeout(function() {
					resizeDelay = null;
					$timeout.cancel(clearRightMarginElements());
				}, 2000);
			}
		}

		function clearRightMarginElements() {
			$q.when(getAnimationState()).then(function(animations) {
				for (let i = 0; i < animations.length; i++) {
					let posX = parseInt(animations[i].style.left,10);
					if (posX > (window.innerWidth / 70) + 67) {
						animations[i].style.left = newParams(animations[i]).posX + '%';
						animations[i].style.top = 0 + 'px';
						animations[i].style.animationDuration = (1000 / $scope.speed) - 3 +'s';
					}
				};
			})
		}
	}());
};






















