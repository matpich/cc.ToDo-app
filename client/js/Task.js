import MainView from './MainView';
import TaskDetails from './TaskDetails';
class Task {
    constructor(obiect = {}) {
        this._taskDeadlineDate = obiect.taskDeadlineDate;
        this._parent = obiect.taskParent;
        this._taskId = obiect.taskId;
        this._taskName = obiect.taskName;
        this._createdDate = obiect.createdDate;
        this._index = obiect.taskIndex;
        this._taskExp = obiect.taskExp || 1;
        this._taskDesc = obiect.taskName;
        this._completed = obiect.taskComplted !== undefined? obiect.taskCompleted : false;
        this._task = document.createElement('div');
        this._task.className = 'ui segment task';
        this._task.parent = this;
        this._taskHeader = document.createElement('div');
        this._taskHeader.classList.add('task-header');
        this._taskHeaderTitle = document.createElement('h4');
        this._taskHeaderTitle.classList.add('task-header-title');
        this._taskHeaderTitle.classList.add('active');
        this._taskHeaderTitle.innerText = this._taskName;
        this._taskCompletedContainer = document.createElement('div');
        this._taskCompletedContainer.className = 'ui mini teal button completed-container';
        this._taskIsCompletedCheckbox = document.createElement("input");
        this._taskCompletedLabel = document.createElement('label');
        this._taskCompletedLabel.innerText = '';
        this._taskIsCompletedCheckbox.type = "checkbox";
        this._taskIsCompletedCheckbox.checked = this._completed;
        this._TaskDeleteButton = document.createElement('div');
        this._TaskDeleteButton.className = ' ui mini teal button task-delete-button'
        this._TaskDeleteButton.innerHTML = '<i class="close icon"></i>';
        this._task.appendChild(this._taskHeader);
        this._taskHeader.appendChild(this._taskHeaderTitle);
        this._taskHeader.appendChild(this._TaskDeleteButton);
        this._taskHeader.appendChild(this._taskCompletedContainer);
        this._taskCompletedContainer.appendChild(this._taskCompletedLabel);
        this._taskCompletedContainer.appendChild(this._taskIsCompletedCheckbox);
        this._taskHeaderTitle.onclick = this.showTaskDetailsWindow.bind(this);
        this._TaskDeleteButton.onclick = this._parent._deleteTask.bind(this);
        this._taskIsCompletedCheckbox.addEventListener('change', this.checkCompleted.bind(this));
    }

    render() {
        return this._task
    }

    get id() {
        return this._taskId;
    }

    get index() {
        return this._index;
    }

    set index(value) {
        this._index = value;
    }

    showChangeNameInput() {
        const that = this;
        this._taskHeaderTitle.hidden = true;
        const formName = MainView.createInputName();
        formName.children[1].innerText = 'Zmień';
        this._taskHeader.appendChild(formName);
        formName.firstElementChild.value = this._taskName;
        formName.children[1].addEventListener('click', that.changeTaskName.bind(this));
    }

    async changeTaskName(e) {
        e.preventDefault();
        const form = this._taskHeader.lastElementChild;
        const token = sessionStorage.getItem('x-token');
        const requestHeaders = {
            'Content-Type': 'application/json',
            "x-token": token
        }
        const requestBody = {
            categoryId: this._parent.id,
            desc: form.firstElementChild.value,
            deadline: this._taskDeadlineDate,
            exp: this._taskExp,
            completed: this.taskCompleted
        }
        try {
            const response = await fetch(`tasks/${this.id}`, {
                method: "put",
                headers: requestHeaders,
                body: JSON.stringify(requestBody)
            })
            if (response.status !== 200) throw response;
        } catch (error) {
            alert("Nie udało się połączyć z serwerem!");
            return
        }
        this._taskName = form.firstElementChild.value;
        this._taskHeaderTitle.innerText = this._taskName;
        this._taskHeaderTitle.hidden = false;
        form.remove()
    }

    async _changeTask(changes = {}) {
        if (changes == {}) return;
        const requestBody = {
            categoryId: changes.categoryId || this._parent.id,
            desc: changes.desc || this._taskDesc,
            deadline: changes.deadline || this._taskDeadlineDate,
            exp: changes.exp || this._taskExp,
            completed: changes.completed !== undefined ? changes.completed : this._completed
        }
        console.log(requestBody);
        const token = sessionStorage.getItem('x-token');
        const requestHeaders = {
            'Content-Type': 'application/json',
            'x-token': token
        };
        try {
            const response = await fetch(`/tasks/${this._taskId}`, {
                method: "put",
                headers: requestHeaders,
                body: JSON.stringify(requestBody)
            });
            if (response.status !== 200) throw response;
            this._taskDesc = requestBody.desc;
            this._taskDeadlineDate = requestBody.deadline;
            this._taskExp = requestBody.exp;
            this._completed = requestBody.completed;
        } catch (error) {
            console.log(error);
            alert("Nie udało się połączyć z serwerem.")
            // location.reload();       // do odświeżenia strony gdy coś pójdzie nie tak
        }
    }

    checkCompleted(event)
    {
        const completed = event.currentTarget.checked;
        console.log(completed);
        this._changeTask({ completed });
    }

    async showTaskDetailsWindow() {
        const token = sessionStorage.getItem('x-token');
        const requestHeaders = {
            'Content-Type': 'application/json',
            "x-token": token
        };
        const requestBody = {
            taskId: this._taskId,
            desc: this._taskDesc
        };
        let taskDetailsFromServer = {};
        try {
            const response = await fetch("/subtasks", {
                method: "post",
                headers: requestHeaders,
                body: JSON.stringify(requestBody)
            })
            if (response.status !== 200) throw response;
            taskDetailsFromServer = await response.json();
        } catch (error) {
            alert("Nie udało się połączyć z serwerem!");
            return;
        }
        let taskDetails = new TaskDetails({
            id: taskDetailsFromServer.id,
            parent: this,
            taskName: this._taskName,
            taskDesc: this._taskDesc
        });
        this._task.appendChild(taskDetails.render());
        document.querySelector('#cancel').addEventListener('click', (e) =>{
            document.querySelector('.container-main').remove();
            taskDetails = null;
        });
    }
}

export default Task