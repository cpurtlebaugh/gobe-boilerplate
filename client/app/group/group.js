'use strict';

angular.module('gobeApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('group', {
        url: '/group',
        templateUrl: 'app/group/group.html',
        controller: 'GroupCtrl',
        adminProtected: true,
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
        adminProtected: true,
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
        adminProtected: true,
        resolve:{
         groupModel: function(Group){
           return Group.query().$promise;
         }
        }
      })
      .state('group.show', {
        url: '/:id/show',
        templateUrl: 'app/group/group-show.html',
        controller: 'GroupShowCtrl',
        adminProtected: true,
        resolve:{
        groupShow: function(Group, $stateParams){
           return Group.get({id: $stateParams.id}).$promise;
         }
        }
      })
      .state('group.profile', {
        url: '/profile',
        templateUrl: 'app/group/group-show.html',
        controller: 'GroupProfileCtrl',
        adminProtected: true,
        resolve:{
        groupProfile: function(Group, currentUser){
            console.log(currentUser._id)
            console.log('current user groupid')
            console.log(currentUser.groupId)
            return Group.get({id: currentUser.groupId}).$promise;
         }
        }
      })
       .state('group.edit', {
        url: '/:id/edit',
        templateUrl: 'app/group/group-edit.html',
        controller: 'GroupEditCtrl',
        adminProtected: true,
        resolve:{
         groupEdit: function(Group, $stateParams){
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
        adminProtected: true,
        params: confirm,
        resolve:{
        groupShow: function(Group, $stateParams){
           return Group.get({id: $stateParams.confirm}).$promise;
         }
        }
      });

      $urlRouterProvider.otherwise('/');
  });
