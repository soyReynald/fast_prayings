function addTask(){
    var inputBox = document.querySelector("#input-box");
    var listContainer = document.querySelector("#list-container");
    
    let added = false;
    if(inputBox.value === '') {
        alert("Debes escribir algo"); // You must write something
    } else{
        var liElement = document.createElement('li');
        var triggeringList = document.createTextNode(inputBox.value);
        liElement.appendChild(triggeringList)
        var span = document.createElement("span");
        span.classList.add("close")
        var closeIcon = document.createTextNode("\u00d7");
        span.appendChild(closeIcon);
        liElement.appendChild(span);
        listContainer.appendChild(liElement);
        added = true;

        var closeButtons = document.getElementsByClassName("close");
        for (i = 0; i < closeButtons.length; i++) {
            closeButtons[i].onclick = function() {
                var div = this.parentElement;
                div.style.display = "none";
            }
        }
        var liToCheck = document.getElementsByTagName("li");
        for (i = 0; i < liToCheck.length; i++) {
            liToCheck[i].onclick = function () {
                this.classList.add("checked");            
            }
        }
    }
    if (added === true) {
        inputBox.value = '';
    }
}