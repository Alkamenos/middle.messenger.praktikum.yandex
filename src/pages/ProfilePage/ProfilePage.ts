import Block from '../../core/Block';
import {render} from 'pug';
import {IComponentProps} from '../../core/interfaces';
import {Button} from '../../components/Button';
import './ProfilePage.scss';
import {register, user} from "../../services/auth";
import Router from "../../utils/Router";
import {RegistrationForm} from "../../components/RegistrationForm";
import {UserForm} from "../../components/UserForm";
import {PasswordForm} from "../../components/PasswordForm";
import {changeProfile, changePassword} from "../../services/user";

const template = `
div.profile
             
    div.content
        !=userForm
        !=passwordForm

`;

export default class ProfilePage extends Block {
  constructor(props?: IComponentProps) {
    super("div", {
      ...props,
      children: {
        userForm: new UserForm({
          attributes: {
            class: 'user-form',
          },
        }),
        passwordForm: new PasswordForm({
          attributes: {
            class: 'password-form',
          },
        }),
      },
    });


  }

  componentDidMount() {
    user().then(res=>{
      this.element.querySelector('[name="first_name"]').value=res.first_name;
      this.element.querySelector('[name="second_name"]').value=res.second_name;
      this.element.querySelector('[name="display_name"]').value=res.display_name;
      this.element.querySelector('[name="email"]').value=res.email;
      this.element.querySelector('[name="phone"]').value=res.phone;
      this.element.querySelector('[name="login"]').value=res.login;
      this.props.children.userForm.setProps({avatar:`https://ya-praktikum.tech/api/v2/resources/${res.avatar}`})
    })
    this.props.children.userForm.setProps({
      events: {
        submit: async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const data = Object.fromEntries(formData.entries())
          console.log(data);
          try {
            await changeProfile(data)
            // Router.getInstance().go("/messenger");
          } catch (e) {
            this.props.children.userForm.props.children.login.setError(true, 'Неверная комбинация');
          }
        }
      },
    });
    this.props.children.passwordForm.setProps({
      events: {
        submit: async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const data = Object.fromEntries(formData.entries())
          console.log(data);
          try {
            await changePassword(data)
            // Router.getInstance().go("/messenger");
          } catch (e) {
            this.props.children.form.props.children.login.setError(true, 'Неверная комбинация');
          }
        }
      },
    })
  }


  render() {
    return render(template, {
      userForm: this.props.children.userForm.getContent(),
      passwordForm: this.props.children.passwordForm.getContent()
    });
  }

}
