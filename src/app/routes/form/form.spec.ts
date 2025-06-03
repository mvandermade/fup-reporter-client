import {TestBed} from "@angular/core/testing";
import {App} from "../../app";
import {Form} from "./form";

describe('Form', () => {

    function createNewEvent(eventName: string, bubbles = false, cancelable = false) {
        let evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(eventName, bubbles, cancelable, null);
        return evt;
    }

    it('should create an instance', () => {
        const fixture = TestBed.createComponent(Form);

        const input = fixture.nativeElement.querySelector('input');
        const event = createNewEvent('input');
        input.value = 'Red';
        input.dispatchEvent(event);
        expect(fixture.componentInstance.favoriteColorControl.value).toEqual('Red');
    })

    it('should update the value in the control', () => {
        const fixture = TestBed.createComponent(Form);
        const component = fixture.componentInstance;

        component.favoriteColorControl.setValue('Blue');
        const input = fixture.nativeElement.querySelector('input');
        expect(input.value).toBe('Blue');
    });
})