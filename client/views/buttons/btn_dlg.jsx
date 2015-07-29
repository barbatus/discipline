app.views.factory('BtnDialog', ['$rootScope', '$ionicModal', '$controller',
    function($rootScope, $ionicModal, $controller) {
        var dialog = {
            newBtn: function() {
                var $scope = $rootScope.$new();
                var newBtnCtrl = $controller('DlgNewBtnCtrl', {
                    $scope: $scope
                });
                return new NewBtnDlg($scope, $ionicModal, newBtnCtrl);
            },
            editBtn: function() {
                var $scope = $rootScope.$new();
                var editBtnCtrl = $controller('DlgEditBtnCtrl', {
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
    }

    open(onFinish) {
        this.openInternal({bits: {}, type: null}, onFinish);
    }

    openInternal(model, onFinish) {
        this.$scope.onFinish = _.bind(this.onFinish_, this, onFinish);
        this.$scope.onClose = _.bind(this.onClose_, this);
        this.$scope.controller = this.$controller;
        this.$scope.btnModel = model;
        this.openWithScope(this.$scope);
    }

    onClose_() {
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
        var scope = this.$scope;
        var bitsArray = BasicBtn.getBitsArray(scope.btnModel.bits);
        callback(scope.btnModel.type, scope.btnModel, bitsArray);
        this.onClose_();
    }
};

NewBtnDlg = NewBtnDlg_;

class EditBtnDlg_ extends NewBtnDlg {
    constructor($scope, $ionicModal, $controller) {
        super($scope, $ionicModal, $controller);
    }

    open(button, onClose) {
        this.button = button;
        this.openInternal(button, onClose);
    }

    get tmplPath_() {
        return 'client/views/buttons/edit_button.ng.html';
    }

    onFinish_(callback) {
        callback(this.button);
        this.onClose_();
    }
};

EditBtnDlg = EditBtnDlg_;
