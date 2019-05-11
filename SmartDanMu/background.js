// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


// function parse(dom, tabid, S, D) {
//     generate_ctx(tabid);
//     FORCELIST_len = FORCELIST_ctx.length;
//     WHITELIST_len = WHITELIST_ctx.length;
//     BLACKLIST_len = BLACKLIST.length;
//     var start_time = +new Date();
//     function make_peers_node(obj, reason) {
//         return {
//             attr: obj.attr,
//             time: obj.time,
//             orig_str: obj.orig_str,
//             mode: obj.mode,
//             reason: reason
//         };
//     }
//     function enlarge(count) {
//         if (count <= 5) return 1; else {
//             S.enlarge++;
//             return Math.log(count) / MATH_LOG5;
//         }
//     }
//     var _get_width_cvs = document.createElement("canvas");
//     function get_width_if_exceeds(text, size, threshold) {
//         if (text.length * size < threshold) return 0;
//         var ctx = _get_width_cvs.getContext("2d");
//         ctx.font = parseInt(size) + "pt 黑体";
//         return ctx.measureText(text.replace(/\/n/g, "")).width;
//     }
//     function make_mark(txt, cnt) {
//         function make_cnt(cnt) {
//             if (DANMU_SUBSCRIPT) return "₍" + to_subscript(cnt) + "₎"; else return "[x" + cnt + "]";
//         }
//         return DANMU_MARK == "suffix" ? txt + make_cnt(cnt) : DANMU_MARK == "prefix" ? make_cnt(cnt) + txt : txt;
//     }
//     function detaolu(inp) {
//         var len = inp.length;
//         var text = "";
//         if (TRIM_ENDING) {
//             while (ENDING_CHARS[inp.charAt(len - 1)] !== undefined) len--;
//             if (len == 0) len = inp.length;
//         }
//         for (var i = 0; i < len; i++) {
//             var to = TRIM_WIDTH ? WIDTH_TABLE[inp.charAt(i)] : undefined;
//             if (to !== undefined) text += to; else text += inp.charAt(i);
//         }
//         if (TRIM_SPACE) text = text.replace(trim_space_re, " ");
//         for (var i = 0; i < FORCELIST_len; i++) if (FORCELIST_ctx[i][0].test(text)) {
//             S.taolu++;
//             return text.replace(new RegExp(FORCELIST_ctx[i][0], "g"), FORCELIST_ctx[i][1]);
//         }
//         return text;
//     }
//     function whitelisted(text) {
//         for (var i = 0; i < WHITELIST_len; i++) if (WHITELIST_ctx[i][0].test(text)) return true;
//         return false;
//     }
//     function blacklisted(text) {
//         for (var i = 0; i < BLACKLIST_len; i++) if (BLACKLIST[i][0].test(text)) return true;
//         return false;
//     }
//     function ext_special_danmu(text) {
//         try {
//             text = JSON.parse(text)[4];
//         } catch (e) {}
//         return text.replace(/\/n/g, "");
//     }
//     function build_text(elem) {
//         var count = elem.peers.length;
//         var dumped = null;
//         if (elem.mode == "7") try {
//             dumped = JSON.parse(elem.orig_str);
//         } catch (e) {}
//         if (dumped) {
//             dumped[4] = count <= MARK_THRESHOLD ? dumped[4] : make_mark(elem.str, count);
//             elem.disp_str = dumped[4];
//             return JSON.stringify(dumped);
//         } else return elem.disp_str = count <= MARK_THRESHOLD ? elem.orig_str : make_mark(elem.str, count);
//     }
//     function dispval(dm) {
//         return Math.sqrt(dm.disp_str.length) * Math.pow(Math.min(dm.size / 25, 2.5), 1.5);
//     }
//     function trim_pinyin(s) {
//         return Array.from(s.toLowerCase()).map(function(c) {
//             return PINYIN_TABLE[c] || c;
//         }).join("");
//     }
//     var parser = new DOMParser();
//     var new_dom = parser.parseFromString("<i></i>", "text/xml");
//     var i_elem = new_dom.childNodes[0];
//     function apply_danmu(elem, desc, peers, dispstr) {
//         S.onscreen++;
//         i_elem.appendChild(elem);
//         D.push({
//             text: dispstr || elem.textContent,
//             desc: desc,
//             xml_src: elem.outerHTML,
//             peers: peers || []
//         });
//     }
//     (function(date) {
//         if (_ADVANCED_USER && !TEST_MODE && 1 + date.getMonth() == 3 && date.getDate() == 20) {
//             var d = new_dom.createElement("d");
//             var tn = new_dom.createTextNode("/* 英梨梨生日快乐 */");
//             var attr = [ "0", "8", "0", "11135770", Math.floor(+new Date() / 1e3), "0", "91d6b7d0", "0" ];
//             var peer = {
//                 attr: attr,
//                 time: 0,
//                 orig_str: "英梨梨是我的，你们都不要抢。",
//                 mode: "8",
//                 reason: "PAKKU"
//             };
//             d.appendChild(tn);
//             d.setAttribute("p", attr.join(","));
//             apply_danmu(d, [ "3月20日是知名同人画师柏木英理（澤村・スペンサー・英梨々，泽村·斯潘塞·英梨梨）的生日。" ], Array(20).fill(peer));
//             S.onscreen--;
//         }
//     })(new Date());
//     var danmus = [], out_danmus = [];
//     [].slice.call(dom.childNodes[0].children).forEach(function(elem) {
//         if (elem.tagName === "d") {
//             S.total++;
//             var attr = elem.attributes["p"].value.split(",");
//             var str = elem.childNodes[0] ? elem.childNodes[0].data : "";
//             var mode = attr[1];
//             var disp_str = mode === "7" ? ext_special_danmu(str) : str.replace(/\/n/g, "");
//             var detaolued = detaolu(disp_str);
//             var str_pinyin = TRIM_PINYIN ? trim_pinyin(detaolued) : null;
//             var dm_obj = {
//                 attr: attr,
//                 str: detaolued,
//                 orig_str: str,
//                 disp_str: disp_str,
//                 str_pinyin: str_pinyin,
//                 str_2gram: gen_2gram_array(str),
//                 time: parseFloat(attr[0]),
//                 mode: mode,
//                 size: parseFloat(attr[2]),
//                 desc: [],
//                 peers: [],
//                 self_dispval: null
//             };
//             if (!PROC_POOL1 && attr[5] === "1") {
//                 S.batch_ignore++;
//                 apply_danmu(elem, [ "已忽略字幕弹幕，可以在选项中修改" ], [ make_peers_node(dm_obj, "IGN") ], disp_str);
//                 return;
//             }
//             if (mode !== "8" && mode !== "9" && blacklisted(disp_str)) {
//                 S.blacklist++;
//                 return;
//             }
//             if (!PROC_TYPE7 && mode === "7") {
//                 S.batch_ignore++;
//                 apply_danmu(elem, [ "已忽略特殊弹幕，可以在选项中修改" ], [ make_peers_node(dm_obj, "IGN") ], disp_str);
//                 return;
//             }
//             if (!PROC_TYPE4 && mode === "4") {
//                 S.batch_ignore++;
//                 apply_danmu(elem, [ "已忽略底部弹幕，可以在选项中修改" ], [ make_peers_node(dm_obj, "IGN") ], disp_str);
//                 return;
//             }
//             if (mode === "8") {
//                 if (REMOVE_SEEK && str.indexOf("Player.seek(") !== -1) {
//                     S.player_seek++;
//                     elem.childNodes[0].data = "/*! 已删除跳转脚本: " + str.replace(/\//g, "|") + " */";
//                 }
//                 S.script++;
//                 apply_danmu(elem, [ "代码弹幕" ], [ make_peers_node(dm_obj, "IGN") ]);
//                 return;
//             }
//             if (mode === "9") {
//                 S.script++;
//                 apply_danmu(elem, [ "BAS弹幕" ], [ make_peers_node(dm_obj, "IGN") ]);
//                 return;
//             }
//             if (whitelisted(disp_str)) {
//                 S.whitelist++;
//                 apply_danmu(elem, [ "命中白名单" ], [ make_peers_node(dm_obj, "IGN") ], disp_str);
//                 return;
//             }
//             danmus.push(dm_obj);
//             return;
//         } else i_elem.appendChild(elem);
//     });
//     danmus.sort(function(x, y) {
//         return x.time - y.time;
//     });
//     var danmu_chunk = Array();
//     danmus.forEach(function(dm) {
//         while (danmu_chunk.length && dm.time - danmu_chunk[0].time > THRESHOLD) out_danmus.push(danmu_chunk.shift());
//         if (LOG_VERBOSE) console.log(dm.attr[7], dm.str);
//         for (var i = 0; i < danmu_chunk.length; i++) {
//             var another = danmu_chunk[i];
//             if (!CROSS_MODE && dm.mode != another.mode) continue;
//             var sim = similar_memorized(dm.str, another.str, dm.str_2gram, another.str_2gram, dm.str_pinyin, another.str_pinyin, S);
//             if (sim !== false) {
//                 if (LOG_VERBOSE) {
//                     console.log(sim, dm.attr[7], "to", another.attr[7]);
//                 }
//                 another.peers.push(make_peers_node(dm, sim));
//                 if (MODE_ELEVATION && (dm.mode == "4" && (another.mode == "5" || another.mode == "1") || dm.mode == "5" && another.mode == "1")) {
//                     another.mode = dm.mode;
//                 }
//                 return;
//             }
//         }
//         dm.peers.push(make_peers_node(dm, "ORIG"));
//         danmu_chunk.push(dm);
//     });
//     for (var i = 0; i < danmu_chunk.length; i++) out_danmus.push(danmu_chunk[i]);
//     if (REPRESENTATIVE_PERCENT != 0) out_danmus.forEach(function(dm) {
//         if (dm.peers.length) {
//             var representative = dm.peers[Math.min(Math.floor(dm.peers.length * REPRESENTATIVE_PERCENT / 100), dm.peers.length - 1)];
//             dm.time = representative.time;
//             dm.attr = representative.attr;
//             dm.mode = representative.mode;
//         }
//     });
//     var out_danmus_len = out_danmus.length, dispval_base = Math.sqrt(DISPVAL_THRESHOLD);
//     var chunkl = 0, chunkr = 0, chunkval = 0;
//     out_danmus.forEach(function(dm) {
//         while (chunkr < out_danmus_len && out_danmus[chunkr].time - dm.time < SHRINK_TIME_THRESHOLD) {
//             var dmr = out_danmus[chunkr];
//             if (ENLARGE) {
//                 var enlarge_rate = enlarge(dmr.peers.length);
//                 if (enlarge_rate > 1.0001) dmr.desc.push("已放大 " + enlarge_rate.toFixed(2) + " 倍：合并数量为 " + dmr.peers.length);
//                 dmr.size *= enlarge_rate;
//             }
//             chunkval += dmr.self_dispval = dispval(dmr);
//             chunkr++;
//         }
//         while (dm.time - out_danmus[chunkl].time > SHRINK_TIME_THRESHOLD) {
//             chunkval -= out_danmus[chunkl].self_dispval;
//             chunkl++;
//         }
//         S.maxdispval = Math.max(S.maxdispval, chunkval);
//         if (SHRINK) {
//             if (LOG_DISPVAL) {
//                 var prefix = chunkval.toFixed(0) + " [" + dm.self_dispval.toFixed(0) + "] ";
//                 dm.str = prefix + dm.str;
//                 dm.orig_str = prefix + dm.orig_str;
//             }
//             if (chunkval > DISPVAL_THRESHOLD) {
//                 if (LOG_VERBOSE) console.log("time", dm.time, "val", chunkval, "rate", Math.sqrt(chunkval) / dispval_base);
//                 S.shrink++;
//                 var shrink_rate = Math.min(Math.sqrt(chunkval) / dispval_base, 2);
//                 dm.size /= shrink_rate;
//                 dm.desc.push("已缩小 " + shrink_rate.toFixed(2) + " 倍：弹幕密度为 " + chunkval.toFixed(1));
//             }
//         }
//     });
//     out_danmus.forEach(function(dm) {
//         S.maxcombo = Math.max(S.maxcombo, dm.peers.length);
//         if (HIDE_THRESHOLD && HIDE_THRESHOLD < dm.peers.length) {
//             S.count_hide += 1;
//             return;
//         }
//         var d = new_dom.createElement("d");
//         var tn = new_dom.createTextNode(build_text(dm));
//         d.appendChild(tn);
//         var attr = dm.attr.slice();
//         attr[1] = dm.mode;
//         if (SCROLL_THRESHOLD && (attr[1] === "4" || attr[1] === "5")) {
//             var width = get_width_if_exceeds(dm.disp_str, dm.size, SCROLL_THRESHOLD);
//             if (width > SCROLL_THRESHOLD) {
//                 dm.desc.push("转换为滚动弹幕：宽度为 " + Math.floor(width) + " px");
//                 tn.textContent = dm.disp_str = (attr[1] === "4" ? "↓" : "↑") + dm.disp_str;
//                 attr[1] = "1";
//                 S.scroll += 1;
//             }
//         }
//         attr[2] = Math.ceil(dm.size);
//         d.setAttribute("p", attr.join(","));
//         if (dm.mode === 7) dm.disp_str = dm.disp_str.replace(/\/n/g, "");
//         apply_danmu(d, dm.desc, dm.peers, dm.disp_str);
//     });
//     S.parse_time_ms = +new Date() - start_time;
//     if (!REMOVE_SEEK && S.player_seek == 0) S.player_seek = "";
//     if (PROC_TYPE7 && PROC_TYPE4 && PROC_POOL1 && S.batch_ignore == 0) S.batch_ignore = "";
//     if (!ENLARGE && S.enlarge == 0) S.enlarge = "";
//     if (!SHRINK && S.shrink == 0) S.shrink = "";
//     if (!SHRINK && S.maxdispval == 0) S.maxdispval = "";
//     if (!HIDE_THRESHOLD && S.count_hide == 0) S.count_hide = "";
//     if (!SCROLL_THRESHOLD && S.scroll == 0) S.scroll = "";
//     if (!BLACKLIST_len && S.blacklist == 0) S.blacklist = "";
//     if (!WHITELIST_len && S.whitelist == 0) S.whitelist = "";
//     if (!FORCELIST_len && S.taolu == 0) S.taolu = "";
//     var serializer = new XMLSerializer();
//     return serializer.serializeToString(new_dom);
// }





