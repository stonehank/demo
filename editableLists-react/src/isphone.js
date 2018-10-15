let isPhone;

isPhone=/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry|AppleWebKit.*Mobile|.*Mobile/i
        .test(navigator.userAgent)
    || /SymbianOS|MeeGo|MIDP|NOKIA|SAMSUNG|LG|NEC|TCL|UCBrowser|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/
        .test(navigator.userAgent)


export default isPhone;