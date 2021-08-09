var ViewModel = function () {
    var self = this;
    self.userListObservable = ko.observableArray();

    var UserUri = 'http://localhost:8080/RESTAPITODOAPPLICATION/rest/users';

    //Ajax for fetching data
    function ajaxFunction(uri, method, data) {
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            crossDomain: true,
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert('Error : ' + errorThrown);
        });
    }

    //Get User List
    function getUserList() {
        ajaxFunction(UserUri, 'GET').done(function (data) {
            self.userListObservable(data);
        });
    }

    
    // String conversion
    function dateInString(date) {
        dateString = [
            date.getFullYear(),('0' + (date.getMonth() + 1)).slice(-2),('0' + date.getDate()).slice(-2)
        ].join('-');
        return dateString;
    }

    //ChangeStatus
    self.changeStatus = function (User) {
        if(User.activationStatus){
            User.activationStatus = false;
        }
        else{
            User.activationStatus = true;
            User.activationDate = dateInString(new Date());
        }
        var UserUpdateUri = 'http://localhost:8080/RESTAPITODOAPPLICATION/rest/users/'+User.user_id;
        ajaxFunction(UserUpdateUri, 'PUT',User).done(function (data) {
        });
        
        getUserList();
        location.reload(true);
    }

    //Delete User
    self.deleteUser = function (User) {
        var UserDeleteUri = 'http://localhost:8080/RESTAPITODOAPPLICATION/rest/users/'+User.user_id;
        ajaxFunction(UserDeleteUri, 'DELETE').done(function (data) {
        });
        location.reload(true);
        getUserList();
    }
    getUserList();
};
ko.applyBindings(new ViewModel());