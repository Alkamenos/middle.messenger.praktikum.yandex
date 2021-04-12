export default `
div
    div.chat
        section.chat-contacts
            div.contacts-profile-link
                a(href="/pages/profile")._link
                    span._text Профиль
                    span
                        i(class="fa fa-chevron-right")._icon
            div.contacts-search
                input(placeholder= '  Поиск').search-input
            ul.contacts-list
                li(data-child="contact")

        section.chat-messages
            ul.messages
                li(data-child="message")
                li(data-child="imageMessage")

        section.chat-header
            div.content
                div.avatar.deer
                span="Steve Rogers"
                div.menu
                    i(class="fa fa-ellipsis-v")


        form.chat-input-message
            div.content
                button._attach
                    i(class="fa fa-paperclip")
                input(placeholder="Сообщение" name="message")._input
                button(type="submit")._send
                    i(class="fa fa-long-arrow-right")


    
`;
