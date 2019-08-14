// Every Request from Symfony API and every Callback Functions
class Request {
    // REQUESTS
    // Get all prices from the config file
    getConfig(url, callback) {
        window.req = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                try {
                    sessionStorage.clear();
                    var data = JSON.parse(xmlhttp.responseText);
                    sessionStorage.setItem('config', data);
                } catch (err) {
                    console.log(err.message + " in " + xmlhttp.responseText);
                    alert('Nous avons rencontré une erreur veuillez recommencer');
                    return;
                }
                callback(data);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    getVisit(url, callback) {
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.addEventListener("load", function () {
            if (req.status >= 200 && req.status < 400) {
                if (callback) {
                    callback(req.responseText);
                }
            } else {
                console.error(req.status + " " + req.statusText + " " + url);
            }
        });
        req.addEventListener("error", function () {
            console.error("Erreur réseau avec l'URL " + url);
            alert('Nous avons rencontré une erreur veuillez recommencer');
        });
        req.send();
    }

    sendVisit(url) {
        var visit = {
            numberCommand: sessionStorage.getItem('numberCommand'),
            mail: document.getElementById('mail').value,
            quantity: document.getElementById('quantity').value,
            date: document.getElementById('date').value,
            halfday: document.getElementById('halfday').checked
        };
        sessionStorage.setItem('quantity', document.getElementById('quantity').value);
        var request = new XMLHttpRequest();
        request.open("POST", url);
        request.send(JSON.stringify(visit));
    }

    sendClient(url, data) {
        var request = new XMLHttpRequest();
        request.open("POST", url);
        request.addEventListener("error", function () {
            console.error("Erreur réseau avec l'URL " + url);
            alert('Nous avons rencontré une erreur veuillez recommencer');
        });
        request.send(JSON.stringify(data));
    }

    // CALLBACK
    saveConfig(data) {
        var json = JSON.stringify(data);
        sessionStorage.setItem('config', json);
        visit.afterReveivedConfig();
    }

    showPrices(data) {
        var data = data['prices'];
    }

    getDays(data) {
        var data = data['disableDays'];
        var days = [];
        for (var i = 0; i <= data.length; i++) {
            var disableDays = days.push(data[0].days[i]);
        }
        return days;
    }

    getQuantity(response) {
        var allQuantity = JSON.parse(response);
        var total = 0;
        for (var i = 0; i < allQuantity.length; i++) {
            total = total + allQuantity[i].quantity;
        }
        var inputQuantity = document.getElementById('quantity').value;
        if (inputQuantity === undefined) { inputQuantity = 0; }
        var totalQuantity = total + inputQuantity;
        if (totalQuantity > 1000) {
            alert('Nous vous informons que la date séléctionnée est complête veuillez choisir une autre date.');
            document.getElementById('date').value = '';
        }
    }
}
