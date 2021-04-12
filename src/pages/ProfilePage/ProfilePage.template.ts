export default `
mixin avatar(src)
    div.avatar-wrapper
        input.file-upload(type="file" accept="image/*" id="upload")
        label(for="upload")
            img.profile-pic(src=src)

mixin menuItem(name, icon, active)
    li(class="menu-item")
        button(class=active ? "menu-item-button _active" : "menu-item-button")&attributes(attributes)
            div._icon
                i(class=icon)
            div._title=name
            div._chevron
                i(class="fa fa-chevron-right")



block content
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
                    +menuItem("Основные", "fa fa-cog", true)(data-tab="general")
                    +menuItem("Безопасность", "fa fa-shield")(data-tab="security")


        div.content
            form(class="settings-general-form settings-form")
                div.user-avatar
                    +avatar("~/static/images/avatars/lake.svg")
                div.settings-general-form_fields
                    +formInput("Имя", "Вася")(name='first_name')
                    +formInput("Фамилия","Пупкин", "Пупкин придуманный персонаж", true)(name='second_name')
                    +formInput("Email","pupkintheone@yandex.ru")(name='email')
                    +formInput("Телефон", "+70001212312")(name='phone')
                    +formInput("Имя в чате", "@masha18", "Имя обязательно должно быть классное")(name='display_name')
                    div.form_controls
                        +primaryButton('Сохранить')


            form(class="settings-security-form settings-form")
                div.settings-general-form_fields
                    +formInput("Текущий пароль")(type="password", name="oldPassword")
                    +formInput("Новый пароль")(type="password", name="newPassword")
                    +formInput("Повторите пароль")(type="password", name="retypedPassword")
                    div.form_controls
                        +primaryButton('Сохранить')



       
`;
