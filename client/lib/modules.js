app = {
    controls: angular.module('app.controls', ['angular-meteor']),
    pages: angular.module('app.pages', ['angular-meteor', 'angular.filter']),
    views: angular.module('app.views', ['angular-meteor', 'ion-autocomplete'])
};
