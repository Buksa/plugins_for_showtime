/**
 * Very simple plugin 
 */

(function(plugin) {
    function base64_decode(data) { // http://kevin.vanzonneveld.net
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            ac = 0,
            dec = "",
            tmp_arr = [];
        if (!data) {
            return data;
        }
        data += '';
        do { // unpack four hexets into three octets using index points in b64
            h1 = b64.indexOf(data.charAt(i++));
            h2 = b64.indexOf(data.charAt(i++));
            h3 = b64.indexOf(data.charAt(i++));
            h4 = b64.indexOf(data.charAt(i++));
            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
            o1 = bits >> 16 & 0xff;
            o2 = bits >> 8 & 0xff;
            o3 = bits & 0xff;
            if (h3 == 64) {
                tmp_arr[ac++] = String.fromCharCode(o1);
            } else if (h4 == 64) {
                tmp_arr[ac++] = String.fromCharCode(o1, o2);
            } else {
                tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
            }
        } while (i < data.length);
        dec = tmp_arr.join('');
        return dec;
    }

    function unhash(hash, hash1, hash2) {
        hash = "" + hash;
        for (var i = 0; i < hash1.length; i++) {
            hash = hash.split(hash1[i]).join('--');
            hash = hash.split(hash2[i]).join(hash1[i]);
            hash = hash.split('--').join(hash2[i]);
        }
        //showtime.print(base64_decode(hash));
        return base64_decode(hash);
    }
    plugin.addURI("kinostok:(.*)", function(page, url, title) {
        var hash1 = "Ddaf4bI7i6XeRNZ3ToJcHmlv5E",
            hash2 = "YWyzpnxMu90Ltwk2GUQBsV81g=";

showtime.print(unhash('ystXBYU1e27feVR4nV6fWT6rebt3e3kHWulpwY8jkj5NDjBaOYBgkjoakjtukjFjwfZIwfhuwjh87C6vBTI1Ddt8kF63ydt8na63ydt8nala7ala7fZXefxfOGJv7ula7fZXwGxin0AX',hash1, hash2))
        var v = showtime.httpReq('http://' + url).toString().match(/flashvar[\s\S]*file: "(.*?)"/)[1]
        page.loading = true;
        page.type = "video";
        page.source = "videoparams:" + showtime.JSONEncode({
            title: url,
            sources: [{
                url: unhash(v, hash1, hash2)
            }]
        });
        page.loading = false;
    });

})(this);
