export default `
div.login-page
    form.login-form
        div
            h1.form-title="вход"
            input(data-child="emailField")
            input(data-child="passwordField")
            a(data-child="submitButton")
    div.registration
        div
            h3.form-title="регистрация"
            h5.form-sub-title="Создайте аккаунт"
            a(data-child="registrationButton") 
            

       
`;
