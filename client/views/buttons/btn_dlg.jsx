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

class EditBtnModel {
    constructor(button) {
        this.cfg_ = button || {};
        this.bits_ = this.cfg_.bits || {};
        var btnType = BtnFactory.getType(button);
        this.type_ = btnType != depot.consts.Buttons.UNKNOWN ? btnType : null;
    }

    get cfg() {
        return this.cfg_;
    }

    get type() {
        return this.type_;
    }

    set type(value) {
        this.type_ = value;
    }

    get bits() {
        return this.bits_;
    }
};

class NewBtnDlg_ {
    constructor($scope, $ionicModal, $controller) {
        this.$scope = $scope;
        this.$ionicModal = $ionicModal;
        this.$controller = function() {
            return $controller;
        };
    }

    open(onFinish) {
        this.openInternal(new EditBtnModel(), onFinish);
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
        callback(scope.btnModel.type, scope.btnModel.cfg, bitsArray);
        this.onClose_();
    }
};

NewBtnDlg = NewBtnDlg_;

class EditBtnDlg_ extends NewBtnDlg {
    constructor($scope, $ionicModal, $controller) {
        super($scope, $ionicModal, $controller);
    }

    open(button, onClose) {
        this.openInternal(new EditBtnModel(button), onClose);
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
