chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == "add_checkboxes") {
        // Get all elements with the class "username"
        let usernameElements = document.getElementsByClassName("mn-connection-card__name");
        let connectionCard = document.getElementsByClassName("mn-connection-card");

        // Loop through each element and add a checkbox before it
        for (let i = 0; i < usernameElements.length; i++) {
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("username-checkbox");

            checkbox.style.pointerEvents="all";
            checkbox.style.opacity="inherit";
            checkbox.style.cursor="pointer";
            checkbox.style.position="inherit";

            connectionCard[i].insertBefore(checkbox, connectionCard[i].children[0]);
 
        }

        // Create a submit button and add it to the page
        let submitButton = document.createElement("input");
        submitButton.type = "submit";
        submitButton.value = "Submit";
        submitButton.style.position = "fixed";
        submitButton.style.top = "100px";
        submitButton.style.right = "0";
        submitButton.style.zIndex = "99999990";

        
        submitButton.addEventListener("click", function() {
            let selectedUsernames = [];

            // Get all selected checkboxes
            let checkboxes = document.getElementsByClassName("username-checkbox");
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    let username = checkboxes[i].parentElement.getElementsByClassName("mn-connection-card__name")[0].textContent;
                    let cleanUsername=username.trim().replace(/\n/g, "");
                    selectedUsernames.push(cleanUsername);
                }
            }
            console.log(selectedUsernames);
        });
        document.body.appendChild(submitButton);
    }
});
