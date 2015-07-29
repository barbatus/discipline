var listUrl = 'https://www.googleapis.com/calendar/v3/users/me/calendarList';
var createCalUrl = 'https://www.googleapis.com/calendar/v3/calendars';
var createEventUrlFrmt = 'https://www.googleapis.com/calendar/v3/calendars/%s/events';
var updateEventUrlFrmt = 'https://www.googleapis.com/calendar/v3/calendars/%s/events/%s';
var calendarScope = 'https://www.googleapis.com/auth/calendar';

var calendar = {
    send: function(method, url, data, accessToken) {
        var options = {
            method: method,
            url: url,
            data: data,
            headers: {'Authorization': 'Bearer ' + accessToken}
        };
        if (method == 'POST' || method == 'PUT') {
            options.contentType = 'application/json';
            options.data = JSON.stringify(data);
        }
        var deferred = $.Deferred();
        $.ajax(options).done(function(data) {
            deferred.resolve(data);
        }).fail(function(response) {
            deferred.reject(response);
        });
        return deferred.promise();
    },

    list: function(accessToken) {
        var deferred = $.Deferred();
        calendar.send('GET', listUrl, {}, accessToken).done(
            function(data) {
                deferred.resolve(data);
            }).fail(function(response) {
                deferred.reject(response);
            });
        return deferred.promise();
    },

    createCalendar: function(summary, accessToken) {
        check(accessToken, String);

        var deferred = $.Deferred();
        calendar.send('POST', createCalUrl, {
            summary: summary
        }, accessToken).done(function(data) {
            deferred.resolve(data);
        }).fail(function(response) {
            deferred.reject(response);
        });
        return deferred.promise();
    },

    createEvent: function(calId, summary, mDate, description, accessToken) {
        check(calId, String);
        check(summary, String);
        check(accessToken, String);

        var event = {
            summary: summary,
            description: description,
            start: {
                date: mDate.format('YYYY-MM-DD')
            },
            end: {
                date: mDate.format('YYYY-MM-DD')
            }
        };

        var deferred = $.Deferred();
        var createEventUrl = s.sprintf(createEventUrlFrmt, calId);
        calendar.send('POST', createEventUrl, event,
            accessToken).done(function(data) {
            deferred.resolve(data);
        }).fail(function(response) {
            deferred.reject(response);
        });
        return deferred.promise();
    },

    updateEvent: function(eventId, calId, summary, mDate, description, accessToken) {
        check(eventId, String);
        check(calId, String);
        check(summary, String);
        check(accessToken, String);

        var event = {
            summary: summary,
            description: description,
            start: {
                date: mDate.format('YYYY-MM-DD')
            },
            end: {
                date: mDate.format('YYYY-MM-DD')
            }
        };

        var deferred = $.Deferred();
        var updateEventUrl = s.sprintf(updateEventUrlFrmt, calId, eventId);
        calendar.send('PUT', updateEventUrl, event,
            accessToken).done(function(data) {
            deferred.resolve(data);
        }).fail(function(response) {
            console.log(response);
            deferred.reject(response);
        });
        return deferred.promise();
    }
};

class Calendar_ {

    static createCalendar_(accessToken) {
        return calendar.createCalendar('discipline', accessToken);
    }

    static saveEvent_(eventId, calId, name, mDate, description, accessToken) {
        if (eventId) {
            return calendar.updateEvent(eventId, calId, name, mDate,
                description, accessToken);
        }
        return calendar.createEvent(calId, name, mDate,
            description, accessToken);
    }

    static getToken_() {
        var deferred = $.Deferred();
        googOAuth.getToken({
            client_id: settings.googOAuthClientId,
            client_secret: settings.googOAuthClientSecret,
        }).done(function(token) {
            deferred.resolve(token);
        }).fail(function() {
            googOAuth.authorize({
                client_id: settings.googOAuthClientId,
                client_secret: settings.googOAuthClientSecret,
                redirect_uri: 'http://localhost',
                scope: calendarScope
            }).done(function() {
                googOAuth.getToken().done(function(token) {
                    deferred.resolve(token);
                });
            }).fail(function(response) {
                deferred.fail(response);
            });
        });
        return deferred.promise();
    }

    static buildErrorMsg_(errorResponse) {
        if (!errorResponse.status) {
            return 'Please, check your Internet connection';
        }
        return errorResponse.responseText;
    }

    static saveEvent(eventId, name, dateMs, note, opt_onSuccess, opt_onError) {
        check(name, String);
        check(dateMs, Number);

        function onError(error) {
            if (opt_onError) {
                opt_onError(error);
            }
        }

        function onSuccess(data) {
            if (opt_onSuccess) {
                opt_onSuccess(data);
            }
        }

        var deferred = $.Deferred();
        var mDate = moment(dateMs);
        Calendar.getToken_().done(function(accessToken) {
            var calId = localStorage['calendar_id'];
            if (!calId) {
                Calendar.createCalendar_(accessToken).done(function(response) {
                    localStorage['calendar_id'] = response.id;
                    Calendar.saveEvent_(eventId, response.id, name,
                        mDate, note, accessToken).
                            done(function(response) {
                                onSuccess(response.id);
                            }).fail(function(response) {
                                onError(Calendar.buildErrorMsg_(response));
                            });
                }).fail(function(response) {
                    onError(Calendar.buildErrorMsg_(response));
                });
            } else {
                Calendar.saveEvent_(eventId, calId, name,
                    mDate, note, accessToken).
                        done(function(response) {
                            onSuccess(response.id);
                        }).fail(function(response) {
                            onError(Calendar.buildErrorMsg_(response));
                        });
            }
        }).fail(function(response) {
            onError(Calendar.buildErrorMsg_(response));
            deferred.reject(response);
        });
    }
};

Calendar = Calendar_;
