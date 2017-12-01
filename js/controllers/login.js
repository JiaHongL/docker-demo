myApp.controller('loginCtrl', function($scope) {
  // api.Url ＆ setting 來至 api.js 的全域變數 
  $scope.api_url = api.Url;
  $scope.setting = setting;
})
