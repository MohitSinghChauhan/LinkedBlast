chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type == 'add_checkboxes') {
    // Get all elements with the class "username"
    let usernameElements = document.getElementsByClassName(
      'mn-connection-card__name'
    );
    let connectionCard = document.getElementsByClassName('mn-connection-card');

    // Loop through each element and add a checkbox before it
    for (let i = 0; i < usernameElements.length; i++) {
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('username-checkbox');

      checkbox.style.pointerEvents = 'all';
      checkbox.style.opacity = 'inherit';
      checkbox.style.cursor = 'pointer';
      checkbox.style.position = 'inherit';

      connectionCard[i].insertBefore(checkbox, connectionCard[i].children[0]);
    }

    // MutationObserver API to handle Infinte Scroll and add checkboxes to newly rendered connection cards
    let observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          let node = mutation.addedNodes[i];

          if (node.classList && node.classList.contains('mn-connection-card')) {
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('username-checkbox');

            checkbox.style.pointerEvents = 'all';
            checkbox.style.opacity = 'inherit';
            checkbox.style.cursor = 'pointer';
            checkbox.style.position = 'inherit';

            node.insertBefore(checkbox, node.children[0]);
          }
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Create a submit button and add it to the page
    let submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Submit';
    submitButton.style.position = 'fixed';
    submitButton.style.top = '100px';
    submitButton.style.right = '0';
    submitButton.style.zIndex = '99999990';

    submitButton.addEventListener('click', function () {
      let selectedUsernames = [];

      // Get all selected checkboxes
      let checkboxes = document.getElementsByClassName('username-checkbox');
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          let username = checkboxes[i].parentElement.getElementsByClassName(
            'mn-connection-card__name'
          )[0].textContent;
          let cleanUsername = username.trim().replace(/\n/g, '');
          selectedUsernames.push(cleanUsername);
        }
      }
      console.log(selectedUsernames);

      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
        //   let messageButton = checkboxes[i].parentElement
        //     .getElementsByClassName('entry-point')[0]
        //     .querySelector('*:nth-child(2)');
          let messageButton = checkboxes[i].nextElementSibling
            .getElementsByClassName('artdeco-button')[0];
            
          messageButton.click();
        
          

        }
      }
    });
    document.body.appendChild(submitButton);
  }
});
