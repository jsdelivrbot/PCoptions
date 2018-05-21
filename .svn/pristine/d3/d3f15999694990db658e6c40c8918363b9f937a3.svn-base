import { OnInit, ElementRef, Renderer2, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ElSelectPoprs } from './select-props';
import { ControlValueAccessor } from '@angular/forms';
export declare class ElSelect extends ElSelectPoprs implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {
    private el;
    private renderer;
    selfWidth: string;
    subscriber: Function[];
    dropdownActive: boolean;
    selectedLabel: string | number;
    iconClass: string;
    globalListener: Function;
    constructor(el: ElementRef, renderer: Renderer2);
    mouseHandle(isEnter?: boolean): void;
    toggleHandle(event?: Event): void;
    clearSelected(event: Event): void;
    changeLabel(nextLabel: string | number, nextValue?: any): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    private controlChange;
    private controlTouch;
}
