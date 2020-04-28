/* Cookies functions */
window.Cookies = {
    set:function(cookieName, cookieValue, cookieExpireFormat=null, cookiePath="/") {
        //"=checked; expires=Thu, 18 Dec 2050 12:00:00 UTC; path=/"
        var datetimeCookieFormat = "";
        if(cookieExpireFormat==null) {
            datetimeCookieFormat = "Thu, 18 Dec 2050 12:00:00 UTC";
        } else if(cookieExpireFormat instanceof Date) {
            datetimeCookieFormat = getDayName(cookieExpireFormat.getDay())+", "+cookieExpireFormat.getDate()+" "+getMonthName(cookieExpireFormat.getMonth())+" "+cookieExpireFormat.getFullYear()+" "+cookieExpireFormat.getHours()+":"+cookieExpireFormat.getMinutes()+":"+cookieExpireFormat.getSeconds()+" UTC";
        }
        document.cookie = cookieName+"="+cookieValue+";expires="+datetimeCookieFormat+";path="+cookiePath;
    },
    get:function(entries) {
        if(Array.isArray(entries)) {
            var cookiesArr = (document.cookie).split(";"), cookiesCollection = {};
            for(cookiePair of cookiesArr) {
                var cookieParam = cookiePair.split("=");
                cookieParam[0] = cookieParam[0].replace(/^\s+/,"");
                if(entries.includes(cookieParam[0])) cookiesCollection[cookieParam[0]] = cookieParam[1];

            }
            return cookiesCollection;
        } else if(typeof entries=="string") {
            var cookiesArr = (document.cookie).split(";"), cookiesCollection = {};
            for(cookiePair of cookiesArr) {
                var cookieParam = cookiePair.split("=");
                cookieParam[0] = cookieParam[0].replace(/^\s+/,"");
                if(entries==cookieParam[0]) cookiesCollection[cookieParam[0]] = cookieParam[1];
            }
            return cookiesCollection;
        } else return null;
     },
    getAll:function() {
        var cookiesArr = (document.cookie).split(";"), cookiesAll = {};
        for(cookiePair of cookiesArr) {
            var cookieParam = cookiePair.split("=");
            cookieParam[0] = cookieParam[0].replace(/^\s+/,"");
            cookiesAll[cookieParam[0]] = cookieParam[1];
        }
        return cookiesAll;
    },
    clear:function(cookieName) {
        document.cookie = cookieName+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
    }
}
