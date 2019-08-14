class Client {
    constructor(dom, id) {
        window.client = this;
        this.id = id;
        window.id = this.id;
        var div = document.createElement("div");
        div.className = "client";
        div.id = "client" + id;
        dom.appendChild(div);
        this.dom = document.getElementById("client" + id);
        this.dom.innerHTML = this.generateForm();
        this.reduit = false;
        this.halfday = document.getElementById('halfday').checked;
        this.setSecondDatepicker();
        document.getElementById(`reduice${this.id}`).addEventListener("change", this.changeReduction.bind(this));
    }

    changeReduction() {
        this.reduit = !this.reduit;
        this.calculatePrice(sessionStorage.getItem(`age${this.id}`), this.reduit, this.halfday);
        this.savePrice(sessionStorage.getItem(`age${this.id}`), this.reduit, this.halfday);
    }

    generateForm() {
        return `
            <form method='post' id='form2'>
                <h4>Visiteur ${this.id + 1}</h4>
                <div class='fields'>
                    <div class='field'>
                        <label for='lastname${this.id}'>Nom</label>
                        <input type='text' name='lastname${this.id}' id='lastname${this.id}' placeholder='Dupont' required />
                    </div>
                    <div class='field'>
                        <label for='name${this.id}' >Prénom</label>
                        <input type='text' name='firstname${this.id}' id='firstname${this.id}' placeholder='Jean' required />
                    </div>
                    <div class='field half'>
                        <label for='country${this.id}' >Pays</label>
                        <input type='text' name='country${this.id}' id='country${this.id}' required />
                    </div>
                    <div class='field half'>
                        <label for='birthday${this.id}' >Date de naissance</label>
                        <input type='text' name='birthday${this.id}' id='birthday${this.id}' placeholder='JJ/MM/AAAA' autocomplete='off' required;/>
                    </div>
                    <div class='field half'>
                        <input type='checkbox' id='reduice${this.id}' />
                        <label for='reduice${this.id}' >Tarif réduit (Avec justificatif)</label>
                    </div>
                </div>
                <p id='price${this.id}'></p>
            </form>`;
    }

    calculateAge() {
        var dateText = document.getElementById(`birthday${this.id}`).value;
        var date = new Date();
        var year = date.getFullYear();
        var birthday = dateText.split('/');
        sessionStorage.setItem(`birthday${this.id}`, birthday[2]);
        var age = year - birthday[2];
        sessionStorage.setItem(`age${this.id}`, age);
    }

    calculatePrice(age, reduit = false, halfday) {
        var config = JSON.parse(window.sessionStorage.config);
        let reduiceCoef = reduit ? config.reduit : 1;
        let halfdayCoef = halfday ? config.halfday : 1;
        for (let i = 0; i < config.prices.length; i++) {
            if (age > config.prices[i].ageMax) continue;
            return document.getElementById(`price${this.id}`).innerHTML = 'Tarif ' + config.prices[i].offer + ' : ' + Math.round(Number(config.prices[i].prices) * reduiceCoef * halfdayCoef) + ' €';
        }
    }

    savePrice(age, reduit = false, halfday) {
        var config = JSON.parse(window.sessionStorage.config);
        let reduiceCoef = reduit ? config.reduit : 1;
        let halfdayCoef = halfday ? config.halfday : 1;
        for (let i = 0; i < config.prices.length; i++) {
            if (age > config.prices[i].ageMax) continue;
            return sessionStorage.setItem(`price${this.id}`, Math.round(Number(config.prices[i].prices) * reduiceCoef * halfdayCoef));
        }
    }

    setSecondDatepicker() {
        var date = new Date();
        var year = date.getFullYear();
        var day = date.getDate();
        var month = date.getMonth();
        const picker = datepicker(`#birthday${this.id}`, {
            onSelect: datepicker => {
                this.calculateAge();
                var age = sessionStorage.getItem(`age${this.id}`);
                this.calculatePrice(age, this.reduit, this.halfday);
                this.savePrice(age, this.reduit, this.halfday);
            },
            startDay: 1,
            maxDate: new Date(year + ', ' + (month + 1) + ', ' + day),
            customDays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
            customMonths: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            formatter: (input, date, instance) => {
                const value = date.toLocaleDateString();
                input.value = value;
            },

        });
    }
}
