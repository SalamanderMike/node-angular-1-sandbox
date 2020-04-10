import 'normalize.css'
import './styles/app.scss'
import angular from 'angular'
import ngRoute from 'angular-route'
import ngAnimate from 'angular-animate'
import router from './routing'
import AppController from './controllers/app.controller.js'
import AppFactory from './directives/app.factory.js'

export default angular.module('app', [ngRoute, ngAnimate])
	.directive('appFactory', () => new AppFactory())
	.controller('AppController', AppController)
	.config(router)
	.run(function ($location, $rootScope) {
		'ngInject'
		$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
			if (Object.prototype.hasOwnProperty.call(current, '$$route')) {
				$rootScope.title = current.$$route.title
			}
		})
	})
