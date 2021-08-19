import Block from '../../core/Block';
import {render} from 'pug';
import {IComponentProps} from '../../core/interfaces';

const template = `div(class=className) #{child}`;

export default class Form extends Block implements IComponentProps {

    constructor(props: IComponentProps) {
        super('form', props);
    }

    render() {
        return render(template, this.props);
    }
}
