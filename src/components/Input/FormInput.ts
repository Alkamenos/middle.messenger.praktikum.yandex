import Block from "../../core/Block";
import {render} from "pug";
import "./input.scss";
import {IComponentProps} from "../../core/interfaces";
import Input from "./Input";
import clsx from "clsx";

const template = `
!=input
div.form-input-line
span.form-input-helper!=helper
`;

export default class FormInput extends Block implements IComponentProps {
    constructor({
                    inputProps,
                    name,
                    type = 'text',
                    placeholder = '',
                    helper = '',
                    error = false,
                    ...props
                }: IComponentProps) {
        super('div', {
            ...props,
            helper,
            attributes: {
                ...props?.attributes,
                class: clsx('form-input', {'error': error}, props?.attributes?.class),
            },
            input: new Input({
                ...inputProps,
                attributes: {
                    ...inputProps?.attributes,
                    placeholder,
                    type,
                    name,
                },
            })
        });
    }

    setAttributes(attributes = this.props.attributes) {
        this.setProps({attributes: Object.assign(this.props.attributes, attributes)})
    }

    setError(value: boolean, helper:string) {
        this.setProps({
            helper,
            attributes: {...this.props.attributes, class: clsx(this.props.attributes.class.replace('error','').trim(), {'error': value})}
        })
    }

    render() {
        return render(template, {
            input: this.props.input.getContent(),
            helper: this.props.helper,
        });
    }
}