var ERROR_COLOR='#ff4444';
var LOADING_COLOR='#4444ff';
var SUCCESS_COLOR='#33aa33';

function setbadge(text,color,tabid) {
    if(tabid<=0 && text=='FL!') return;
    chrome.browserAction.setBadgeText({
        text: text,
        tabId: tabid
    });
    if(color)
        chrome.browserAction.setBadgeBackgroundColor({
            color: color,
            tabId: tabid
        });
}

function add_pakku_fingerprint(url) {
    return url + (url.indexOf("?") === -1 ? "?" : "&") + "pakku_request";
}

function down_danmaku(url,id,tabid) {
    chrome.browserAction.setTitle({
        title: '正在下载弹幕文件…',
        tabId: tabid
    });
    setbadge('↓',LOADING_COLOR,tabid);
    
    var xhr=new XMLHttpRequest();
    console.log('load '+url+' for CID '+id);
    console.log('Here???');
    try {
        xhr.open("get", add_pakku_fingerprint(url), false);
        xhr.send();
    } catch(e) {
        setbadge('NET!',ERROR_COLOR,tabid);
        throw e;
    }
    
    try {
        if(xhr.status!==200) throw new Error('xhr.status = '+xhr.status);
        return xhr.response;
    } catch(e) {
        setbadge('SVR!',ERROR_COLOR,tabid);
        throw e;
    }
}

