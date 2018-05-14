const frameworkCoreServices = ['logger', 'is', 'utils', 'dom', 'form', 'http'];

/**
 * 
 * @param {Class} service - SERVICE TO INJECT WITH TARGET CLASS
 * @summary THIS FUNCTION IS BASED ON BABEL-DECORATOR-PLUGIN 
 */

export const injectDependency = function (service, config) {
    return function (target) {
        const serviceInstance = new service(config);
        const neededModule = serviceInstance.need;

        if (serviceInstance.related === 'bianky') {
            // IF THIS SERVICE ALLOWED TO BE PROVIDED TO THIS CLASS
            if (frameworkCoreServices.includes(serviceInstance.serviceName)) {
                // ATTACHING IT IN THE PROTOTYPE OF CLASS 
                target.prototype[serviceInstance.serviceName] = serviceInstance;

                if (neededModule) {
                    if (Array.isArray(neededModule)) {
                        neededModule.forEach(need => {
                            target.prototype[serviceInstance.serviceName][need] = target.prototype[need];
                        })                        
                    } else {
                        target.prototype[serviceInstance.serviceName][neededModule] = target.prototype[neededModule];
                    }
                }
                return target;
            }
        }
    };
};

export const injectCoreClassMetadata = function (metadata) {
    return function (target) {
        const modifiedTarget = target;
        delete window.target;
        if (target) {
            target = null;
        }
        modifiedTarget.prototype.serviceName = metadata.name;
        modifiedTarget.prototype.related = metadata.related;
        if (metadata.need) {
            modifiedTarget.prototype.need = metadata.need;
        }
        return modifiedTarget;
    };
};

