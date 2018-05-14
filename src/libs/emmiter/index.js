
/**
 * @class
 * @name biankyEmitter
 * @author Muhammed Yousrii <muhammed.yuosry@gmail.com>
 * @since 2017
 * @version 1.0.3
 */


class emitter {
    constructor() {
        // REGISTERED EVENTS COLLECTION 
        this.events = {};
        this.handlerID = 0;

        this.utils = {
            isString: para => typeof para === 'string',
            undefined: value => typeof value == 'undefined'
        };
    }

    // sameHandlerMessage = "ThisHandlerIsUsedBefore";

    /**
     * @method
     * @name subscribe
     * @memberof biankyEmitter
     * @see https://www.youtube.com/watch?v=nQRXi1SVOow
     *
     * 
     * @param {String} eventName - NAME FOF EVENT WILL BE REGISTERED
     * @param {mixed} eventHandler 
     * @param {Function} callback - FUNCTION TO EXCUTE AFTER SUCCESSFUL REGISTER 
     * 
     * 
     * 
     * @author MUHAMMED YOUSRII  <muhammed.yuosry@gmail.com>
     * @version 1.0.4 - REMOVE HANDLER_TYPE BECAUSE WE FIGURE IT AUTO 
     * @summary THIS METHOD HANDLE PROCESS OF REGISTER EVENT OR NEW HANDLER  
     */
    subscribe(eventName, eventHandler, callback) {
        // IF EVENT HAS BEEN REGISTERED BEFORE
        if (this.events.hasOwnProperty(eventName)) {
            // PASSING PARAMS TO REGISTER METHOD THAT WILL HANDLE EVERY THING
            this.register(eventName, eventHandler);

            // CREATE RESPONSE
            const response = { stat: 'DONE', note: 'Event REGISTERED BEFORE, WE WILL ASSIGN THIS HANDLER TO IT', handlerID: this.handlerID };
            // IF CALLBACK FUNCTION PASSED CALL IT WITH CREATED RESPONSE
            this.isCallbackWanted(callback, response);
        } else {
            // IF NOT REGISTERED BEFORE
            // CREATE NEW EVENT WITH PASSED NAME 
            this.events[eventName] = [];  
            this.register(eventName, eventHandler);
            const response = { stat: 'DONE', note: null, handlerID: this.handlerID };
            // IF CALLBACK FUNCTION PASSED CALL IT WITH CREATED RESPONSE
            this.isCallbackWanted(callback, response);
        }
    }


    /**
     * @method
     * @name unsubscribe 
     * @memberof biankyEmitter
     * 
     * @param {String} eventName - EVENT TO UNSUBSCRIBE  
     * @param {Function} callback 
     * @version 1.0.3 USE IS CALL BACK WANTED HELPER METHOD
     * @summary THIS METHOD HANDLE PROCESS OF un-REGISTER EVENT OR NEW HANDLER
     * @returns 
     */
    unsubscribe(eventName, callback) {
        const successResponse = {
            state: 'DONE',
            note: 'ALL EVENT HANDLERS HAS BEEN DISABLED AND EVENT REMOVED', 
            deletedEvent: this.events[eventName]
        };

        const failureResponse = {
            state: 'FAIL',
            note: 'we Dont Found this Event' 
        };
        // IF EVENT IS REGISTERED BEFORE
        if (this.event_found(eventName)) {
            // IF CALLBACK FUNCTION PASSED CALL IT WITH CREATED RESPONSE
            this.isCallbackWanted(callback, successResponse);
            // THEN DELETE EVENT
            return delete this.events[eventName];
        } 
        this.isCallbackWanted(callback, failureResponse);
        return false;
    }


    unsubscribeHandler(eventName, handlerID, callback) {
        if (this.event_found(eventName)) {
            const eventHandlers = this.events[eventName];
            eventHandlers.map(handler => {
                if (handler.id === handlerID) {
                    eventHandlers.splice(handler, 1);
                    callback({ stat: 'done', note: 'To Register this Handler Again Use subscribe' });
                }
            });
            return; 
        }
        
        callback({ state: 'FAIL', note: "We Don't Found this Event" });
    }

    publish(eventName, arg, hooks) {
        let _this = this; 
        this.events[eventName].forEach(func => {
            func.handler(arg);
        });

        if (hooks) {
            return new Promise((resolve, reject) => {
                if (_this.events[eventName][0]) resolve(true);
                else reject(false); 
            });
        }
    }
    

    register(eventName, eventHandler) {
        if (typeof eventHandler === 'function') {
            this.binder(eventName, eventHandler);
        }
    
        if (typeof eventHandler === 'object' && !Array.isArray(eventHandler)) {
            for (let indexer in eventHandler) {
                if (eventHandler.hasOwnProperty(indexer)) {
                    this.objectBinder(eventName, eventHandler[indexer]);
                }
            }
        }
    
        if (typeof eventHandler === 'object' && Array.isArray(eventHandler)) {
            for (let index = 0; index < eventHandler.length; index++) {
                this.binder(eventName, eventHandler);
            }
        }
    }

    binder(eventName, eventHandler) {
        if (!Array.isArray(eventHandler)) {
            if (this.events[eventName].length == 1) {
                this.isSameHandler(eventHandler, this.events[event_found]);
                this.debuger.warn('Handler not register to event because it register before');
                return false;
            }
        }
        this.events[eventName].push({ id: this.handlerID, handler: eventHandler });
        this.handlerID++;
    }

    objectBinder(eventName, eventHandler) {
        this.events[eventName].push({ id: eventHandler.id, handler: eventHandler.handler });
    }


    /**
     * @method 
     * @name event_found
     * @memberOf biankyEmitter
     * @param {String} eventName - NAME OF EVENT TO CHECK IF FOUND OR NOT  
     * @returns {Boolean}
     */
    event_found(eventName) {
        if (this.utils.isString(eventName)) {
            if (!this.utils.undefined(this.events[eventName])) {
                return true;
            }
            return false;
        } else {
            return false;
        }
    }

    isCallbackWanted(callback, response) {
        if (callback) {
            callback(response);
        }
    }

    isSameHandler(newHandler, prevHandler) {
        return prevHandler.toString() === newHandler.toString();
    }
}


export { emitter };
