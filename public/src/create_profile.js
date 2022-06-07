const CREATE_PROFILE_CLASS = 'create-profile'

assembleCreateProfile()

function assembleCreateProfile() {
    var main = document.getElementsByTagName("main")[0]

    var create_profile = document.createElement("div")
    create_profile.classList.add(CREATE_PROFILE_CLASS)
    create_profile.classList.add("wrapper")
    main.appendChild(create_profile)

    assembleTitle(create_profile)
    assembleForm(create_profile)
}

function assembleTitle(elem) {
    var title = document.createElement("h1")
    title.innerHTML = "Create Your Profile"
    title.classList.add(CREATE_PROFILE_CLASS)
    elem.appendChild(title)
}

function assembleForm(elem) {
    var form = document.createElement("form")
    form.classList.add(CREATE_PROFILE_CLASS)
    elem.appendChild(form)

    assembleFormInput(form, "Username", "text")
    assembleFormInput(form, "Password", "text")
    assembleFormInput(form, "Name", "text")
    assembleFormInput(form, "Is Private", "checkbox")
    assembleFormInput(form, "Create Profile", "submit")
}

function assembleFormInput(form, name, type) {
    var identifier = "input-" + name.toLowerCase().replace(" ", "-")

    if (type != "submit") {
        var label = document.createElement("label")
        label.classList.add(CREATE_PROFILE_CLASS)
        label.setAttribute("for", identifier)
        label.innerHTML = name

        form.appendChild(label)
    }

    var input = document.createElement("input")
    input.classList.add(CREATE_PROFILE_CLASS)
    input.classList.add(type)
    input.id = identifier
    input.name = identifier
    input.type = type
    if (type === "submit") {
        input.value = name
    }
    form.appendChild(input)
}