var TRAD_DANMU_URL_RE = /(.+):\/\/comment\.bilibili\.com\/(?:rc\/)?(?:dmroll,[\d\-]+,)?(\d+)(?:\.xml)?(\?debug)?$/;

var NEW_DANMU_NORMAL_URL_RE = /(.+):\/\/api\.bilibili\.com\/x\/v1\/dm\/list.so\?oid=(\d+)(\&debug)?$/;

var NEW_DANMU_HISTORY_URL_RE = /(.+):\/\/api\.bilibili\.com\/x\/v2\/dm\/history\?type=\d+&oid=(\d+)&date=[\d\-]+(\&debug)?$/;

var DANMU_URL_FILTER = [ "*://comment.bilibili.com/*", "*://api.bilibili.com/x/v1/dm/*", "*://api.bilibili.com/x/v2/dm/*" ];

function parse_danmu_url(url) {
    function addtype(type, res) {
        return res ? res.concat(type) : res;
    }
    if (url.indexOf("//comment.bilibili.com/") !== -1) return addtype("trad", TRAD_DANMU_URL_RE.exec(url)); else if (url.indexOf("/list.so?") !== -1) return addtype("list", NEW_DANMU_NORMAL_URL_RE.exec(url)); else if (url.indexOf("/history?") !== -1) {
        return addtype("history", NEW_DANMU_HISTORY_URL_RE.exec(url));
    } else return null;
}

