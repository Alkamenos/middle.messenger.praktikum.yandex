export default `
div
    div.profile
        div.settings
            div.settings-title
                a(href="~/static/pages/chat/chat.pug").back-button
                    i(class="fa fa-chevron-left")
                span="Настройки"
            div.settings-user
                div.settings-user_avatar
                    img(src="~/static/images/avatars/lake.svg")
                div.settings-user_info
                    div._name="Вася Пупкин"
                    div._email="pupkintheone@yandex.ru"
            nav.settings-menu
                ul.settings-menu-items
                    


        div.content
            form(class="settings-general-form settings-form")
                div.user-avatar  
                div.settings-general-form_fields
                    input(data-child="firstNameField")
                    input(data-child="lastNameField")
                    input(data-child="emailField")
                    input(data-child="phoneField")
                    input(data-child="chatNameField")
                    div.form_controls
                        button(data-child="submitButton")


            form(class="settings-security-form settings-form")
                div.settings-general-form_fields
                   input(data-child="passwordField")
                   input(data-child="newPasswordField")
                   input(data-child="newPasswordRetypeField")
                   div.form_controls
                        a(data-child="submitPasswordButton")
                       



       
`;
