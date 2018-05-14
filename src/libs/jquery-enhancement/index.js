import { injectCoreClassMetadata } from 'cores';

@injectCoreClassMetadata({
    name: 'jQExtensions',
    related: 'bianky',
})
class jQExtensions {
    constructor({ appName, jqueryExtensions }) {
        this.extensionsCounter = 0;
        if (jqueryExtensions.length >= 1) {
            jqueryExtensions.forEach(extension => {
                if (this.extensionsCounter === 0) {
                    $.fn[appName] = {};
                }
                this[extension](appName);
                this.extensionsCounter++;
            });
        }
    }

    hasAttr(appNamespace) {
        // console.log(appNamespace);
        $.fn[appNamespace].hasAttr = function (attrName) {
            this.each(function () {
                return this.is(`[${attrName}]`);
            });
        };
    }

    static needConfig() {
        return true;
    }
};


export { jQExtensions };
