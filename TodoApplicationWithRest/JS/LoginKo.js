var viewModel = function () {
    var self = this;
    self.userName = ko.observable();
    self.password = ko.observable();
    self.actionForm = ko.observable();
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

    //User Login validation
    self.userLogin = function () {
        
        var flag = 0;
        for (let i = 0; i < self.userListObservable().length; i++) {
            console.log(self.userListObservable()[i].email === self.userName());
            if (self.userListObservable()[i].email === self.userName() && self.userListObservable()[i].password === self.password() && self.userListObservable()[i].role === "User" && self.userListObservable()[i].activationStatus === true) {
                console.log("User present")
                var userObject = self.userListObservable()[i];
                self.actionForm("TodoListpage.html");
                flag = 1;
                break;
            }
            else if(self.userListObservable()[i].email === self.userName() && self.userListObservable()[i].password === self.password() && self.userListObservable()[i].role === "Admin" && self.userListObservable()[i].activationStatus === true) {
                console.log("Admin present")
                var userObject = self.userListObservable()[i];
                self.actionForm('AdminPage.html');
                flag = 1;
                break;
            }
        }
        if (flag == 1) {
            sessionStorage.setItem("currentUser", JSON.stringify(userObject));
            alert("Login Successful");
            return true;
        }
        else {
            alert("Invalid Credential or Account Deactivated");
            return false;
        }
    }
    getUserList()
}
ko.applyBindings(new viewModel());