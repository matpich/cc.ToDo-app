import MainView from './MainView';
import Task from './Task';

class TaskDetails {
    constructor(obiekt) {
        this.parent = obiekt.parent;
        this._taskDetailsContainer = document.createElement('div');
        this._taskDetailsContainer.classList.add('container-main');
        this._taskDetailsWindow = document.createElement('div');
        this._taskDetailsWindow.classList.add('taskDetailWindow');
        this._taskDetailTitle = document.createElement('form'); //zmiana nazwy taska
        this._taskDetailTitle.classList.add('form-task-title');
        this._taskTitleHeader = document.createElement("h5");
        this._taskTitleHeader.classList.add("title-header");
        this._taskTitleHeader.innerText = "Tytuł taska"
        this._inputTitle = document.createElement('input')
        this._inputTitle.placeholder = obiekt.taskName;
        this._inputTitle.classList.add('input-task-title')
        this._inputButton = document.createElement('button')
        this._inputButton.classList.add('button-task-title')
        this._inputButton.innerText = "Zmień tytuł taska"
        this._taskDescription = document.createElement('form'); //dodanie opisu taska
        this._taskDescription.classList.add('form-task-description');
        this._taskDescriptionHeader = document.createElement("h5");
        this._taskDescriptionHeader.classList.add("description-header");
        this._taskDescriptionHeader.innerText = "Opis tasku"
        this._inputDescription = document.createElement('input')
        this._inputDescription.placeholder = "Dodaj opis taska";
        this._inputDescription.value = this.parent._taskDesc ? this.parent._taskDesc : "";
        this._inputDescription.classList.add('input-task-description')
        this._inputDescriptionButton = document.createElement('button')
        this._inputDescriptionButton.classList.add('button-task-description')
        this._inputDescriptionButton.innerText = 'Dodaj opis taska'
        this._closeButton = document.createElement('div'); //button zamykający
        this._closeButton.classList.add('taskDetail-close-window');
        this._closeButton.innerHTML = `<i class="fas fa-times"></i>`;
        this._taskDates = document.createElement('div'); //div z taskDates
        this._taskDates.classList.add("taskDates");
        this._taskCreatedDate = document.createElement('form');// form z task created date
        this._taskCreatedDate.classList.add("task-created-date");
        this._createdDateHeader = document.createElement("h5");
        this._createdDateHeader.classList.add("created-date-header");
        this._createdDateHeader.innerText = "Data powstania"
        this._inputCreatedDate = document.createElement("input");
        this._inputCreatedDate.type = "date";
        this._inputCreatedDate.value = this.parent._createdDate;   //new Date().toISOString().substring(0, 10);
        this._createdDateButton = document.createElement("button")
        this._createdDateButton.classList.add("button-creat1ed-date")
        this._createdDateButton.innerText = "Prześlij"

        this._taskDeadline = document.createElement('form');// form z task deadline
        this._taskDeadline.classList.add("task-deadline-date");
        this._deadlineHeader = document.createElement("h5");
        this._deadlineHeader.classList.add("deadline-date-header");
        this._deadlineHeader.innerText = "Deadline"
        this._inputDeadline = document.createElement("input");
        this._inputDeadline.value = this.parent._deadline;
        this._inputDeadline.type = "date";
        this._deadlineButton = document.createElement("button")
        this._deadlineButton.classList.add("button-deadline-date")
        this._deadlineButton.innerText = "Prześlij"

        this._taskExp = document.createElement('form');// form z task EXP
        this._taskExp.classList.add("task-deadline-date");
        this._taskExpHeader = document.createElement("h5");
        this._taskExpHeader.classList.add("deadline-date-header");
        this._taskExpHeader.innerText = "Poziom trudności"
        
        this._taskExpCheckBox1Area = document.createElement('div');
        this._taskExpCheckBox1 = document.createElement("input");
        this._taskExpCheckBox1.type ="radio";
        this._taskExpCheckBox1.name ="exp";
        this._taskExpCheckBox1.checked ="true";
        this._taskExpCheckBox1Text = document.createElement('p');
        this._taskExpCheckBox1Text.innerText = "Łatwy";

        this._taskExpCheckBox2Area = document.createElement('div');
        this._taskExpCheckBox2 = document.createElement("input");
        this._taskExpCheckBox2.type = "radio";
        this._taskExpCheckBox2.name = "exp";
        this._taskExpCheckBox2Text = document.createElement('p');
        this._taskExpCheckBox2Text.innerText = "Średni";
        
        this._taskExpCheckBox3Area = document.createElement('div');
        this._taskExpCheckBox3 = document.createElement("input");
        this._taskExpCheckBox3.type = "radio";
        this._taskExpCheckBox3.name = "exp";
        this._taskExpCheckBox3Text = document.createElement('p');
        this._taskExpCheckBox3Text.innerText = "Trudny";

        this._checkboxButton = document.createElement("button")
        this._checkboxButton.classList.add("button-checkbox")
        this._checkboxButton.innerText = "Zapisz"
        
        this._taskDetailsContainer.appendChild(this._taskDetailsWindow);
        this._taskDetailsWindow.appendChild(this._closeButton);
        this._taskDetailsWindow.appendChild(this._taskDetailTitle);
        this._taskDetailTitle.appendChild(this._taskTitleHeader);
        this._taskDetailTitle.appendChild(this._inputTitle);
        this._taskDetailTitle.appendChild(this._inputButton);
        this._taskDetailsWindow.appendChild(this._taskDescription);
        this._taskDescription.appendChild(this._taskDescriptionHeader);
        this._taskDescription.appendChild(this._inputDescription);
        this._taskDescription.appendChild(this._inputDescriptionButton);
        this._taskDetailsWindow.appendChild(this._taskDates);
        this._taskDates.appendChild(this._taskCreatedDate);
        this._taskCreatedDate.appendChild(this._createdDateHeader);
        this._taskCreatedDate.appendChild(this._inputCreatedDate);
        this._taskCreatedDate.appendChild(this._createdDateButton);
        this._taskDates.appendChild(this._taskDeadline);
        this._taskDeadline.appendChild(this._deadlineHeader);
        this._taskDeadline.appendChild(this._inputDeadline);
        this._taskDeadline.appendChild(this._deadlineButton);
        this._taskDetailsWindow.appendChild(this._taskExp);
        this._taskExp.appendChild(this._taskExpHeader);
        this._taskExp.appendChild(this._taskExpCheckBox1Area);
        this._taskExp.appendChild(this._taskExpCheckBox2Area);
        this._taskExp.appendChild(this._taskExpCheckBox3Area);
        this._taskExp.appendChild(this._checkboxButton);
        this._taskExpCheckBox1Area.appendChild(this._taskExpCheckBox1);
        this._taskExpCheckBox1Area.appendChild(this._taskExpCheckBox1Text);
        this._taskExpCheckBox2Area.appendChild(this._taskExpCheckBox2);
        this._taskExpCheckBox2Area.appendChild(this._taskExpCheckBox2Text);
        this._taskExpCheckBox3Area.appendChild(this._taskExpCheckBox3);
        this._taskExpCheckBox3Area.appendChild(this._taskExpCheckBox3Text);

        this._inputButton.onclick = this.changeTaskName.bind(this)
        this._inputDescriptionButton.onclick = this.changeTaskDescription.bind(this)
        this._closeButton.onclick = this.closeWindow.bind(this)
        this._createdDateButton.onclick = this.changeCreatedDate.bind(this)
        this._deadlineButton.onclick = this.changeDeadline.bind(this)
        this._checkboxButton.onclick = this.changeExp.bind(this)
        this.checkExp()
    }
    render() {
        //console.log(this._taskDetailsContainer)
        return this._taskDetailsContainer;

    }

