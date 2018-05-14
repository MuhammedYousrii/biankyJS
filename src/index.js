import biankyIs from './libs/is';
import { injectDependency } from 'cores';
import logger from './libs/logger';
import utils from './utils';
import biankyConfig from '../bianky.config.js';
import { Dom } from './libs/dom';
import { jQExtensions } from './libs/jquery-enhancement';

@injectDependency(jQExtensions, jQExtensions.needConfig() ? biankyConfig : null)
@injectDependency(Dom, biankyConfig)
@injectDependency(utils)
@injectDependency(logger, biankyConfig)
@injectDependency(biankyIs)
class app {
    constructor() {
        this.activeComponentName = 'root';
        this.providedClasses = ['logger', 'is'];    
        Object.assign(this, biankyConfig);
        
    }
}

export default app;
