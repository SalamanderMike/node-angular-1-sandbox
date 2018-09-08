export default function router($routeProvider, $locationProvider, $httpProvider) {
	'ngInject';
	$routeProvider
		.when('/', {
			title:          'Dot Game',
			templateUrl:    '/views/index.ejs',
			controller:     'AppController',
			controllerAs:   'app'
		})
		.otherwise({
			redirectTo: "/"
		});
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	$httpProvider.defaults.headers
		.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
};
