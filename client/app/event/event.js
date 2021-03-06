  'use strict';

angular.module('gobeApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('event', {
        url: '/event',
        templateUrl: 'app/event/event.html',
        controller: 'EventCtrl',
        resolve:{
         eventModel: function(Event){
           return Event.query().$promise;
         },
         currentUser: function(Auth){
            return Auth.getCurrentUser().$promise;
         },
        }
      })
      .state('event.list', {
        url: '/list',
        templateUrl: 'app/event/event-list.html',
        controller: 'EventCtrl',
        resolve:{
         eventModel: function(Event){
           return Event.query().$promise;
         }
        }
      })
      .state('event.new', {
        url: '/new',
        templateUrl: 'app/event/event-new.html',
        controller: 'EventCtrl',
        activeSubscription: true,
        resolve:{
         eventModel: function(Event){
           return Event.query().$promise;
         }
        }
      })

       .state('event.show', {
        url: '/:id/show/:name',
        templateUrl: 'app/event/event-show.html',
        controller: 'EventShowCtrl',
        activeSubscription: true,
        params: name,
        resolve:{
          eventShow: function(Event, $stateParams){
            return Event.get({id: $stateParams.id}).$promise;
          },
          eventGroup: function(Group, eventShow){
            if(eventShow.confirmGroup){
              return Group.get({id: eventShow.confirmGroup }).$promise;
            }
            else{
              return null;
            }
          }
        }
      })

       .state('event.edit', {
        url: '/:id/edit',
        templateUrl: 'app/event/event-edit.html',
        controller: 'EventEditCtrl',
        activeSubscription: true,
        resolve:{
         eventEdit: function(Event, $stateParams){
           return Event.get({id: $stateParams.id}).$promise;
         }
        }
      });


      $urlRouterProvider.otherwise('/');
  });
