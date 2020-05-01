module.exports = {
    events: {},
    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        if (!this.events.hasOwnProperty(event)) {
            Object.defineProperty(this.events, event, {
                value: [],
                writable: true,
                enumerable: true,
                configurable: true
            })
        }
        this.events[event].push({
            sub: subscriber,
            handler: handler
        });
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        if (this.events.hasOwnProperty(event)) {
            this.events[event] = this.events[event].filter(obj => { return obj.sub !== subscriber });
        }
        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        if (this.events.hasOwnProperty(event)) {
            this.events[event].forEach(obj => {
                obj.handler.call(obj.sub);
            });
        }
        return this;
    }
};
