class StripeComponent {

    /**
     * [constructor description]
     * @function
     * @param  {[type]} secret [description]
     * @param  {[type]} parent [description]
     * @param  {[type]} name   [description]
     * @param  {[type]} key    [description]
     * @return {[type]}        [description]
     */
    constructor(secret, parent, name, key) {
        this.name = name;
        this.secret = secret;
        window[name] = this;
        let content = document.createElement("div");
        content.innerHTML = this.html();
        content.id = name;
        parent.appendChild(content);
        this.dom = document.getElmentById(name);

        this.stripe = Stripe(key);
        var elements = this.stripe.elements();
        var cardElement = elements.create('card');
        cardElement.mount('#card-element');

    }

    html() {
        return `
            <input id="cardholder-name" type="text">
            <!-- placeholder for Elements -->
            <div id="card-element"></div>
            <button id="card-button" data-secret="<?= $intent->client_secret ?>" onclick="${this.name}.click()">
              Submit Payment
            </button>
            `;
    }

    click() {
        var cardholderName = document.getElementById('cardholder-name');
        this.stripe.handleCardPayment(
            this.secret, cardElement, {
                payment_method_data: {
                    billing_details: { name: cardholderName.value }
                }
            }
        ).then(function (result) {
            if (result.error) {
                // Display error.message in your UI.
            } else {
                // The payment has succeeded. Display a success message.
            }
        }
        );
    }
}
