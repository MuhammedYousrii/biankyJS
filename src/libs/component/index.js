import app from '../../index.js';


// THIS HERE REFERENCE TO ALL OF [COMPONENT-CLASS, BIANKYAPP-CLASS, NEW-INSTANCE ] 
// BIANKYAPP THIS PROVIDE COMPONENT-CLASS WITH [UTILS, IS, DOM, MAIN-DATA, CONFIG]

// THE FLOW WORK LIKE THIS BIANKYAPP --> COMPONENT --> BOOTSTRAP-CLASS --> INSTANCE
class component extends app {

    constructor() {
        super();

        this.customBreakpoints = this.componentC.breakPoints;


        // BIANKYAPP 
        this.currentScreenWidth = function () {
            return this.dom.$window.width();
        };
    }
    /**
     * 
     * @param {Object} hooks - obejct of functions with named keys   
     */
    // --- CHILD COMPONENTS


    /**
     * 
     * @param {String} path - IMAGE NAME TO RESOLVE 
     */
    assets(path) {
        if (typeof path === 'string') {
            if (this.prodEnv) return `${location.origin}/media/${path}`;
            return `/media/${path}`;
        }
        return this.logger.warn(`ENTERED PATH SHOULD BE STRING ONLY `, 'component-assets-function');
    }

    injectDependencies() {
        this.html = require(`./${this.id}.component.${this.templateC.preProcessor ? this.templateC.type : 'html'}`);

        this.css = require(`./${this.id}.component.${this.styleC.preProcessor ? this.styleC.type : 'css'}`);
    }

    /**
     * @method attachChildComponentController
     * 
     * @param {Object} CCC 
     * @param {any} data 
     * @param {String} component_scope 
     * @memberof component
     * @returns {OBJECT} Instance - NEW INSTANCE OF CHILD-COMPONENT-CONTROLLER(CCC)
     */
    injectChildComponentController(CCC, params, currentComponentScope) {
        // MY NEW INSTANCE OF CHILD COMPONENT THAT ATTACHED AS PROPERTY OF PARENT-COMPONENT
        let instance;

        // IF PARAMS IS NULL OR EMPTY  
        if (this.uselessParam(params)) {
            instance = new CCC(currentComponentScope);
        } else {
            // IF THERE IS PARAMS PASSED
            instance = new CCC(currentComponentScope, params);
        }

        const componentID = this.concatWithDash(currentComponentScope.prefix, instance.name);


        // REGISTER CHILD COMPONENT VIEW        
        if (this.is.string(instance.name)) {
            if (this.is.eq(instance.type, 'dynamic')) {
                this.registerChildComponent(componentID, instance);
                return instance;
            }
            this.logger.warn(' IF IT HAS NO LOGIC INJECT HIM AS INLINE-COMPONENT', this.prototype.injectChildComponentController.name);
            this[instance.name] = instance;
            return instance;
        }
    }

    /**
     * @method registerHooksManual
     * @memberOf component
     * 
     * @param {Object|Array|func} - LIST OF HOOKS TO PROCESS IN ROW
     * 
     * @summary  
     */
    registerHooksManual(hooks) {
        const _this = this;
        for (const hook in hooks) {
            if (hooks.hasOwnProperty(hook)) {
                const hookHandler = hooks[hook];
                if (this.is.array(hookHandler)) {
                    _this[hook] = [];
                    hookHandler.forEach(function (handler) {
                        _this[hook].push(handler);
                    })
                } else if (this.is.func(hookHandler)) {
                    _this[hook] = hookHandler;
                } else if (this.is.obj(hookHandler)) {
                    _this[hook] = {};
                    for (let key in hookHandler) {
                        if (hookHandler.hasOwnProperty(key)) {
                            _this[hook][key] = hookHandler[key];
                        }
                    }
                } else {
                    this.logger.warn('THIS FUNCTION ACCEPT FUNC & ARR TYPES ONLY WE CAN\'T BIND THIS', this.prototype.registerHooksManual.name);
                }
            }
        }
    }

    // --- READ METADATA OF CHILD COMPONENT 
    registerChildComponent(id, child) {
        const componentName = child.name;
        child.id = id;
        this.childrenComponents[componentName] = child;
        this.childrenComponentsNums++;
    }
    // --- CREATE VIEW FOR CUSTOM CHILD COMPONENT 
    customComponent(name, classes, attrs) {
        const childComponent = this.childrenComponents[name];
        return `<section id="${childComponent.id}" class="${classes ? classes : ''}" ${attrs ? attrs: ''} data-parent-scope="${this.scope}"></section>`;
    }

    // --- DEFINE STATIC PROPERTIES AT RUNTIME 
    defineProperties() {
        this.childrenComponents = {};
        this.childrenComponentsNums = 0;
    }


    // --- HOOKS UTILS


    uselessParam(param) {
        return this.is.isNull(param);
        // && this.Is.isEmpty(param);
    }

    logRegisterdHooks() {
        this.logger.log(`BEFORE COMPONENT INIT HOOK ${this.before}`);
        this.logger.log(`ON COMPONENT INIT HOOK ${this.on}`);
        this.logger.log(`AFTER COMPONENT INIT HOOK ${this.after}`);
        this.logger.log(`ON COMPONENT DESTROY ${this.destroy}`);
    }

