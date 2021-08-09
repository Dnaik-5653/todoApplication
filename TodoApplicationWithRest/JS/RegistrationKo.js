var view = function () {
    var self = this;
    self.firstName = ko.observable("");
    self.lastName = ko.observable("");
    self.email = ko.observable("");
    self.gender = ko.observable("");
    self.birthDate = ko.observable("")
    self.password = ko.observable("");
    self.registrationDate = ko.observable();
    self.activationDate = ko.observable();
    self.activationStatus = ko.observable();
    self.role = ko.observable();
    self.user = ko.observableArray();
}

var viewModel = function viewModel() {
    ko.validation.rules['text'] = {
        validator: function (val, params) {
            var regex = /([A-Za-z])$/;
            if (regex.test(val)) {
                return true;
            }
        },
        message: 'Only Alphabets Allowed'
    };


    ko.validation.rules['email'] = {
        validator: function (val, params) {
            var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (regex.test(val)) {
                return true;
            }
        },
        message: 'Enter valid Email id'
    }; 

    ko.validation.rules['exists'] = {
        validator: function (val, params) {
            let flag = 0;
            ajaxFunction(UserUri, 'GET').done(function (data) {
                self.user(data);
            });
            for (let i = 0; i < self.user().length; i++) {
                if (self.user()[i].email == self.email()) {
                    flag = 1;
                }
            }
            if (flag == 0) {
                return true;
            }
        },
        message: ' Email Already Exits'
    };


    ko.validation.rules['Date'] = {
        validator: function (val, params) {
            var birthYear = val.slice(0, 4);
            var regex = new Date().getFullYear() - birthYear;
            if (regex > 18) {
                return true;
            }
        },
        message: 'Age must be Greater than 18'
    };

    ko.validation.rules['password'] = {
        validator: function (val, params) {
            var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            if (regex.test(val)) {
                if (val.length == 10)
                    return true;
            }
        },
        message: 'Password must contain uppercase,lowercase,speacial sign & length should be greater than or eqal to 8 alphabets.'
    };

    ko.validation.registerExtenders();

    var self = this;
    self.firstName = ko.observable().extend({ required: true, text: true });
    self.lastName = ko.observable().extend({ required: true, text: true });
    self.email = ko.observable().extend({ required: true, email: true, exists: true });
    self.gender = ko.observable();
    self.birthDate = ko.observable().extend({ required: true, Date: true });
    self.password = ko.observable().extend({ required: true, password: true });
    self.registrationDate = ko.observable(new Date().toLocaleDateString());
    self.activationDate = ko.observable();
    self.activationStatus = ko.observable(false);
    self.role = ko.observable("User");
    self.user = ko.observableArray();
    
    //URL for fetching userlist
    var UserUri = 'http://localhost:8080/RESTAPITODOAPPLICATION/rest/users';

    //Ajax Function for fetching data from database
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

    // String conversion
    function dateInString(date) {
        dateString = [
            date.getFullYear(),('0' + (date.getMonth() + 1)).slice(-2),('0' + date.getDate()).slice(-2)
        ].join('-');
        return dateString;
    }
  
    // Add New User
    self.addNewUser = function addNewUser() {
        var userObject = {
            firstName: self.firstName(),
            lastName: self.lastName(),
            email: self.email(),
            gender: self.gender(),
            birthDate:  self.birthDate(), 
            password: self.password(),
            registrationDate: dateInString(new Date()),
            activationDate: dateInString(new Date()),
            activationStatus: self.activationStatus(),
            role: self.role()
        };
        ajaxFunction(UserUri, 'POST', userObject).done(function (data) {
        });
        alert('User Added Successfully....!!!!');
        location.reload(true);
    }

};
ko.applyBindings(new viewModel());