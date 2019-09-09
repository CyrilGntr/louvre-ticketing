describe("Interface of Website", function () {
    var front;

    beforeEach(function () {
        front = new Front();
    });

    describe("When the page loads", function () {
        it('Should receive the config file', function () {
            expect(front.getConfigFile()).toBe(true);
        });
    });
});