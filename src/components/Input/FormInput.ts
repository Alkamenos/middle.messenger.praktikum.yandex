import clsx from 'clsx';
import {render} from 'pug';
import Block from '../../core/Block';
import {IComponentProps} from '../../core/interfaces';
import Input from './Input';
import './input.scss';

const template = `
!=input
div.form-input-line
span.form-input-helper!=helper
`;

export default class FormInput extends Block implements IComponentProps {
    constructor({
                    inputProps, name, placeholder = '', helper = '', error = false, ...props
                }: IComponentProps) {
        super('div', {
            ...props,
            helper,
            attributes: {
                ...props?.attributes,
                class: clsx('form-input', {'error': error}, props?.attributes?.class),
            },
            children: {
                input: new Input({
                    ...inputProps,
                    attributes: {
                        ...inputProps?.attributes,
                        placeholder,
                        name,
                    },
                }),
            },
        });
    }

    componentDidMount() {
        this.props.children.input.setProps({
            events: {
                blur: (e:Event) => {

                    // @ts-ignore
                    this.setError(...this.checkValid(e.currentTarget));
                },
            },
        });
    }

    setAttributes(attributes = this.props.attributes) {
        this.setProps({attributes: {...this.props.attributes, attributes}});
    }

    setError(value: boolean, helper: string) {
        this.setProps({
            helper,
            attributes: {
                ...this.props.attributes,
                class: clsx(this.props.attributes.class.replace('error', '').trim(), {'error': value}),
            },
        });
    }

    checkValid({validity, type}:{validity:ValidityState, type:string}) {
        if (validity.valid) {
            return [false, ''];
        } else if (validity.valueMissing) {
            return [true, 'Обязательно для заполнения'];
        } else if (validity.tooShort) {
            return [true, 'Слишком короткое'];
        } else if (validity.tooLong) {
            return [true, 'Слишком длинное'];
        } else if (validity.patternMismatch) {
            switch (type) {
                case 'tel':
                    return [true, 'Введите номер телефона в формате +71234567890'];
                case 'email':
                    return [true, 'Введите email'];
                default:
                    return [true, 'Неправильный формат'];
            }
        }


    }

    render() {
        return render(template, {
            input: this.props.children.input.getContent(),
            helper: this.props.helper,
        });
    }
}
