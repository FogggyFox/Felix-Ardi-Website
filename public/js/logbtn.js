function log(){
    var elem = document.getElementsByClassName("login button")
    if (elem.querySelector("input").value == "Login"){
        elem.querySelector("input").value = "Log Out"
    }
    else{
        elem.querySelector("input").value = "Login"
    }
}