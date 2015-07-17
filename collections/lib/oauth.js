var googOAuth2Url = 'https://accounts.google.com/o/oauth2';

googOAuth = {
    AccessType: {
        OFFLINE: 1,
        ONCE: 2
    },

    setToken: function(data) {
        localStorage.access_token = data.access_token;
        localStorage.refresh_token = data.refresh_token || localStorage.refresh_token;
        var expiresAt = moment().valueOf() + parseInt(data.expires_in, 10) * 1000 - 60000;
        localStorage.expires_at = expiresAt;
    },

    authorize: function(options) {
        var deferred = $.Deferred();

        var authOpts = {
            client_id: options.client_id,
            redirect_uri: options.redirect_uri,
            scope: options.scope
        };
        if (options.type == googOAuth.AccessType.OFFLINE) {
            authOpts.response_type = 'code';
            authOpts.access_type = 'offline';
        } else {
            authOpts.response_type = 'token';
        }
        // Builds the OAuth consent page URL.
        var authUrl = s.sprintf('%s/%s?%s', googOAuth2Url, 'auth', $.param(authOpts));
        // Opens the OAuth consent page in the InAppBrowser.
        var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no');

        $(authWindow).on('loadstart', function(event) {
            var url = event.originalEvent.url;

            if (url.indexOf(options.redirect_uri) === 0) {
                authWindow.close();

                if (options.type == googOAuth.AccessType.OFFLINE) {
                    var code = /\?code=(.+)$/.exec(url);
                    var tokenUrl = s.sprintf('%s/%s', googOAuth2Url, 'token');
                    $.post(tokenUrl, {
                        code: code[1],
                        redirect_uri: options.redirect_uri,
                        client_id: options.client_id,
                        client_secret: options.client_secret,
                        grant_type: 'authorization_code'
                    }).done(function(data) {
                        googOAuth.setToken(data);
                        deferred.resolve(data);
                    }).fail(function(response) {
                        deferred.reject(response.responseJSON);
                    });
                } else {
                    var response = (url).split('#')[1];
                    var params = (response).split('&');
                    var paramsMap = {};
                    for (var i = 0; i < params.length; i++) {
                        paramsMap[params[i].split('=')[0]] = params[i].split('=')[1];
                    }
                    googOAuth.setToken(paramsMap);
                    deferred.resolve(paramsMap);
                }
            }
        });

        return deferred.promise();
    },

    getToken: function(options) {
        var deferred = $.Deferred();

        if (moment().valueOf() < localStorage.expires_at) {
            deferred.resolve(localStorage.access_token);
            return deferred.promise();
        }

        if (localStorage.refresh_token) {
            var tokenUrl = s.sprintf('%s/%s', googOAuth2Url, 'token');
            $.post(tokenUrl, {
                refresh_token: localStorage.refresh_token,
                client_id: options.client_id,
                client_secret: options.client_secret,
                grant_type: 'refresh_token'
            }).done(function(data) {
                googOAuth.setToken(data);
                deferred.resolve(data.access_token);
            }).fail(function(response) {
                deferred.reject(response.responseJSON);
            });
        } else {
            deferred.reject();
        }

        return deferred.promise();
    }
};
