export default `
ul.index-main-menu
        li
            a(data-child="chat" href='pages/chat/chat.pug') Chat
        li
            a(data-child="profile" href='pages/profile/profile.pug') Profile
        li
            a(data-child="login" href='pages/login/login.pug') Login
        li
            a(data-child="registration" href='pages/registration/registration.pug') Registration
        li
            a(data-child="500" href='pages/errors/500.pug') 500
        li
            a(data-child="404" href='pages/errors/404.pug') 404
`;
