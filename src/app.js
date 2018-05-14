import { component } from './libs/component';


@component.bootstrap({
    asyncHooks: ['name'],
    id: 'x',
    prefix: 'xoo',
    async: false
})
class x extends component {
    constructor() {
        super();
        this.hello = 'ahme'
    }

    before() {

    }

    on() {

    }

    after() {

        console.log($.fn[this.appName].hasAttr);
    }

    init() {
        this.setupComponent();
    }
}


new x().init();

console.log(new x());
