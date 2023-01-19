var app = angular.module("app",[]);
var loadTable ;
app.controller("myCtrl",function($scope,$http){
    $scope.roleList  =  [];
    loadTable = function(){
        $http.get("http://localhost:8080/role/get").then(function(response){
            $scope.roleList = response.data;
        });
    }
    $scope.isShow = false;
    loadTable();
    $scope.role = {
        id: "",
        roleName : ""
    };
    $scope.create = function(){
        $scope.isShow = true;
        $http.post("http://localhost:8080/role/create",$scope.role).then(function(response){
           setTimeout(function(){
           },1000);
           loadTable();
           $scope.isShow = false;
           $scope.role.roleName = "";
        });
    };
    $(document).ready(function(){
        $(document).on("click","#delete",function(){
            var $id = $(this).closest("tr").find(".id").text();
            $http.delete("http://localhost:8080/role/delete/"+$id).then(function(response){
                loadTable();
            });
        });
        $(document).on("click","#open-modal",function(){
            var name = $(this).closest("tr").find(".name").text();
            var id = $(this).closest("tr").find(".id").text();
            $scope.role.roleName = name;
            $scope.role.id = id;
            $("#id").val(id);
            $("#name").val(name);
            $("#modal").modal("show");
        })
        $(document).on("click","#update",function(){
            console.log($scope.role);
            $http.put("http://localhost:8080/role/update/"+$scope.role.id,$scope.role).then(function(response){
                setTimeout(function(){
                    $scope.isShow = false;
                    $("#modal").modal("hide");
                }
                ,1000);
                loadTable();
            });
        });
    })
});