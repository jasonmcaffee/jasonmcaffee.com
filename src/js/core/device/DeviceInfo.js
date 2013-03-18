define([
    'core/util/log',
    'jquery'
], function(log, $){
    log('DeviceInfo module loaded');

    /**
     *
     * @param - userAgent - navigator.userAgent
     * @param - vendor - navigator.vendor
     * @param - opera - window.opera
     * @param - platform - navigator.platform
     */
    function detectDesktop(userAgent, vendor, opera, platform){

        function searchString (data) {
            for (var i=0;i<data.length;i++)    {
                var dataString = data[i].string;
                var dataProp = data[i].prop;
                this.versionSearchString = data[i].versionSearch || data[i].identity;
                if (dataString) {
                    if (dataString.indexOf(data[i].subString) != -1)
                        return data[i].identity;
                }
                else if (dataProp){
                    return data[i].identity;
                }
            }
        }
        function searchVersion(dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1) return;
            return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
        }
        var dataBrowser = [
            {
                string: userAgent,
                subString: "Chrome",
                identity: "Chrome"
            },
            {
                string: userAgent,
                subString: "OmniWeb",
                versionSearch: "OmniWeb/",
                identity: "OmniWeb"
            },
            {
                string: vendor,
                subString: "Apple",
                identity: "Safari",
                versionSearch: "Version"
            },
            {
                prop: opera,
                identity: "Opera",
                versionSearch: "Version"
            },
            {
                string: vendor,
                subString: "iCab",
                identity: "iCab"
            },
            {
                string: vendor,
                subString: "KDE",
                identity: "Konqueror"
            },
            {
                string: userAgent,
                subString: "Firefox",
                identity: "Firefox"
            },
            {
                string: vendor,
                subString: "Camino",
                identity: "Camino"
            },
            {        // for newer Netscapes (6+)
                string: userAgent,
                subString: "Netscape",
                identity: "Netscape"
            },
            {
                string: userAgent,
                subString: "MSIE",
                identity: "Explorer",
                versionSearch: "MSIE"
            },
            {
                string: userAgent,
                subString: "Gecko",
                identity: "Mozilla",
                versionSearch: "rv"
            },
            {         // for older Netscapes (4-)
                string: userAgent,
                subString: "Mozilla",
                identity: "Netscape",
                versionSearch: "Mozilla"
            }
        ];
        var dataOS = [
            {
                string: platform,
                subString: "Win",
                identity: "Windows"
            },
            {
                string: platform,
                subString: "Mac",
                identity: "Mac"
            },
            {
                string: userAgent,
                subString: "iPhone",
                identity: "iPhone/iPod"
            },
            {
                string: platform,
                subString: "Linux",
                identity: "Linux"
            }
        ];

        var device = {
            browser : searchString(dataBrowser) || "unknown-browser",
            browserVersion: searchVersion(userAgent) || "unknown-version",
            os: searchString(dataOS) || "unknown-os"
        };
        return device;
    }

    function detectMobile(ua){
        var device = {
            os: null,
            browser : null,
            browserVersion : null
        };

        var webkit = ua.match(/WebKit\/([\d.]+)/),
            android = ua.match(/(Android)\s+([\d.]+)/),
            ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
            iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
            webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
            touchpad = webos && ua.match(/TouchPad/),
            kindle = ua.match(/Kindle\/([\d.]+)/),
            silk = ua.match(/Silk\/([\d._]+)/),
            blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/);

        //todo: test this more. is android flagged as webkit?
        //if (!!webkit){
        //device.browserVersion = webkit[1];
        //device.browser = 'webkit-generic';
        //device.os = 'unknown';
        //}

        if(android){
            device.os = 'android';
            if(ua.indexOf('Chrome') >= 0){
                device.browser = 'android-chrome';
            }else{
                device.browser = 'android';
            }
            device.browserVersion = android[2];
        }

        if(iphone){
            device.os = 'ios';
            device.browser = 'iphone';
            device.browserVersion = iphone[2].replace(/_/g, '.');
        }

        if(ipad){
            device.os = 'ios';
            device.browser = 'ipad';
            device.browserVersion = ipad[2].replace(/_/g, '.');
        }

        if(webos){
            device.os = 'webos';
            device.browser = 'webos';
            device.browserVersion = webos[2];
        }

        if(touchpad){
            device.os = 'webos';
            device.browser = 'touchpad';
            device.browserVersion = webos[2];
        }

        if(kindle){
            device.os = 'android';
            device.browser = 'kindle';
            device.browserVersion = kindle[1];
        }

        if(silk){
            device.os = 'android';
            device.browser = 'kindle-silk';
            device.browserVersion = silk[1];
            //todo: if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
        }

        if(blackberry){
            device.os = 'blackberry';
            device.browser = 'blackberry';
            device.browserVersion = blackberry[2];
        }

        return device;
    }

