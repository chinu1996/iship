var app = angular.module('watsonBluemix', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('agent', {
            url: "/agent",
            templateUrl: "app/components/agent/agent.html",
            controller: 'agentCntrl'
        })
});
app.run(function ($location, $rootScope) {
    $location.url('/agent')
})