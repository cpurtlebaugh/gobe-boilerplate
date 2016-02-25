'use strict';

angular.module('gobeApp')
  .controller('GroupCtrl', function ($scope, $state, Group, groupModel, $stateParams) {
    $scope.listGroups = groupModel;
    $scope.newGroup = {};
    $scope.newGroup.emailList = [];
    $scope.emailList = $scope.newGroup.emailList;

    $scope.addEmail = function addEmail(){
      $scope.newGroup.emailList.push($scope.email);
      console.log('emailList');
      console.log($scope.newGroup.emailList);
      $scope.email = null;
    };


    $scope.addGroup = function addGroup(form) {
      console.log(form)
      console.log("newGroup")
      console.log($scope.newGroup)
      $scope.newGroup = $scope.newGroup
      console.log("stateParams")
      console.log($stateParams)


      $scope.submitted = true;
         if(form.$valid){
             Group.save($scope.newGroup,
               function(data){
                  $state.go('group.confirmation',
                    {confirm: [$scope.newGroup.organizationName, $scope.newGroup.firstName,
                               $scope.newGroup.lastName, $scope.newGroup.phoneNumber,
                               $scope.newGroup.email, $scope.newGroup.zipCode,
                               $scope.newGroup.emailList]})
                 }),
                 function(err){
                  $scope.addGroupError = "Looks like something went wrong! Please try again"
                 }
               }
         else{
             document.body.scrollTop = document.documentElement.scrollTop = 0;
         }
    };
  })


  .controller('GroupConfirmCtrl', function ($scope, $state, $stateParams, groupModel) {
    console.log("GroupConfirmCtrl")
      console.log($stateParams.confirm)
     $scope.confirmValues = $stateParams.confirm;

     console.log($scope.confirmValues[6].split(","))
     $scope.confirmEmails = $scope.confirmValues[6].split(",");
  });