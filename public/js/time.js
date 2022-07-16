let startTime = 0;

(function () {
    startTime = (new Date).getTime();
})();

window.onload = function () {
    let endTime = (new Date).getTime();
    if (document.querySelector('footer') == null){
        var foot = document.createElement("footer");
        document.querySelector('body').appendChild(foot)
    }
    var elem = document.querySelector('footer div');
    var server = elem.textContent;
    elem.textContent = 'Время загрузки страницы: ' + (endTime - startTime) + 'ms.(клиент) +' + server;

    document.querySelector('body').addEventListener('click', function () {
        const c = document.querySelector('footer div').classList;
        c.add('close');
    });
}