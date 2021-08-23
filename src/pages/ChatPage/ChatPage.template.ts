export default `
div
    div.chat
        section.chat-contacts
            div.contacts-profile-link
                a(href="/settings")._link
                    span._text Профиль
                    span
                        i(class="fa fa-chevron-right")._icon
            div.contacts-search
                input(placeholder= '  Поиск').search-input
            ul(data-child="contacts")
                

        section.chat-messages
            div(data-child="messages")

        section.chat-header
            div.content
                div.avatar.deer
                span="Steve Rogers"
                div.menu
                    i(class="fa fa-ellipsis-v")
        div(data-child="messageInput")`;