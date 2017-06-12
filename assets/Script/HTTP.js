var url = 'http://192.168.3.157:8080/game-collection-server/ws/rest';
var xhr = new XMLHttpRequest();
module.exports = {
    send:function(msg){
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                console.log(response);
            }
        };
        xhr.open("POST", url + '?' + msg, true);
        xhr.send();
    },
    close:function(){
        xhr.close();
    },

};