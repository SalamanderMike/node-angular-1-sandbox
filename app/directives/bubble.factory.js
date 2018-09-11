export default function bubbleFactory() {
	'ngInject';
	return {
			restrict: 'EA',
			template: function(element, attrs){
				let htmlText;
				for (let i = 0; i < 3; i++) {
					let score = Math.floor(Math.random() * (99 - 1)) + 1;
					let pos = Math.floor(Math.random() * (80 - 1)) + 1;
					let size = Math.floor(Math.random() * (85 - 20)) + 20;
					htmlText = '<div class="bubble" ng-model="bubble" '
											+'style="left:'+pos+'%;'
											+'width:'+size+'px;'
											+'height:'+size+'px;'
											+'" '
											+'ng-click="collectScore('+score+')">'+score
											+'</div>' 
											+ htmlText;
				}
					console.log("Bubbles Built");
					return htmlText;						
			}
	};
};
