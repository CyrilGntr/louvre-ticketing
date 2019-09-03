class StripeComponent {
    constructor(secret, parent, name, key) {
        this.name = name;
        this.secret = secret;
        window[name] = this;
        let content = document.createElement("div");
        content.innerHTML = this.html();
        content.id = name;
        parent.appendChild(content);
        this.dom = document.getElementById(name);
        this.stripe = Stripe(key);
        var elements = this.stripe.elements();
        this.cardElement = elements.create("card");
        this.cardElement.mount('#card-element');

    }

    html() {
        return `
            <div class="field-half">
                <label for="cardholder-name">Nom du titulaire</label>
                <input id="cardholder-name" name="cardholder-name" type="text" placeholder="Jean Dupont">
            </div>
            <!-- placeholder for Elements -->
            <div id="card-element"></div>
            <br>    
            <ul class="actions">
                <li><input type="submit" id="card-button" data-secret="${this.secret}>" onclick="${this.name}.click()" value="Payer"></li>
            </ul>`;

    }

    click() {
        var cardholderName = document.getElementById('cardholder-name');
        this.stripe.handleCardPayment(
            this.secret, this.cardElement, {
                payment_method_data: {
                    billing_details: { name: cardholderName.value }
                }
            }
        ).then(function (result) {
            if (result.error) {
                alert('Désolé, il y\'a eu un problème avec le paiement :(');
            } else {
                alert('Merci pour votre commande. Nous allons vous envoyer les billets par email :)');
            }
        }
        );
    }
}
