(function () {
    'use strict';    

    
    var     HomeController  = function ($scope, UserService, serviceNowService, $rootScope) {
         $scope.activityRecords = serviceNowService.activityRecords.result;
        

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }



        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }

        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        var keys = Object.keys($scope.activityRecords[0]);
        var length = $scope.activityRecords.length;
        
        var columnsData = [];
        var visualKeys = [];
        var records = [];
        for(var i = 0; i < keys.length; i++) {
            
                columnsData.push({title:keys[i].toUpperCase()});
                visualKeys.push(keys[i]);
            
        }
        for(var i = 0; i < length; i++) {
            var tmp = $scope.activityRecords[i];
            var record = Object.keys(tmp).map(function (key) {return tmp[key];});
            records.push(record);
        }
       
        $('#Activity').DataTable( {
            data:records,
            columns: columnsData,
            responsive:true,
            select: {
                style: 'multi'
            },                
           columnDefs: [ 
                    { targets: 4, visible: false },
                    { targets: 6, visible: false },
                    { targets: 7, visible: false },
                    { targets: 8, visible: false },
                    { targets: 9, visible: false },
                    { targets: 10, visible: false },
                    { targets: 11, visible: false }

            ]
            


        });    

        initController();

        

    };
    var homeContrl = angular.module('projectsApp')
                    .controller('HomeController', ['$scope','UserService',
                                'serviceNowService','$rootScope', 
                                    HomeController]);   

    
})();