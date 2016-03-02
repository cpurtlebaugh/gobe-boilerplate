'use strict';

angular.module('gobeApp')
  .controller('GroupEditCtrl', function ($scope, $state, $stateParams, Group, groupEdit) {
    $scope.newGroup = groupEdit;
    $scope.emailList = $scope.newGroup.emailList;
    console.log($scope.newGroup);

    $scope.updateEmail = function addEmail(){
      $scope.emailList.push($scope.email);
      console.log('emailList');
      console.log($scope.emailList);
      $scope.email = null;
    };

    $scope.deleteEmail = function deleteEmail(email){
      console.log('email')
      console.log(email)
     if(confirm('Are you sure you want to delete this email?')){
        var email = $scope.emailList.indexOf(email);
          $scope.emailList.splice(email, 1);
      };
    };

    $scope.updateGroup = function addGroup(form) {
      var data = $scope.newGroup;
      $scope.submitted = true;
         if(form.$valid){
             Group.update({id: $stateParams.id }, data,
               function(data){
                  $state.go('group.list')
                 }),
                 function(err){
                  $scope.addEventError = "Looks like something went wrong! Please try again"
                 }
               }
         else{
             document.body.scrollTop = document.documentElement.scrollTop = 0;
         }
    };

  });
