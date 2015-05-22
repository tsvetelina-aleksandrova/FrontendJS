var routerApp = angular.module('formApp', ['ngAnimate', 'ui.router']);

routerApp.config(formConfig);
routerApp.controller('formCtrl', formCtrl);