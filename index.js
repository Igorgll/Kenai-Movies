function time() {
    today = new Date();
    h = today.getHours();
    m = today.getMinutes();

    if (h < 12) {
        document.getElementById('time').innerHTML= h + ':' + m + ' AM';
        setTimeout('time()', 500);
    }else {
        document.getElementById('time').innerHTML= h + ':' + m + ' PM';
        setTimeout('time()', 500);
    }
}