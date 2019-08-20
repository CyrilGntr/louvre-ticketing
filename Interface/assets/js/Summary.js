class Summary {
  constructor(data) {
    this.visitors = data;
    this.generateStructure();
    this.generateSummary();
  }

  calculateTotal() {
    var total = 0;
    for (var i = 0; i < sessionStorage.getItem('quantity'); i++) {
      total += Number(sessionStorage.getItem(`price${i}`));
    }
    var p = document.createElement('p');
    var div = document.getElementById('div3');
    p.innerHTML = 'Tarif total de : <b>' + total + ' €</b>';
    div.appendChild(p);
    sessionStorage.setItem('total', total);
  }



  generateStructure() {
    window.summary = this;
    var masterDiv = document.getElementById('wrapper');
    var section = document.createElement('section');
    section.id = 'section3';
    var header = document.createElement('header');
    var h3 = document.createElement('h3');
    var div = document.createElement('div');
    div.classList.add('content');
    div.id = 'div3';
    masterDiv.appendChild(section);
    section.appendChild(header);
    header.appendChild(h3);
    h3.innerHTML += '3 - Résumé';
    section.appendChild(div);
  }

  generateSummary() {
    // Create differents elements
    var numberCommand = document.createElement('p');
    var email = document.createElement('p');

    // Get the div to place content
    var div = document.getElementById('div3');

    // Add differents elements to the HTML File
    div.appendChild(numberCommand);
    div.appendChild(email);

    // Put value in var
    numberCommand.innerHTML += 'Votre numéro de commande : <b>' + sessionStorage.getItem('numberCommand') + '</b>';
    email.innerHTML += 'Votre email de commande : <b>' + document.getElementById('mail').value + '</b>';
    //console.log(this.visitors);
    var resume = '';
    for (var i = 0; i < this.visitors.length; i++) {
      resume += `Visiteur ${i + 1} : ${this.visitors[i].lastname} ${this.visitors[i].firstname} ${this.visitors[i].date} ${this.visitors[i].country} ${this.visitors[i].reduice} ${sessionStorage.getItem('price' + i)} €<br>`;
    }
    var resumeDOM = document.createElement('p');
    resumeDOM.innerHTML = resume;
    div.appendChild(resumeDOM);
    this.calculateTotal();
    req.getIntent('http://127.0.0.1:8000/api/visitor/' + sessionStorage.getItem('numberCommand'));
  }
}