//var TEST_MODE = navigator.userAgent.indexOf("xmcp_pakku_test_runner") !== -1;

var IS_FIREFOX = false;

var NOT_OVERRIDABLE_CONFIGS = [ "CLOUD_SYNC" ];

var MATH_LOG5 = Math.log(5);

var GLOBAL_SWITCH = true;

var HISTORY = {};

var BOUNCE = {
    cid: -1,
    set_time: -1,
    result: ""
};

function Status(CID) {
    return {
        identical: 0,
        edit_distance: 0,
        pinyin_distance: 0,
        cosine_distance: 0,
        player_seek: 0,
        blacklist: 0,
        count_hide: 0,
        whitelist: 0,
        batch_ignore: 0,
        script: 0,
        enlarge: 0,
        shrink: 0,
        scroll: 0,
        taolu: 0,
        total: 0,
        onscreen: 0,
        maxcombo: 0,
        maxdispval: 0,
        error: null,
        cid: CID,
        parse_time_ms: -1
    };
}


function check_xml_bounce(cid) {
    var res = cid == BOUNCE.cid && +new Date() - BOUNCE.set_time < 5e3;
    if (res) {
        BOUNCE.set_time = -1;
    }
    return res;
}

function make_xml_datauri(txt) {
    return "data:text/xml;charset=utf-8," + encodeURIComponent(txt);
}

