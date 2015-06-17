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
        this.maxStep = 2;
     }

    open(onClose) {
        this.$scope.nextBtn = _.bind(this.nextBtn, this, onClose);
        this.$scope.backBtn = _.bind(this.backBtn, this);
        this.$scope.onClose = _.bind(this.close, this);
        this.$scope.controller = this.$controller;
        this.$scope.step = 0;
        this.$scope.isLast = false;
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

    nextBtn(onClose) {
        console.log('nextBtn');
        if (this.$scope.step == this.maxStep) {
            this.onFinish_(onClose);
            return;
        }
        this.$scope.step++;
        this.$scope.hasBack = this.$scope.step > 0;
        this.$scope.isLast = this.$scope.step == this.maxStep;
    }

    backBtn() {
        this.$scope.step--;
        this.$scope.hasBack = this.$scope.step > 0;
        this.$scope.isLast = this.$scope.step == this.maxStep;
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
        callback(this.$scope.btnType.type, this.$scope.btnCfg);
        this.close();
    }
};

NewBtnDlg = NewBtnDlg_;

class EditBtnDlg_ extends NewBtnDlg {
    constructor($scope, $ionicModal, $controller) {
        super($scope, $ionicModal, $controller);
        this.maxStep = 1;
    }

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

