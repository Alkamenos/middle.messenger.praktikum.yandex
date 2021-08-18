import Block from "../../core/Block";
import {render} from "pug";
import {IComponentProps} from "../../core/interfaces";
import {Button} from "../Button";
import FormInput from "../Input/FormInput";
import "./UserForm.scss"
import {Input} from "../Input";
import {changeAvatar} from "../../services/user";

const template = `
div.personal-image
    label.label
        !=fileInput
        figure.personal-figure
            img(src!=avatar)
            figcaption.personal-figcaption
                i.fa.fa-camera
!=firstname
!=lastname
!=fullname
!=email
!=phone
!=login
!=submitButton

`;


export default class UserForm extends Block implements IComponentProps {

    constructor(props?: IComponentProps) {
        super("form", {
            ...props,
            title: "Информация о пользователе",
            avatar:null,
            children: {
                fileInput: new Input({
                    attributes:{
                        type:"file"
                    },
                }),
                submitButton: new Button({
                    child: "Сохранить",
                    type: 'submit',
                }),
                firstname: new FormInput({
                    placeholder: 'Имя',
                    name: 'first_name',
                }),
                lastname: new FormInput({
                    placeholder: 'Фамилия',
                    name: 'second_name',
                }),
                fullname: new FormInput({
                    placeholder: 'Полное имя',
                    name: 'display_name',
                }),
                email: new FormInput({
                    placeholder: 'Email',
                    name: 'email',
                }),
                phone: new FormInput({
                    placeholder: 'Телефон',
                    name: 'phone',
                }),
                login: new FormInput({
                    placeholder: 'Логин',
                    name: 'login',
                }),
            }
        });
    }

    componentDidMount() {
        this.props.children.fileInput.setProps({
            events:{
                change:(e)=>{
                    const fd = new FormData()
                    fd.append('avatar',e.currentTarget.files[0]);
                    changeAvatar(fd).then(data=>{
                        this.setProps({avatar:`https://ya-praktikum.tech/api/v2/resources/${data.avatar}`})
                    })
                }
            }
        })
    }

    render() {
        return render(template, {
            title: this.props.title,
            avatar: this.props.avatar,
            firstname: this.props.children.firstname.getContent(),
            lastname: this.props.children.lastname.getContent(),
            fullname: this.props.children.fullname.getContent(),
            email: this.props.children.email.getContent(),
            phone: this.props.children.phone.getContent(),
            login: this.props.children.login.getContent(),
            submitButton: this.props.children.submitButton.getContent(),
            fileInput: this.props.children.fileInput.getContent(),
        });
    }
}
