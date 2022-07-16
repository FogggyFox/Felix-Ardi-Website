function menu() {
    let navs = document.querySelector('header').querySelector('nav').querySelectorAll('a')
    navs.forEach(function(item, i, navs){
        if (item.href.toString() == document.location.href.toString()){
            const c = item.classList;
            c.toggle('active');
        } 
    }); 
};


