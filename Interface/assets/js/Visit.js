class Visit {
    constructor() {
        this.generateStructure();
        this.generateForm();
        this.tooMuchTicket();
    }

    afterReveivedConfig() {
        this.showPrices();
        this.setCommandNumber()
        this.setDatePicker();
        this.sendForm();
    }

    generateStructure() {
        window.visit = this;
        var masterDiv = document.getElementById('wrapper');
        var section = document.createElement('section');
        section.id = 'section1';
        var header = document.createElement('header');
        var h3 = document.createElement('h3');
        var div = document.createElement('div');
        div.classList.add('content');
        div.id = 'div1';
        masterDiv.appendChild(section);
        section.appendChild(header);
        header.appendChild(h3);
        h3.innerHTML += '1 - Date de visite';
        section.appendChild(div);
    }

    generateForm() {
        var content = document.getElementById('div1');
        content.innerHTML = `
            <form method='post' id='form1'>
                <div class='fields'>
                    <div class='field'>
                        <label for='mail' >Adresse Mail</label>
                        <input type='text' name='mail' id='mail' placeholder='exemple@exemple.com'required/>
                    </div>
                    <div class='field half'>
                        <label for='quantity' >Quantité</label>
                        <input type='text' name='quantity' id='quantity' placeholder='1' required  />
                    </div>
                    <div class='field half'>
                        <label for='date' >Date de la visite</label>
                        <input type='text' name='date' id='date' placeholder='JJ/MM/AAAA' autocomplete='off' required />
                    </div>
                    <div class='field half'>
                        <input type='checkbox' id='halfday' />
                        <label for='halfday' >Demi-Journée (Soit de 8h à 14h ou de 14h à 20h)</label>
                    </div>
                </div>
                <ul class='actions'>
                    <li><input id=submit type='submit' value='Etape Suivante' class='primary'/></li>
                </ul>
            </form>`
    }

    showPrices() {
        // Get Config file
        var config = JSON.parse(window.sessionStorage.config);
        document.getElementById('prices').innerHTML += `
          <table>
              <thead>
                <tr>
                  <th>Offre</th>
                  <th>Description</th>
                  <th>Prix</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${config.prices[0].offer}</td>
                  <td>${config.prices[0].descr}</td>
                  <td>${config.prices[0].prices}&nbsp;€</td>
                <tr/>
                <tr>
                  <td>${config.prices[1].offer}</td>
                  <td>${config.prices[1].descr}</td>
                  <td>${config.prices[1].prices}&nbsp;€</td>
                <tr/>
                <tr>
                  <td>${config.prices[2].offer}</td>
                  <td>${config.prices[2].descr}</td>
                  <td>${config.prices[2].prices}&nbsp;€</td>
                <tr/>
                <tr>
                  <td>${config.prices[3].offer}</td>
                  <td>${config.prices[3].descr}</td>
                  <td>${config.prices[3].prices}&nbsp;€</td>
                <tr/>
              </tbody>
           </table>`;
    }

    setDatePicker() {
        var request = new Request();
        var date = new Date();
        var year = date.getFullYear();
        var day = date.getDate();
        var month = date.getMonth();
        var config = JSON.parse(window.sessionStorage.config);
        var disableDays = config.disableDays[0].days;
        var disabledDates = [];
        var temp;
        var length = config.disableDates[0].dates.length;
        for (var i = 0; i < length; i++) {
            temp = config.disableDates[0].dates[i].split(",");
            disabledDates.push(new Date(temp[0], temp[1], temp[2]));
        }
        const picker = datepicker('#date', {
            onSelect: datepicker => {
                var inputDate = document.getElementById('date').value;
                sessionStorage.setItem('inputDate', inputDate);
                request.getVisit('http://127.0.0.1:8000/api/visits/date=' + this.transformDate(inputDate), request.getQuantity, true);
                this.isDateEgual(inputDate);
            },
            maxDate: new Date((year + 1) + ', ' + (month + 1) + ', ' + (day + 1)),
            minDate: new Date(year + ', ' + (month + 1) + ', ' + (day)),
            startDay: 1,
            overlayButton: "Entrer une Date",
            customDays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
            customMonths: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            disabler: date => disableDays.indexOf(date.getDay()) !== -1,
            formatter: (input, date, instance) => {
                const value = date.toLocaleDateString();
                input.value = value;
            },
            disabledDates: disabledDates
        });
    }

    tooMuchTicket() {
        var quantity = document.getElementById('quantity')
        quantity.addEventListener('input', function () {
            if (quantity.value > 10) { alert('La billetterie Internet du Musée du Louvre ne permet que de commander moins de 10 tickets à la fois, vous pouvez réserver notre offre de groupe en appellant le 06 XX XX XX XX') }
        });
    }

    setCommandNumber() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        var result = ''
        for (var i = 0; i < 15; i++) {
            result += list[Math.floor(Math.random() * list.length)]
        }
        sessionStorage.setItem('numberCommand', result);
    }

    getActualHour() {
        var actualHour = new Date()
        var h = actualHour.getHours()

        if (h < 10) { h = '0' + h }

        var result = h;
        return result;
    }

    getActualDate() {
        var actualDay = new Date();
        var d = actualDay.getDate();

        if (d < 10) { d = '0' + d }
        var m = actualDay.getMonth() + 1
        if (m < 10) { m = '0' + m }
        var y = actualDay.getFullYear();

        var result = d + '/' + m + '/' + y;
        return result;
    }

    isDateEgual(inputDate) {
        var actualHour = this.getActualHour();
        var actualDate = this.getActualDate();
        var inputDate = inputDate;
        if (actualDate == inputDate) {
            if (actualHour >= 20) {
                alert('Le musée est fermé');
                document.getElementById('date').value = '';
            }
            else if (actualHour >= 19) {
                document.getElementById("halfday").checked = true;
                document.getElementById("halfday").disabled = true;
                alert('Le musée va fermer changer de jour');
                document.getElementById('date').value = '';
            }
            else if (actualHour >= 14) {
                document.getElementById("halfday").checked = true;
                document.getElementById("halfday").disabled = true;
            }
        }
        else {
            document.getElementById("halfday").checked = false;
            document.getElementById("halfday").disabled = false;
        }
    }

    transformDate(date) {
        var transformDate = date;
        return transformDate.replace(new RegExp('/', 'g'), '-');
    }

    sendForm() {
        document.getElementById("form1").addEventListener("submit", function (e) {
            e.preventDefault();
            req.sendVisit("http://127.0.0.1:8000/api/postVisit");
            var masterDiv = document.getElementsByClassName('wrapper');
            window.client = new MainClient();
        });
    }
}
