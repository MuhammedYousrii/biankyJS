import { injectCoreClassMetadata } from "../../cores";

@injectCoreClassMetadata({
    name: 'dom',
    related: 'bianky'
})
class Dom {
    constructor({ app, commonsC }) {
        this.root = $(app.rootElement);
        this.$window = $(window);
        this.$body = $('body');
        this.$head = $('head');
        this.$header = $(`[data-common-component="${commonsC.header.name}"]`);
        this.$footer = $(`[data-common-component="${commonsC.footer.name}"]`);
        
    }

    cleanRootElement() {
        this.root.empty();
        return this.root.find('*').length === 0;
    }

    activeComponent(cScope) {
        this.addCustomAttrToBody('data-active-component', cScope);
        this.root.attr('data-scope', cScope);
    }

    checkActiveComponent(cScope) {
        return this.getCustomAttrFromBody('data-active-component') === cScope && this.root.attr('data-scope') === cScope;
    }

    renderMessage(cScope) {
        console.info(`${cScope} VIEW RENDERED SUCCESSFULLY`);
    }

    fireAfterDomLoad() {

    }


    addCustomAttrToBody(key, value) {
        this.$body.attr(key, value);
    }
    
    getCustomAttrFromBody(key) {
        return this.$body.attr(key);
    }

    screenResolution() {
        if (!this.checkEnv('production')) {
            let currentWindowWidth = this.$window.width();
            let currentWindowHeight = this.$window.height();
            let resolutionBox = $(`
            <div style="height:3rem; width:8rem; background:black; color:white; position:fixed; bottom:0; right:0; z-index:10000; line-height:3rem; text-align:center"> ${currentWindowHeight} x ${currentWindowWidth}</div>
            `);
            this.$body.append(resolutionBox);

            this.$body.on('resize', function () {
                currentWindowHeight = $(this).height();
                currentWindowWidth = $(this).width();
                resolutionBox.text(`${currentWindowHeight} x ${currentWindowWidth}`);
            });
        }
    }
}

export { Dom };
