app = {
    controls: angular.module('app.controls', ['angular-meteor']),
    pages: angular.module('app.pages', ['angular-meteor']),
    views: angular.module('app.views', ['angular-meteor', 'mgo-angular-wizard'])
};