    hookCaller(hook, data) {
        this.changeState(hook);
        if (this.is.array(this[hook])) {
            this[hook].forEach(hookHandler => {
                if (data) {
                    return hookHandler(data);
                }
                return hookHandler();
            })
        } else if (this.is.obj(this[hook])) {
            Object.values(this[hook]).forEach(hookHandler => {
                if (data) return hookHandler(data);
                return hookHandler();
            })
        } else {
            if (data) return this[hook](data);
            return this[hook]();
        }
    }
    hookFound(hookName) {
        if (this[hookName]) {
            return 'found';
        }
        return 'skip';
    }

    changeState(current) {
        this.currentState = current;
    }

    doseViewReallyInstalled() {
        return this.componentEl.children().length >= 1;
    }

    dosechildernComponentReady() {
        const childrenComponents = this.componentEl.children(`[data-parent-scope="${this.scope}"]`);
        return childrenComponents === this.childrenComponentsNums;
    }


    beforeInitComponent(routesParams) {
        this.componentName = this.id;
        this.componentEl = this.el;
        this.dom.cleanRootElement();
        if (this.hookFound('before') === 'skip') {
            this.logger.warn('no before hook provided');
        } else {
            if (this.async) {
                return this.before().then(res => res);
            } else {
                this.hookCaller('before');
            }
        }
    }


    initComponent(data, routesParams) {
        this.dom.activeComponent(this.scope);
        if (this.hookFound('on') === 'found') {
            this.paramsProcess(data, routesParams, 'on');
        } else {
            this.logger.warn('NO ON HOOK HANDLER PROVIDED');
        }
    }

    // dfph => DATA FROM PREVIOUS HOOK
    afterInitComponent(dfph, routesParams) {


        if (this.dom.checkActiveComponent(this.scope)) {
            if (this.childrenComponentsNums >= 1) {
                if (this.doseViewReallyInstalled()) {
                    this.dom.renderMessage(this.scope);
                    this.changeState('after');
                    if (this.dosechildernComponentReady()) {
                        if (this.hookFound('after') === 'found') {
                            this.paramsProcess(dfph, routesParams, 'after')
                        } else {
                            this.logger.warn(' there is no hook to run');
                        }
                    } else {
                        if (this.hookFound('after') === 'found') {
                            this.paramsProcess(dfph, routesParams, 'after')
                        }
                    }
                }
            } /* HAS CHILDREN */

            /* NOT HAVING CHILDREN */
            else {
                this.dom.renderMessage(this.scope);
                if (this.hookFound('after') === 'found') {
                    this.paramsProcess(dfph, routesParams, 'after');
                }
            }
        }
    }

    paramsProcess(dfph, routeParams, hookName) {
        console.log(this.id);
        let routesParamsState = !this.uselessParam(routeParams);
        let dfphState = this.async ? this.uselessParam(dfph) ? false : true : false;
        let hookAsyncState = this.asyncHooks.includes(hookName);
        // IF DATA PASSED FROM PREVIOUS HOOK AND ROUTES PARAMS IS NULL AND
        // IF COMPONENT IS PROMISE BASED AND DATA PASSED FROM PREVIOUS HOOK 
        if (dfphState) {
            if (routesParamsState) {
                // IF ROUTES PARAMS PASSED

                // IF HOOK RETURN PROMISE
                if (hookAsyncState) {
                    return this.hookCaller(hookName, {
                        dfph,
                        routeParams
                    }).then(res => res);
                } else {
                    return this.hookCaller(hookName, {
                        dfph,
                        routeParams
                    });

                }
            }
            // IF ROUTES PARAMS NOT PASSED TO
            // IF HOOK RETURN PROMISE
            if (hookAsyncState) {
                return this.hookCaller(hookName, {
                    dfph
                }).then(res => res);
            }

            // ELSE
            return this.hookCaller(hookName, {
                dfph
            });

        }
        // IF COMPONENT IS NOT PROMISE-BASED
        // DATA FROM PREVIOUS HOOK SET TO NULL DEFAULT 
        // SO WE CHECK ONLY ON ROUTES PARAM
        else {
            if (routesParamsState) {
                // IF ROUTES PARAMS PASSED
                return this.hookCaller(hookName, {
                    routeParams
                });
            }
            // IF ROUTES PARAMS NOT PASSED TO 
            return this.hookCaller(hookName);
        }
    }

    // PASSING ROUTER PARAMS INTO HOOKS
    setupComponent(routesParams) {
        if (this.async) {
            this.defineProperties();
            this.beforeInitComponent(routesParams).then(res => {
                this.initComponent(res, routesParams);
            }).then(res => {
                this.afterInitComponent(routesParams);
            }).catch(e => console.log(e));
        } else {
            this.defineProperties();
            this.beforeInitComponent(null, routesParams);
            this.initComponent(null, routesParams);
            this.afterInitComponent(null, routesParams);
        }
    }


    static prepare(cMetadata) {
        return function (target) {
            Object.keys(cMetadata).forEach(key => {
                target.prototype[key] = cMetadata[key];
            });

            return target;
        };
    };
}


export {
    component
};