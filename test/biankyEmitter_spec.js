import { biankyEmitter } from '../src/index';
import chai from 'chai';


const expect = chai.expect;
const emitter = new biankyEmitter();
const eventName = 'test';


describe('REGISTERING EVENTS', () => {

    it('NUMBER OF REGISTERED EVENTS EQUAL TO NUMBER OF EVENTS-OBJECT INTO EMITTER INSTANCE ', () => {
        emitter.subscribe(eventName, () => 'test event callback function', res => console.log(res));

        emitter.subscribe('hello', function(name) {
            return 'hello' + name;
        });


        expect(emitter.events[eventName]).to.have.lengthOf(1); 
    });


    it('RETURN VALUE FROM EVENT-CALLBACK FUNCTION EQUAL WITH TESTED VALUE', () => {
        expect(emitter.events[eventName][0].handler()).to.be.equal('test event callback function');
    });


    it('HANDLER ID OF FIRST-HANDLER AT EVENT EQ 0', () => {
        expect(emitter.events[eventName][0].id).to.be.a('number').to.be.equal(0);
    });
});


describe ('UNREGISTERED EVENTS', () => {
    it('SHOULD RETURN STATE EQ DONE WHEN UNSUBSCRIBE FOUNDED EVENT', () => {
        emitter.unsubscribe(eventName, res => expect(res.state).to.be.equal('DONE'));
    });

    it('SHOULD RETURN STATE EQ FAIL WHEN UNSUBSCRIBE UNFOUNDED EVENT', () => {
        emitter.unsubscribe(`${eventName}ss`, res => { 
            console.log(res);
            expect(res.state).to.be.equal('FAIL'); 
        });
    });
});