    changeTaskName(e) {
        e.preventDefault();
        const taskname = this._taskDetailTitle.children[1].value;
        this.parent._taskHeaderTitle.innerText = taskname;
        this.parent._taskName = taskname;      
    }

    changeTaskDescription(e) {
        e.preventDefault();
        const taskdescription = this._taskDescription.children[1].value;
        this.parent._taskDesc = taskdescription;
    }

    changeCreatedDate(e) {
        e.preventDefault();
        const createddate = this._taskCreatedDate.children[1].value;
        this.parent._createdDate = createddate;
    }

    changeDeadline(e) {
        e.preventDefault();
        const deadline = this._taskDeadline.children[1].value;
        this.parent._deadline = deadline;
    }

    changeExp(e){
        e.preventDefault();
        const checkbox1 = this._taskExpCheckBox1Area.firstElementChild.checked;
        const checkbox2 = this._taskExpCheckBox2Area.firstElementChild.checked;
        const checkbox3 = this._taskExpCheckBox3Area.firstElementChild.checked;
        if(checkbox1){
            this.parent._taskExp = 1;
        }
        else if(checkbox2){
            this.parent._taskExp = 2;
        }
        else{
            this.parent._taskExp = 3;
        }
    }

    checkExp(){
        const exp = this.parent._taskExp; 
        if (exp === 1) {this._taskExpCheckBox1Area.firstElementChild.checked = true};
        if (exp === 2) {this._taskExpCheckBox2Area.firstElementChild.checked = true};
        if (exp === 3) {this._taskExpCheckBox3Area.firstElementChild.checked = true};
    }

    closeWindow(){
        this._taskDetailsContainer.remove();
    }

}

export default TaskDetails;