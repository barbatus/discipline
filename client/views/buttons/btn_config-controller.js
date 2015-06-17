app.views.controller('BtnGroupsCtrl', ['$scope', '$meteor',
    function($scope, $meteor) {

        $scope.findGroups = function(query) {
            var items = depot.buttons.findGroups(query).map(function(groupItem) {
                return {
                    id: groupItem._id,
                    name: s.capitalize(groupItem.name)
                };
            });
            if (!items.length) {
                items.push({
                    id: null,
                    name: s.capitalize(query)
                });
            }
            return items;
        };

        $scope.chooseGroup = function(callback) {
            $scope.btnCfg.groupName = callback.item.name.toLowerCase();
        };

    }]);
