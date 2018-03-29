window.onload = function(){
    let Params = {
        Size:200,
        R:60,
        N:3, 
        bgcolor:[0,0,100],
        FigColor:[0,100,50],
        ccolor:[0,0,100]
    };
    let type = "hsl";
    let place = DOMObject.getElmId("place");
    let bgcolor = new SetColor("背景色", "hsl", place, function(){showFigs(false);});
    bgcolor[type] = Params.bgcolor;
    let figcolor = new SetColor("図形の色", "hsl", place, function(){showFigs(false);});
    figcolor[type]= Params.FigColor;
    let ccolor = new SetColor("中央の色", "hsl", place, function(){showFigs(false);});
    ccolor[type] = Params.ccolor;
    let SS = new NamedTextBox("全体の大きさ", place, 2, Params.Size);
    let RR = new NamedTextBox("図形の大きさ", place, 2, Params.R);
    let No = new NamedTextBox("個数", place, 2, Params.N);
    let Go = new Button("設定", place, {click:function(){showFigs(true);}});
    let Save = new Button("保存", place, {click:function(){
        }});
    let P = DOMObject.getElmId("Canvas");
    let SVG, circles=[], polygon, rect;
    showFigs(true);
    function showFigs(mode=true) {
        let Size = SS.value-0, R = RR.value-0, Margin = 20, N = No.value-0;
        if(mode) {
            P.elm.removeChild(P.elm.firstChild);
            SVG = new DOMObject(
                "svg",{width:(Size+Margin)*2, height:Size*2+Margin*2, id:"SVG"},
                P, {}, "SVG");
            rect = new DOMObject(
                "rect",{width:"100%", height:"100%", fill:`${bgcolor}`},
                SVG, {}, "SVG");
            let Origin = new DOMObject(
                "g",{transform:`translate(${Size+Margin},${Size+Margin})`},
                SVG, {}, "SVG");
            let PP = Size-R;
            let d = "M";
            for(let i=0;i<N;i++) {
                let angle = 2*Math.PI/N*i;
                let x = PP*Math.cos(angle), y = PP*Math.sin(angle);
                d += `${x},${y} `;
                circles[i] = new DOMObject(
                    "circle", {cx:x, cy:y, r:R, fill: `${figcolor}` },
                    Origin, {}, "SVG"); 
            }
            polygon = new DOMObject(
                "path", {d:d, fill:`${ccolor}`}, Origin, {}, "SVG");            
        } else {
            for(let i=0;i<N;i++) {
                circles[i].setAttribs({fill: `${figcolor}`});
            }
            polygon.setAttribs({fill:`${ccolor}`});
            rect.setAttribs({fill:`${bgcolor}`});
        }
    }
}
