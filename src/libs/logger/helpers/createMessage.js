/**
 * @param {any} text
 */
 function createMessage(text, className, stringifyText) {
    // IF PASSED TEXT NOT NULL OR UN DEFINED 
    if (!this.is.useless(text)) {
        // IF PASSED CLASSNAME NOT NULL OR UNDEFIEND AND HAS STRING TYPE
        if (!this.is.useless(className) && this.is.string(className)) {
            // IF STRINGIFYTEXT PARAM IS BOOLEAN 
            if (this.is.boolean(stringifyText)) {
                // EVERY THING IS OKII LET'S CREATE OUR MESSAGE
                
                // IF I SHOULD STRINGIFY MESSAGE
                if (stringifyText) return `FROM ${className[this.classNameCase.name]()} SHOW ${JSON.stringify(text)}`;
                // ELSE
                return `FROM ${className[this.classNameCase.name]()} SHOW ${text}`;
            }
        }
    }
}

export default createMessage;