function parse_xml_magic(k) {
    try {
        k = k.replace(/[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]/g, "");
    } catch (c) {}
    return new window.DOMParser().parseFromString(k, "text/xml");
}

function fetch_alasql(tabid) {
    function done(code) {
        if (tabid) chrome.tabs.executeScript(tabid, {
            code: code,
            runAt: "document_end"
        });
    }
    chrome.storage.local.get({
        alasql_src: null
    }, function(res) {
        if (res.alasql_src) done(res.alasql_src); else {
            console.log("downloading alasql");
            var xhr = new XMLHttpRequest();
            xhr.open("get", "https://cdnjs.cloudflare.com/ajax/libs/alasql/0.4.5/alasql.min.js");
            xhr.onload = function() {
                if (xhr.responseText.indexOf("//! AlaSQL v0.4.5") == 0) {
                    console.log("alasql downloaded OK");
                    done(xhr.responseText);
                    chrome.storage.local.set({
                        alasql_src: xhr.responseText
                    });
                } else {
                    console.log("alasql downloaded FAILED");
                    console.log(xhr.responseText);
                }
            };
            xhr.send();
        }
    });
}


function inject_panel(tabid, D, OPT) {
    if (tabid <= 0) {
        console.log("inject panel: tabid", tabid, "IGNORED");
        return;
    }
    chrome.tabs.executeScript(tabid, {
        code: "var D=" + JSON.stringify(D) + "; var OPT=" + JSON.stringify(OPT),
        allFrames: true,
        runAt: "document_start"
    }, function() {
        if (chrome.runtime.lastError) {
            console.log("cannot inject panel. skipping.", chrome.runtime.lastError);
            return;
        }
        if (OPT["FOOLBAR"]) fetch_alasql(tabid);
        setTimeout(function() {
            chrome.tabs.insertCSS(tabid, {
                file: "/injected/all_injected.css",
                allFrames: true,
                runAt: "document_end"
            });
            chrome.tabs.executeScript(tabid, {
                file: "/injected/all_injected.js",
                allFrames: true,
                runAt: "document_end"
            });
        }, 100);
    });
}


