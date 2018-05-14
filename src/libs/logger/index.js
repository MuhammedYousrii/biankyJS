import  { processMessage } from './helpers/processMessage';
import createMessage from './helpers/createMessage';
import { injectCoreClassMetadata } from 'cores';


@injectCoreClassMetadata({
    name: 'logger',
    related: 'bianky',
    need: 'is',
})
class logger {
    constructor({ loggerC, appName }) {
        if (loggerC.classNameCase === 'capitalize') {
            this.classNameCase = (text) => text.charAt(0).toUpperCase() + text.slice(1);
        } else {
            this.classNameCase = 
            String.prototype[loggerC.classNameCase] || String.prototype.toUpperCase;
        }


        this.defaultClassName = appName || 'bianky';
    }
    
    /**
    * 
    * @param {any} $text
    * @param {String} className 
    * @param {Boolean} stringifyText 
    */
    log(text, className = this.defaultClassName, stringifyText = false) {
        processMessage('log', createMessage.bind(this)(text, className, stringifyText));   
    }


    warn(text, className = this.defaultClassName, stringifyText = false) {
        processMessage('warn', createMessage.bind(this)(text, className, stringifyText));
    }

    error(text, className = this.defaultClassName, stringifyText = false) {
        const message = createMessage.bind(this)(text, className, stringifyText);
        processMessage('error', message);
        throw new Error(message);          
    }
}


export default logger;
