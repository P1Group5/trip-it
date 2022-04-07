var submitBtn = document.querySelector(".submit-button");
var formFields = document.querySelector(".form-field");

submitBtn.addEventListener("click", function () {
    var validationOk = true;
    for (var i = 0; i < formFields.length; i++) {
        if (formFields[i].value == "") {
            validationOk = false;
            window.alert("You must fill out each field before moving on");
        }
    }
});

var inputFormHandler = function(event) {
    event.preventDefault();

    var whereFromInput = document.querySelector("input[name='where-from']").value;
    var whereToInput = document.querySelector("input[name='where-to']").value;
    var departInput = document.querySelector("input[name='departure']").value;
    var returnInput = document.querySelector("input[name='returning']").value;


    // check if input values are empty strings
    if (!whereFromInput || !whereToInput || !departInput || !returnInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    // reset form feilds for next task to be entered
    document.querySelector("input[name='where-from']").value = "";
    document.querySelector("select[name='where-to']").value = "";
    document.querySelector("select[name='departing']").value = "";
    document.querySelector("select[name='returning']").value = "";

    var isEdit = formEl.hasAttribute("data-task-id");

    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        // package up data as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
    }
};