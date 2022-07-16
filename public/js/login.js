window.post = function (url, data, method) {
    let headers = {
        'Content-Type': 'application/json'
    }
    headers['Authorization'] = `Bearer ${getJwtToken()}`
    return fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(data)
    });
}

function getJwtToken() {
    return sessionStorage.getItem("jwt")
}

function setJwtToken(token) {
    sessionStorage.setItem("jwt", token)
}

async function login() {
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    ret = await post("login", {
        username: name,
        password: password
    }, "POST")
    setJwtToken((await ret.json()).access_token)
    if (ret.ok == true) {
        document.location.replace("index");
    } else {
        document.querySelector(".error").innerHTML = "Username or password wrong"
    }
}

async function register() {
    const name = document.getElementById("register_name").value;
    const password = document.getElementById("register_password").value;
    ret = await post("register", {
        username: name,
        password: password
    }, "POST")
}

async function getRequest(url) {
    let headers = {
        'Content-Type': 'application/json'
    }
    headers['Authorization'] = `Bearer ${getJwtToken()}`
    return fetch(url, {
        method: "GET",
        headers: headers
    })
}