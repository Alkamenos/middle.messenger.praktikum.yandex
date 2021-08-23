import {render} from 'pug';
import Block from '../../core/Block';
import {IComponentProps} from '../../core/interfaces';
import './input.scss';

export default class Input extends Block implements IComponentProps {
    constructor(props: IComponentProps) {
        super('input', {
            ...props,
        });
    }

    render() {
        return render('', {});
    }
}
