const getJSON = async () => {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const response = await fetch(url);
    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }
    const posts = await response.json();
    return posts;
};

getJSON()
    .then((data) => {
        hidePreloader();
        let min_post_id = getRandomInt(1, data.length / 2);
        let max_post_id = getRandomInt(min_post_id, data.length);
        data.forEach((post) => {
            if (post.id >= min_post_id && post.id <= max_post_id) {
                createPost(post);
            }
        });
    })
    .catch((error) => {
        showError();
        hidePreloader();
        console.log(error)
    });

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hidePreloader() {
    let preloaderEl = document.getElementById('preloader');
    preloaderEl.classList.add('close');
}

function showError() {
    let error_elem = document.createElement("span");
    error_elem.innerText = "ERROR LOADING DATA";
    let main = document.getElementById("main");
    main.appendChild(error_elem);
}

function createPost(post) {
    let main = document.getElementById("main");
    let section = document.createElement("section");
    let p1 = document.createElement("p");
    p1.className = "post_info";

    let label_post = document.createElement("span");
    label_post.className = "label_post";
    label_post.innerText = "Post №";
    let post_id = document.createElement("span");
    post_id.className = "post_id";
    post_id.innerText = post.id;
    label_post.appendChild(post_id);
    p1.appendChild(label_post);

    let label_user_id = document.createElement("span");
    label_user_id.className = "label_user_id";
    label_user_id.innerText = "From userID: ";
    let user_id = document.createElement("span");
    user_id.className = "user_id";
    user_id.innerText = post.userId;
    label_user_id.appendChild(user_id);
    p1.appendChild(label_user_id);

    section.appendChild(p1);

    let p2 = document.createElement("p");
    p2.className = "naming";
    p2.innerText = post.title;
    section.appendChild(p2);

    let p3 = document.createElement("p");
    p3.className = "text_post";
    p3.innerText = post.body;
    section.appendChild(p3);

    main.appendChild(section);
}