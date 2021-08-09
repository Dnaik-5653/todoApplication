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

var viewModel = function () {
    var self = this;
    self.todoName = ko.observable();
    self.description = ko.observable();
    self.startDate = ko.observable();
    self.completionDate = ko.observable();
    self.priority = ko.observable("low");
    self.status = ko.observable(false);
    self.taskList = ko.observableArray();
    self.currentUser = ko.observable(JSON.parse(sessionStorage.getItem("currentUser")));

    var taskUri = 'http://localhost:8080/RESTAPITODOAPPLICATION/rest/users/' + self.currentUser().user_id + '/tasks';

    //Get User List
    function getActiveUserTask() {
        ajaxFunction(taskUri, 'GET').done(function (data) {
            self.taskList(data);
        });
        
    }

    function dateInString(date) {
        dateString = [
            date.getFullYear(),('0' + (date.getMonth() + 1)).slice(-2),('0' + date.getDate()).slice(-2)
        ].join('-');
        return dateString;
    }


    //AddTodo
    self.addNewTodo = function () {
        var todoTaskObject = {
            todoName: self.todoName(),
            description: self.description(),
            startDate: dateInString(new Date()),
            completionDate: self.completionDate(),
            priority: self.priority(),
            status: self.status()
        };
        var TaskUri = 'http://localhost:8080/RESTAPITODOAPPLICATION/rest/users/' + self.currentUser().user_id + '/tasks';
        ajaxFunction(TaskUri, 'POST', todoTaskObject).done(function (data) {
            alert('Task Added Successfully....!!!!');
        });
        location.reload(true);
        getActiveUserTask();
    }

    
    //Change status of Task
    self.changeStatus = function (Task) {
        console.log(Task)
        var changeStatusUri = 'http://localhost:8080/RESTAPITODOAPPLICATION/rest/users/' + self.currentUser().user_id + '/tasks/' + Task.task_id;
        ajaxFunction(changeStatusUri, 'PUT', Task).done(function (data) {
        });
        location.reload(true);
        getActiveUserTask();
    }

    //Update Task
    self.detailedTask = function (Task) {
        self.todoName(Task.todoName);
        self.description(Task.description);
        self.startDate(Task.startDate);
        self.completionDate(Task.completionDate);
        self.priority(Task.priority);

        $('#Save').hide();
        $('#Update').show();


        self.updateTask = function () {
            var todoTaskObject = {
                todoName: self.todoName(),
                description: self.description(),
                startDate: self.startDate(),
                completionDate: self.completionDate(),
                priority: self.priority(),
                status: self.status()
            };
            var updateTaskUri = 'http://localhost:8080/RESTAPITODOAPPLICATION/rest/users/' + self.currentUser().user_id + '/tasks/' + Task.task_id;
            ajaxFunction(updateTaskUri, 'PUT', todoTaskObject).done(function (data) {
            });

            alert("Task updated succesfully")
            $('#Save').show();
            $('#Update').hide();
            location.reload(true);
           
        }
        getActiveUserTask();
    }

    //Delete Task
    self.deleteTask = function (Task) {
        var TaskDeleteUri = 'http://localhost:8080/RESTAPITODOAPPLICATION/rest/users/' + self.currentUser().user_id + '/tasks/' + Task.task_id;
        ajaxFunction(TaskDeleteUri, 'DELETE').done(function (data) {
        });
        location.reload(true);
        getActiveUserTask();
    }
    getActiveUserTask();
}
ko.applyBindings(new viewModel());