function load_danmaku(resp, id, tabid) {
    try {
        chrome.browserAction.setTitle({
            title: "正在处理弹幕…",
            tabId: tabid
        });
        setbadge("...", LOADING_COLOR, tabid);
        // var rxml = parse_xml_magic(resp);
        var S = Status(id);
        var D = [];
        var res =  resp;   //parse(rxml, tabid, S, D);
        var counter = S.total - S.onscreen;
        if (tabid > 0) {
            setbadge("...", SUCCESS_COLOR, tabid);
            console.log("tableID:",tabid);
            chrome.browserAction.setTitle({
                title: "Filtering Danmu",
                tabId: tabid
            });
        } else {
            chrome.browserAction.setBadgeText({
                text: ""
            });
            chrome.browserAction.setTitle({
                title: "pakku"
            });
        }
        
        HISTORY[tabid] = S;
        chrome.runtime.sendMessage({
            type: "browser_action_reload"
        });
        return res;
    } catch (e) {
        setbadge("JS!", ERROR_COLOR, tabid);
        throw e;
    }
}



function down_danmaku_async(url, id, tabid) {
    return new Promise(function(resolve, reject) {
        chrome.browserAction.setTitle({
            title: "正在下载弹幕文件…",
            tabId: tabid
        });
        setbadge("↓", LOADING_COLOR, tabid);
        var xhr = new XMLHttpRequest();
        console.log("load " + url + " for CID " + id);
        try {
            xhr.open("get", add_pakku_fingerprint(url));
            xhr.onerror = function() {
                setbadge("SVR!", ERROR_COLOR, tabid);
                return reject(new Error("SVR!"));
            };
            xhr.onload = function() {
            	//console.log(xhr.response);
                return resolve(xhr.response);
            };
            xhr.send();
        } catch (e) {
            setbadge("NET!", ERROR_COLOR, tabid);
            return reject(e);
        }
    });
}

function send_json_to_server(from_xml) {
	var rxml = parse_xml_magic(from_xml);
	C = [];
	for (var index = 0; index < rxml.getElementsByTagName("d").length; index++) {
		
		C.push(rxml.getElementsByTagName("d")[index].childNodes[0].nodeValue);
	}
	a = JSON.stringify({ "content": C });
	

	var ajaxserver = new XMLHttpRequest();
	ajaxserver.open("post","http://160.36.56.203:23335",false);
	//ajaxserver.open("post","http://127.0.0.1:5000",false);
	
	var str;
	ajaxserver.onload = function(){
		
		var k = ajaxserver.response.replace(/[\r\n]/g,"");
		k = k.replace(/\ +/g,"");  
		k = JSON.parse(k);
		var xmlDOC = rxml.childNodes[0];
		for (var i = k["id"].length-1; i >= 0; i--) {
			if (k["id"][i] == 0) {
				xmlDOC.removeChild(rxml.getElementsByTagName("d")[i]);
			}
		}
		var s = new XMLSerializer();
		str = s.serializeToString(rxml);
		console.log(str);
		return str;
	}
	ajaxserver.setRequestHeader("Content-Type","application/json;charset=UTF-8");
	ajaxserver.send(a);
	return str;
}


