function ReportListController($scope, $http) {
    $http({method: 'GET', url: 'test.json'}).success(function(data) {
        $scope.reports = data; // response data 
    });

    $scope.select = function(report) {
        $scope.selectedReport = report;
    };
}