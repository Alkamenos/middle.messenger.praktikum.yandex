import Block from '../../core/Block';
import {IComponentProps} from '../../core/interfaces';

export default class Form extends Block implements IComponentProps {
    constructor(props: IComponentProps) {
        super('form', props);
    }

    isValid(){
        return this.element.checkValidity();
    }

    render(): string {
        return '';
    }
}
