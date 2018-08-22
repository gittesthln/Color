window.onload = function(){
    let url;
    let IP = document.getElementById("ip");
		IP.value = localStorage["IP"]||"";
    let initialize = document.getElementById("initialize");
    initialize.addEventListener("click",function(){
				localStorage["IP"] = IP.value;
        if(IP.value) {
            getHTML(`http://${IP.value}/api`, "POST",
                    {"devicetype":"my_device#access"}, getUserName);
        } else {
            alert("ブリッジのIPアドレスを指定してください。");
        }
    })
    let username = localStorage["username"]||"";console.log(username);
		if(username) {
        url = `http://${IP.value}/api/${username}/lights`;
        getHTML(url,"GET",{},getStatus);
		}										

    let animData = (localStorage["Anim"])?JSON.parse(localStorage["Anim"]):{};
    function getHTML(URL, method, body, func){
        let http = new XMLHttpRequest();
        http.open(method, URL, true);
        http.onreadystatechange = function(){
            if(http.readyState == 4){
                if(http.status = 200) {
                    if(func) func(http.responseText);
//                    else console.log(http.responseText);
                } else {
                    console.log(http.status);
                }
            }
        }
        http.send(JSON.stringify(body));
    }
    function getUserName(result) {
        let res = JSON.parse(result);
        if(res[0].error) {
            alert("ブリッジのリンクボタンを押してください。");
        } else if(res[0].success) {
            localStorage["username"] = username = res[0].success.username;
            console.log(username);
            initialize.setAttribute("disabled", "disabled");
            url = `http://${IP.value}/api/${username}/lights`;
            getHTML(url,"GET",{},getStatus);
        }
    }
    function getStatus(result){    
        let P = {"hue":"色相", "bri":"明度", "sat":"彩度"};
        let anim = {"step":"変化量", "interval":"間隔"};
        let res = JSON.parse(result);console.log(res);
        let table = document.getElementById("status");
        for(let valve in res) {
            let div = mkElm(table, "table", "");
            let tr = mkElm(div, "tr","");
            let td = mkElm(tr,"td", valve);
            let status = res[valve].state;
            let inputs = {};
            td = mkElm(tr, "td", "");
            let button = mkElm(td,"input", "",
                 {"type": "button", "value":status.on?"消灯":"点灯"});
            button.addEventListener("click",function(E){
                let on = (E.target.value == "点灯");
                E.target.value = on?"消灯":"点灯";
                getHTML(`${url}/${valve}/state`,"PUT",{"on":on}, setValues);
            });
            td = mkElm(tr, "td", "");
            button = mkElm(td, "input", "", {"type":"button", "value":"設定"});
            button.addEventListener("click",function(E){
                console.log(inputs);
                let O = {};
                for(p in inputs){
                    let val = inputs[p].value - 0;
                    val = Math.max(val,0);
                    inputs[p].value = O[p] = 
                        (p=="hue")?(val % 65536): Math.min(val, 254);
                }
                getHTML(`${url}/${valve}/state`,"PUT", O, setValues);
            });
            button = mkElm(td, "input", "",
                               {"type": "button","value":"開始"});
            button.addEventListener("click",function(E){
                if(button.value=="開始") {
                    localStorage["Anim"]=JSON.stringify(
                        Array.prototype.map.call(anim,(V)=>{return V.value}));
                    console.log(localStorage["Anim"]);
                    button.value = "停止";
                    next(valve, inputs, button);
                }else {
                    button.value = "開始";
                }
            });
            for(let p in P){
                tr = mkElm(div, "tr","");
                td = mkElm(tr, "td", P[p]);
                inputs[p] =
                    mkElm(tr, "input","", {"type":"text", "class":"number"});
                inputs[p].value = status[p];
            };
        }
				let colors =[
						{"hue":0,
//						 "bri":100,
						 "sat":200
						},
						{"hue":65535*2/3,
//						 "bri":100,
//						 "sat":200
						},
						{"hue":0,
						 "bri":0,
//						 "sat":  0
						}
				];
        function next(valve, inputs, button){
            if(button.value == "停止") {
								if(true){
										let color = {};
                    for(p in inputs){
                        color[p] = inputs[p].value-0;
                        if(p == "hue"){
                            inputs[p].value= (color[p]+(anim[0].value-0))%65536;
                        }
                    }
										getHTML(`${url}/${valve}/state`,"PUT", color, null);
										setTimeout(next, anim[1].value-0, valve, inputs, button);
								} else {
										getHTML(`${url}/1/state`,"PUT", colors[index], null);
										setTimeout(next, 333, (index+1)%colors.length);
								}
						} 
        }
    }
    function mkElm(P, elm, txt, attribs) {
        let e = document.createElement(elm);
        if(txt) e.innerText = txt;
        for(let att in attribs){
            e.setAttribute(att, attribs[att]);
        }
        if(P) P.appendChild(e);
        return e;
    }
    function setValues(res){
        console.log(res);
    }
}
