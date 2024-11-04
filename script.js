const questionValue = document.getElementById("textText");
const questionAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");


let question = JSON.parse(localStorage.getItem("questions-list"));
if (!question) {
  question = [];
}

function CreateQuestionsItems() {
    if (questionValue.value === "") {
      questionAlert.innerText = "Please enter your questions to Jesus!";
      questionValue.focus();
    } else {
      let IsPresent = false;
      question.forEach((element) => {
        if (element.item == questionValue.value) {
          IsPresent = true;
        }
      });
  
      if (IsPresent) {
        setAlertMessage("This item already present in the list!");
        return;
      }
  
    let li = document.createElement("li");
    const questionsItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${questionValue.value}</div><div>
                    <img class="edit todo-controls" onclick="UpdateQuestionsItems(this)" src="./img/pencil_icon.png" width="30"/>
                    <img class="delete todo-controls" onclick="DeleteQuestionsItems(this)" src="./img/archive_icon.png" width="30"/></div></div>`;
    li.innerHTML = questionsItems;
    listItems.appendChild(li);
  
      if (!question) {
        question = [];
      }
      let itemList = { item: questionValue.value, status: false };
      question.push(itemList);
      setLocalStorage();
    }
    questionValue.value = "";
    setAlertMessage("question item Created Successfully!");
  }


  function ReadQuestionItems() {
    question.forEach((element) => {
      let li = document.createElement("li");
      let style = "";
      if (element.status) {
        style = "style='text-decoration: line-through'";
      }
      const listItems = `<div ${style} title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${
        element.item
      }
      ${
        style === ""
          ? ""
          : '<img class="question-controls" src="/images/check-mark.png" />'
      }</div><div>
      ${
        style === ""
          ? '<img class="edit question-controls" onclick="UpdateToDoItems(this)" src="/img/pencil_icon.png" />'
          : ""
      }
      <img class="delete question-controls" onclick="DeleteToDoItems(this)" src="/img/archive_icon.png" /></div></div>`;
      li.innerHTML = listItems;
      listItems.appendChild(li);
    });
  }

  function UpdateQuestionsItems(e) {
    if (
      e.parentElement.parentElement.querySelector("div").style.textDecoration ===
      ""
    ) {
      questionValue.value =
        e.parentElement.parentElement.querySelector("div").innerText;
      updateText = e.parentElement.parentElement.querySelector("div");
      addUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
      addUpdate.setAttribute("src", "./img/edit_icon.png");
      questionValue.focus();
    }
  }
  
  function UpdateOnSelectionItems() {
    let IsPresent = false;
    question.forEach((element) => {
      if (element.item == questionValue.value) {
        IsPresent = true;
      }
    });
  
    if (IsPresent) {
      setAlertMessage("This item already present in the list!");
      return;
    }
  
    question.forEach((element) => {
      if (element.item == updateText.innerText.trim()) {
        element.item = questionValue.value;
      }
    });
    setLocalStorage();
  
    updateText.innerText = questionValue.value;
    addUpdate.setAttribute("onclick", "CreateQuestionsItems()");
    addUpdate.setAttribute("src", "./img/praying_icon.jpeg");
    questionValue.value = "";
    setAlertMessage("Todo item Updated Successfully!");
    
  }
  function DeleteQuestionsItems(e) {
    let deleteValue =
      e.parentElement.parentElement.querySelector("div").innerText;
  
    if (confirm(`Are you sure. Due you want to delete this ${deleteValue}!`)) {
      e.parentElement.parentElement.setAttribute("class", "deleted-item");
      questionValue.focus();
  
      question.forEach((element) => {
        if (element.item == deleteValue.trim()) {
          question.splice(element, 1);
        }
      });
  
      setTimeout(() => {
        e.parentElement.parentElement.remove();
      }, 1000);
  
      setLocalStorage();
    }
  }
  function CompletedQuestionsItems(e) {
    if (e.parentElement.querySelector("div").style.textDecoration === "") {
      const img = document.createElement("img");
      img.src = "/images/check-mark.png";
      img.className = "question-controls";
      e.parentElement.querySelector("div").style.textDecoration = "line-through";
      e.parentElement.querySelector("div").appendChild(img);
      e.parentElement.querySelector("img.edit").remove();
  
      question.forEach((element) => {
        if (
          e.parentElement.querySelector("div").innerText.trim() == element.item
        ) {
          element.status = true;
        }
      });
      setLocalStorage();
      setAlertMessage("Todo item Completed Successfully!");
    }
  }

  function setAlertMessage(message) {
    questionAlert.removeAttribute("class");
    questionAlert.innerText = message;
    setTimeout(() => {
      questionAlert.classList.add("toggleMe");
    }, 1000);
  }

  function setLocalStorage() {
    localStorage.setItem("question-list", JSON.stringify(question));
  }
  ReadQuestionItems();