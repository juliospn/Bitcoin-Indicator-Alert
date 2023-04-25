
        // get close button and add click event listener
        var closeBtn = document.querySelector('.close');
        closeBtn.addEventListener('click', closeWindow);

        function closeWindow() {
            // close the window
            window.close();
        }

        function addAlert() {
            // get selected values
            var asset = document.querySelector('#asset').value;
            var metric = document.querySelector('#metric').value;
            var exchange = document.querySelector('#exchange').value;
            var condition = document.querySelector('#condition').value;
            var threshold = document.querySelector('#threshold').value;
            var type = document.querySelector('#type').value;
            var cool_down = document.querySelector('#cool_down').value;
            var channels = [];
            var telegram = document.querySelector('#telegram');
            var email = document.querySelector('#email');
            var browser = document.querySelector('#browser');
            if (telegram.checked) {
                channels.push(telegram.value);
            }
            if (email.checked) {
                channels.push(email.value);
            }
            if (browser.checked) {
                channels.push(browser.value);
            }
            var note = document.querySelector('#note').value;

            // do something with the selected values, e.g. send an AJAX request to the server to add the alert
            var alertAdded = true; // change this to false if the alert was not added successfully

            if (alertAdded) {
                alert('Alert created successfully');
            } else {
                alert('Alert could not be created');
            }

            // close the window
            window.close();
        }
