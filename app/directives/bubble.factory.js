export default function bubbleFactory() {
	'ngInject';
	return {
		restrict: 'EA',
		template: function(element, attrs){
			var htmlText;
			var viewport = window.innerWidth;
			for (let i = 0; i < 90; i++) {
				let viewportAdj = (viewport / 70) + 67;
				let id = i.toString();
				let size = Math.floor(Math.random() * (100 - 10)) + 10;
				let fontPx = size * .85;
				let score = 11 - Math.floor(size / 10);
				let pos = Math.floor(Math.random() * (viewportAdj - 1)) + 1;
				htmlText = '<div class="bubble" ng-model="bubble" '
								+'id="'+id+'"'
								+'style="left:'+pos+'%;'
								+'width:'+size+'px;'
								+'height:'+size+'px;'
								+'line-height:'+size+'px;'
								+'font-size:'+fontPx+'px;'
								+'" '
								+'data-score="'+score+'" '
								+'data-ng-mousedown="popBubble($event.currentTarget)">'
								+'<img src="/public/images/bubble.png">'
								+'</div>' 
								+ htmlText;
			}
			return htmlText;
		}
	};
};
