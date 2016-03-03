'use strict';

angular.module('gobeApp')
  .controller('GroupEditCtrl', function ($scope, $state, $stateParams, Group, groupEdit) {
    $scope.newGroup = groupEdit;
    $scope.emailList = $scope.newGroup.emailList;
    $scope.hover = true;


    $scope.updateEmail = function updateEmail(){
      $scope.emailList.push($scope.email);
      $scope.email = null;
    };

    $scope.deleteEmail = function deleteEmail(email){
     if(confirm('Are you sure you want to delete this email?')){
        var email = $scope.emailList.indexOf(email);
          $scope.emailList.splice(email, 1);
          $scope.newGroup.emailList = $scope.emailList;
      };
    };


    $scope.updateGroup = function addGroup(form) {
      var data = $scope.newGroup;
      $scope.submitted = true;
         if(form.$valid){
             Group.update({id: $stateParams.id }, data,
               function(data){
                  $state.go('group.list');
                 }),
                 function(err){
                  $scope.addEventError = "Looks like something went wrong! Please try again";
                 }
               }
         else{
             document.body.scrollTop = document.documentElement.scrollTop = 0;
         }
    };

  });
