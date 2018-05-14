import { injectCoreClassMetadata } from 'cores';

@injectCoreClassMetadata({ name: 'is', related: 'bianky' })
class biankyIs {
    
    constructor() {

    }

    string(para) { 
        return typeof para === 'string';
    }

    func(func) {
        return typeof func === 'function';
    } 

    isNull(para) {
        return para == null;
    }

    
    array(para) {
        return Array.isArray(para);
    }


    obj(para) {
        return !this.isNull(para) && typeof para === 'object';
    }

    boolean(para) {
        return typeof para == typeof true;
    }

    DeepEq(para, para1) {
        return para === para1;
    }

    eq(para, para1) {
        return para == para1;
    } 
    
    jq(para) {
        return para instanceof window.jQuery;
    }

    useless(para) {
        return this.isNull(para);
    }
}


export default biankyIs;
