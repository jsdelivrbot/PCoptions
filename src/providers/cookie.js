function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            let c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}
// function checkCookie()
// {
//     let username=getCookie('username')
//     if (username!=null && username!="")
//     {alert('Welcome again '+username+'!')}
//     else 
//     {
//     username=prompt('Please enter your name:',"")
//     if (username!=null && username!="")
//         {
//         setCookie('username',username,365)
//         }
//     }
// }
export default {
    setCookie,
    getCookie,
    // checkCookie
}