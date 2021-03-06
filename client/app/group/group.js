'use strict';

angular.module('gobeApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('group', {
        url: '/group',
        templateUrl: 'app/group/group.html',
        controller: 'GroupCtrl',
        resolve:{
         groupModel: function(Group){
           return Group.query().$promise;
         },
         currentUser: function(Auth){
            return Auth.getCurrentUser().$promise;
         },
        }
      })
      .state('group.list', {
        url: '/list',
        templateUrl: 'app/group/group-list.html',
        controller: 'GroupCtrl',
        resolve:{
         groupModel: function(Group){
           return Group.query().$promise;
         }
        }
      })
      .state('group.new', {
        url: '/new',
        templateUrl: 'app/group/group-new.html',
        controller: 'GroupCtrl',
        activeSubscription: true,
        resolve:{
         groupModel: function(Group){
           return Group.query().$promise;
         }
        }
      })
      .state('group.show', {
        url: '/:id/show/:name',
        templateUrl: 'app/group/group-show.html',
        controller: 'GroupShowCtrl',
        activeSubscription: true,
        params: name,
        resolve:{
        groupShow: function(Group, $stateParams){
           return Group.get({id: $stateParams.id}).$promise;
         },
         eventModel: function(Event){
           return Event.query().$promise;
         }
        }
      })
      .state('group.profile', {
         url: '/profile',
         templateUrl: 'app/group/group-show.html',
         controller: 'GroupProfileCtrl',
         resolve:{
         groupProfile: function(Group, currentUser){
             return Group.get({id: currentUser.groupId}).$promise;
          }
         }
       })
       .state('group.edit', {
        url: '/:id/edit/:name',
        templateUrl: 'app/group/group-edit.html',
        controller: 'GroupEditCtrl',
        activeSubscription: true,
        params: name,
        resolve:{
         groupEdit: function(Group, $stateParams){
           return Group.get({id: $stateParams.id}).$promise;
         },
         groupPreviousEmail: function(Group, $stateParams){
           return Group.get({id: $stateParams.id}).$promise;
         },
         currentProfile: function(currentUser){
          return currentUser;
         }
        }
      })
      .state('group.confirmation', {
        url: '/confirmation/:confirm',
        templateUrl: 'app/group/group-show.html',
        controller: 'GroupConfirmCtrl',
        params: confirm,
        resolve:{
        groupShow: function(Group, $stateParams){
           return Group.get({id: $stateParams.confirm}).$promise;
         }
        }
      });

      $urlRouterProvider.otherwise('/');
  });
