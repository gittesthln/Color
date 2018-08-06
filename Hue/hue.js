window.onload = function(){
    let url;
    let IP = document.getElementById("ip");
		IP.value = localStorage["IP"]||"";
    let initialize = document.getElementById("initialize");
    initialize.addEventListener("click",function(){
				localStorage["IP"] = IP.value;
        getHTML(`http://${IP.value}/api`, "POST",
                {"devicetype":"my_device#access"}, getUserName);
    })
    let username = localStorage["username"]||"";console.log(username);
		if(username) {
        url = `http://${IP.value}/api/${username}/lights`;
        getHTML(url,"GET",{},getStatus);
		}										

    let anim =
        document.getElementById("animation").getElementsByTagName("input");
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
        let res = JSON.parse(result);console.log(res);
        let table = document.getElementById("status");
        for( let valve in res) {
            let div = mkElm(table, "table", "");
            let tr = mkElm(div, "tr","");
            let td = mkElm(tr,"td", valve);
            let status = res[valve].state;
            td = mkElm(tr, "td", "");
            let button = mkElm(td,"input", "");
            button.setAttribute("type", "button");
            button.setAttribute("value", status.on?"点灯":"消灯");
            button.addEventListener("click",function(E){
                let on = (E.target.value == "点灯");
                E.target.value = on?"消灯":"点灯";
                getHTML(`${url}/${valve}/state`,"PUT",{"on":!on}, setValues);
            });
            for( let p in {"hue":"色相", "bri":"明度", "sat":"彩度"}){
                tr = mkElm(div, "tr","");
                td = mkElm(tr, "td", p);
                let input = mkElm(tr, "input","");
                input.setAttribute("type","text");
                input.setAttribute("size","5");
                input.setAttribute("style","text-align:right");
                input.value = status[p];
            };
        }
        anim[2].removeAttribute("disabled");
        anim[2].addEventListener("click",(E)=>{
            console.log(E.target.value);
            if(E.target.value == "開始") {
                E.target.value = "停止";
                setTimeout(next, 200, 0);
            } else {
                E.target.value = "開始";
            }
        });
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
        function next(index){
            if(anim[2].value == "停止") {
								if(true){
										let color =
												{"hue":index, "bri":anim[1].value-0,"sat":anim[0].value-0};
								    console.log(index);
										getHTML(`${url}/3/state`,"PUT", color, null);
										setTimeout(next, 500, (index+1000)%65535);
								} else {
										getHTML(`${url}/3/state`,"PUT", colors[index], null);
										setTimeout(next, 333, (index+1)%colors.length);
								}
						}
        }
    }
    function mkElm(P, elm, txt) {
        let e = document.createElement(elm);
        e.innerText = txt;
        if(P) P.appendChild(e);
        return e;
    }
    function setValues(res){
        console.log(res);
    }
}
