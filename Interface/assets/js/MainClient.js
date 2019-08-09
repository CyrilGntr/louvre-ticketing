class MainClient {
    constructor()
    {
        this.visitors = [];
        this.generateStructure();
        document.getElementById('div2').innerHTML = this.generateButton();
        this.container = document.getElementById("container");
        this.clients = [];
        this.clients.push(new Client(this.container, this.clients.length));
        if (Number(sessionStorage.getItem('quantity')) == 1) {
            document.getElementById('checkout').style.display = 'inline';
            document.getElementById('addButton').style.display = 'none';
        }
    }

    generateStructure()
    {
        window.mainClient = this;
        var masterDiv = document.getElementById('wrapper');
        var section = document.createElement('section');
        section.id = 'section2';
        var header = document.createElement('header');
        var h3 = document.createElement('h3');
        var div = document.createElement('div');
        var para = document.createElement('p');
        para.innerHTML += "Votre numéro de commande : " + sessionStorage.getItem('numberCommand');
        div.classList.add('content');
        div.id = 'div2';
        masterDiv.appendChild(section);
        section.appendChild(header);
        header.appendChild(h3);
        h3.innerHTML += '2 - Informations visiteurs';
        section.appendChild(div);
        div.appendChild(para);
    }

    generateButton()
    {
        return `
                <div id="container"></div>
                <div id="divButton">
                    <button id="addButton" onclick="mainClient.add()" class='primary'>Prochain Visiteur</button>
                    <button style='display:none' onclick="mainClient.checkout()" id="checkout">Etape Suivante</button>
                </div>`
    }

    add()
    {
      var client = new Client(this.container, this.clients.length);
      var id = this.clients.length - 1;
      if (Number(this.clients.length + 1) == Number(sessionStorage.getItem('quantity'))) {
          document.getElementById('checkout').style.display = 'inline';
          document.getElementById('addButton').style.display = 'none';
      }
      var visitor = {
        numberCommand: sessionStorage.getItem('numberCommand'),
        lastname: document.getElementById('lastname' + id).value,
        firstname: document.getElementById('firstname' + id).value,
        country: document.getElementById('country' + id).value,
        birthday: document.getElementById('birthday' + id).value,
        reduice: document.getElementById('reduice' + id).checked
      }
      this.visitors.push(visitor);
      req.sendClient('http://127.0.0.1:8000/api/postVisitor', visitor);
      this.clients.push(client);
    }

    checkout()
    {
      var id = this.clients.length - 1;
      var visitor = {
        numberCommand: sessionStorage.getItem('numberCommand'),
        lastname: document.getElementById('lastname' + id).value,
        firstname: document.getElementById('firstname' + id).value,
        country: document.getElementById('country' + id).value,
        birthday: document.getElementById('birthday' + id).value,
        reduice: document.getElementById('reduice' + id).checked
      }
      this.visitors.push(visitor);
      req.sendClient('http://127.0.0.1:8000/api/postVisitor', visitor);
      var summary = new Summary(this.visitors);
    }
}
