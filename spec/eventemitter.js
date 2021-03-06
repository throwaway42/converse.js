(function (root, factory) {
    define(["mock", "converse-api", "test_utils"], factory);
} (this, function (mock, converse, test_utils) {

    return describe("The _converse Event Emitter", function() {

        it("allows you to subscribe to emitted events", mock.initConverse(function (_converse) {
            this.callback = function () {};
            spyOn(this, 'callback');
            _converse.on('connected', this.callback);
            _converse.emit('connected');
            expect(this.callback).toHaveBeenCalled();
            _converse.emit('connected');
            expect(this.callback.callCount, 2);
            _converse.emit('connected');
            expect(this.callback.callCount, 3);
        }));

        it("allows you to listen once for an emitted event", mock.initConverse(function (_converse) {
            this.callback = function () {};
            spyOn(this, 'callback');
            _converse.once('connected', this.callback);
            _converse.emit('connected');
            expect(this.callback).toHaveBeenCalled();
            _converse.emit('connected');
            expect(this.callback.callCount, 1);
            _converse.emit('connected');
            expect(this.callback.callCount, 1);
        }));

        it("allows you to stop listening or subscribing to an event", mock.initConverse(function (_converse) {
            this.callback = function () {};
            this.anotherCallback = function () {};
            this.neverCalled = function () {};

            spyOn(this, 'callback');
            spyOn(this, 'anotherCallback');
            spyOn(this, 'neverCalled');
            _converse.on('connected', this.callback);
            _converse.on('connected', this.anotherCallback);

            _converse.emit('connected');
            expect(this.callback).toHaveBeenCalled();
            expect(this.anotherCallback).toHaveBeenCalled();

            _converse.off('connected', this.callback);

            _converse.emit('connected');
            expect(this.callback.callCount, 1);
            expect(this.anotherCallback.callCount, 2);

            _converse.once('connected', this.neverCalled);
            _converse.off('connected', this.neverCalled);

            _converse.emit('connected');
            expect(this.callback.callCount, 1);
            expect(this.anotherCallback.callCount, 3);
            expect(this.neverCalled).not.toHaveBeenCalled();
        }));
    });
}));