//return -1 if v1 is less than v2.
//return 0 if equal.
//return 1 if v1 > v2.
    function compareOSVersions(v1, v2){
        v1 = v1 + '';//make sure these are strings
        v2 = v2 + '';
        //first split into parts
        var v1Parts = v1.split('.');
        var v2Parts = v2.split('.');
        //we'll only compare up to 3 '.'
        var v1Part1 = parseInt(v1Parts[0])||0; //don't let the value be NaN since we can't compare NaN
        var v1Part2 = parseInt(v1Parts[1])||0;
        var v1Part3 = parseInt(v1Parts[2])||0;
        var v2Part1 = parseInt(v2Parts[0])||0;
        var v2Part2 = parseInt(v2Parts[1])||0;
        var v2Part3 = parseInt(v2Parts[2]) ||0;
        //compare the first part
        if(v1Part1 < v2Part1){return -1;}
        if(v1Part1 > v2Part1){return 1;}
        //if we made it this far, compare the second part
        if(v1Part2 < v2Part2){return -1;}
        if(v1Part2 > v2Part2){return 1;}

        if(v1Part3 < v2Part3){return -1;}
        if(v1Part3 > v2Part3){return 1;}

        return 0;
    }

    function generateCssClassNames(deviceInfo){

        function convertVersionToCssFriendlyName(version){
            if(version){
                version = version + '';//make it a string.
                version = version.replace(/\./g,'_');
            }
            return version;
        }

        var cssClassNames = deviceInfo.browser + ' ' + deviceInfo.browser + '-' + convertVersionToCssFriendlyName(deviceInfo.browserVersion) + ' ';

        //we will add additional version info classes for each item found in this object.
        var deviceBrowserAndVersions = {
            android : ['2.2','2.2.1','2.2.2','2.2.3','2.3','2.3.1','2.3.2','2.3.3','2.3.4','2.3.5','2.3.6', '2.3.7', '3.0','3.1','3.2','3.2.1','3.2.2',
                '3.2.3','3.2.4','3.2.5','3.2.6','4.0', '4.0.4', '4.1', '4.2'],
            iphone: ['4.0','4.0.1','4.0.2','4.1','4.2','4.2.1','4.2.5','4.2.6','4.2.7','4.2.8','4.2.9','4.2.10','4.3','4.3.1','4.3.2','4.3.3','4.3.4','4.3.5',
                '5.0','5.0.1','5.1','5.1.1','6.0','6.0.1','6.1'],
            ipad: ['3.2','4.3','5.1','6.0'],
            Chrome: ['19', '18', '17', '16', '15', '14', '13'],
            Opera: [],
            Firefox: []
        };


        for(var browser in deviceBrowserAndVersions){
            if(browser === deviceInfo.browser){
                log('adding additional version classes for ' + browser);
                var versions = deviceBrowserAndVersions[browser];
                for(var i=0; i<versions.length; ++i){
                    var version = versions[i];
                    var result = compareOSVersions(deviceInfo.browserVersion, version);
                    if(result == -1){
                        cssClassNames += deviceInfo.browser +'-lt-' + convertVersionToCssFriendlyName(version) + ' ';
                    }else if(result == 1){
                        cssClassNames += deviceInfo.browser + '-gt-' + convertVersionToCssFriendlyName(version) + ' ';
                    }
                }
            }

        }

        return cssClassNames;
    }



    /**
     *
     * @param - userAgent - navigator.userAgent
     * @param - vendor - navigator.vendor
     * @param - opera - window.opera
     * @param - platform - navigator.platform
     */
    function detect(userAgent, vendor, opera, platform){
        var device = detectMobile(userAgent);
        if(!device.os){
            log('mobile not detected. looking for desktop info');
            device = detectDesktop(userAgent, vendor, opera, platform);
        }
        return device;
    }

    var deviceInfo = detect(navigator.userAgent, navigator.vendor, window.opera, navigator.platform);

    log('deviceInfo is : ' + deviceInfo.browser + ' : ' + deviceInfo.browserVersion + ' : ' + deviceInfo.os);
    log('css class names : ' + generateCssClassNames(deviceInfo));

    deviceInfo.addBrowserInfoCssClassToHtml = function(){
        var cssClassNames = generateCssClassNames(deviceInfo);
        $(function(){
            $('html').addClass(cssClassNames);
        });
    };
    return deviceInfo;

});