chrome.commands.onCommand.addListener(function(command) {
  console.log('onCommand event received for message: ', "Hello Hello Hello~");

});

chrome.webRequest.onBeforeRequest.addListener(onbeforerequest = function(details) {
    if (!GLOBAL_SWITCH) return {
        cancel: false
    };
    
    var ret = parse_danmu_url(details.url);
    if (ret) {
        var protocol = ret[1], cid = ret[2], debug = ret[3], type = ret[4];
        if (check_xml_bounce(cid)) {
            console.log("bounce :: redirect", cid);
            return {
                redirectUrl: make_xml_datauri(BOUNCE.result)
            };
        }
        if (debug || details.type === "xmlhttprequest") {
            if (type == "history") {
                console.log("webrequest :: SKIPPING history request");
                return {
                    cancel: false
                };
            }
            console.log("webrequest :: sync", details);
            return {
                redirectUrl: make_xml_datauri(load_danmaku(down_danmaku(details.url, cid, details.tabId), cid, details.tabId))
            };
        } else {
            setbadge("FL!", ERROR_COLOR, details.tabId);
             return {
                cancel: false
            };
        }
    } else return {
        cancel: false
    };
}, {
    urls: DANMU_URL_FILTER
}, [ "blocking" ]);



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if (request.type === "ajax_hook") {
        if (!GLOBAL_SWITCH) return sendResponse({
            data: null
        });
        var tabid = sender.tab.id;
        console.log("message", request);
        var ret = parse_danmu_url(request.url);
        if (ret) {
            var protocol = ret[1], cid = ret[2], debug = ret[3];
            if (check_xml_bounce(cid)) return sendResponse({
                data: BOUNCE.result
            });
           	down_danmaku_async(request.url, cid, tabid).then(function(res) {
           		var sdm = send_json_to_server(res);
                sendResponse({
                    data: load_danmaku(sdm, cid, tabid)
                });
            }).catch(function() {
                sendResponse({
                    data: null
                });
            });
            return true;
        } else return sendResponse({
            data: null
        });
    } else if (request.type === "set_xml_bounce") {
        if (!GLOBAL_SWITCH) set_global_switch(true, "yes do not reload");
        BOUNCE.cid = request.cid;
        BOUNCE.set_time = +new Date();
        BOUNCE.result = request.result;
        console.log("set xml bounce for cid", request.cid);
        return sendResponse({
            error: null
        });
    } else if (request.type === "crack_uidhash") {
        return sendResponse(crack_uidhash(request.hash));
    } else if (request.type === "crack_uidhash_batch") {
        request.dinfo.forEach(function(d) {
            d.cracked_uid = crack_uidhash(d.peers[0].attr[6])[0];
        });
        return sendResponse(request.dinfo);
    } else if (request.type === "load_userinfo_batch") {
        var toload = [];
        request.dinfo.forEach(function(d) {
            toload.push(d.peers[0].attr[6]);
        });
        var store = {};
        load_userinfo_batch(toload, store, function() {
            request.dinfo.forEach(function(d) {
                var info = store[d.peers[0].attr[6]];
                d.sender_info = info;
                d.cracked_uid = parseInt(info ? info.mid : null);
            });
            return sendResponse(request.dinfo);
        }, request.silence);
        return true;
    } else if (request.type === "need_ajax_hook") {
        return sendResponse(!IS_FIREFOX || !browser || !browser.webRequest.filterResponseData);
    } else if (request.type === "xhr_proxy") {
        var xhr = new XMLHttpRequest();
        xhr.open(request.method, request.url);
        xhr.onreadystatechange = function() {
            if (this.readyState !== 4) return;
            sendResponse({
                status: xhr.status,
                responseText: xhr.responseText
            });
        };
        xhr.send();
        return true;
    }
    
});

