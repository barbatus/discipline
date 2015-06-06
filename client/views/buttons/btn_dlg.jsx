app.views.factory('BtnDialog', ['$rootScope', '$ionicModal', '$controller',
    function($rootScope, $ionicModal, $controller) {
        var dialog = {
            newBtn: function() {
                var $scope = $rootScope.$new();
                var newBtnCtrl = $controller('DlgBtnCtrl', {
                    $scope: $scope
                });
                return new NewBtnDlg($scope, $ionicModal, newBtnCtrl);
            },
            editBtn: function() {
                var $scope = $rootScope.$new();
                var editBtnCtrl = $controller('DlgBtnCtrl', {
                    $scope: $scope
                });
                return new EditBtnDlg($scope, $ionicModal, editBtnCtrl);
            }
        };

        return dialog;
    }]);

class NewBtnDlg_ {
    constructor($scope, $ionicModal, $controller) {
        this.$scope = $scope;
        this.$ionicModal = $ionicModal;
        this.$controller = function() {
            return $controller;
        };
        this.button = {};
     }

    open(onClose) {
        this.$scope.onFinish = _.bind(this.onFinish_, this, onClose);
        this.$scope.onClose = _.bind(this.close, this);
        this.$scope.controller = this.$controller;
        this.$scope.btnType = null;
        this.$scope.btnCfg = this.button;
        this.openWithScope(this.$scope);
    }

    close() {
        if (this._modal) {
            this._modal.remove();
            this._modal = null;
            this.$scope = null;
        }
    }

    openWithScope($scope) {
        var self = this;
        this.$ionicModal.fromTemplateUrl(this.tmplPath_, {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            self._modal = modal;
            self._modal.show();
        });
    }

    get tmplPath_() {
        return 'client/views/buttons/new_button.ng.html';
    }

    onFinish_(callback) {
        callback(this.$scope.btnType, this.$scope.btnCfg);
        this.close();
    }
};

NewBtnDlg = NewBtnDlg_;

class EditBtnDlg_ extends NewBtnDlg {
    open(button, onClose) {
        this.button = button;
        super.open(onClose);
    }

    get tmplPath_() {
        return 'client/views/buttons/edit_button.ng.html';
    }

    onFinish_(callback) {
        callback(this.button);
        this.close();
    }
};

EditBtnDlg = EditBtnDlg_;

