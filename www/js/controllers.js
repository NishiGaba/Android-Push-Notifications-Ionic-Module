angular.module('starter.controllers', ['ionic.cloud'])

.controller('DashCtrl', function($scope, $ionicPush) {})

.controller('ChatsCtrl', function($scope, Chats, $ionicPush) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $ionicPush) {
  $scope.chat = Chats.get($stateParams.chatId);
 
  //PUSH NOTIFICATIONS CODE
  $ionicPush.register().then(function(t) {
    return $ionicPush.saveToken(t);
  }).then(function(t) {
    console.log('Token saved:', t.token);
  });

  $scope.$on('cloud:push:notification', function(event, data) {
    console.log("here");
    console.log(data);
    var msg = data.message;
    alert(msg.title + ': ' + msg.text);
  });
})

.controller('AccountCtrl', function($scope, $ionicPush) {
  $scope.settings = {
    enableFriends: true
  };
});
