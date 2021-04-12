export default `
div.registration-page
    form.registration-form
        div
            h1.form-title="регистрация"
            h3.form-sub-title="Создайте учетную запись пользователя"
            input(data-child="firstNameField")
            input(data-child="lastNameField")
            input(data-child="emailField")
            input(data-child="phoneField")
            input(data-child="chatNameField")
            button(data-child="submitButton") 

    div.login
        div
            h4.form-title="вход"
            h5.form-sub-title="Если есть аккаунт"
            button(data-child="loginButton") 
         

       
`;
