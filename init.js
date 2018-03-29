2window.onload = function(){
    let Params = {
        Size:200,
        R:60,
        No:2, 
        Left:[[0,0,0], [255,0,0],[50,0,0]],
        Right:[[128,128,128], [255,0,0], [50,0,0]]};
    let place = DOMObject.getElmId("place");
    let colors = ["(左部)","(右部)"].map(function(T){
        let divT = new divWithText(T, place);
        let div = new DOMObject("div",{},divT);
        return ["背景色","中央の色(上)","中央の色(下)"].map(function(E){
            return new SetColor(E, div, function(){showFigs(false);});
        });
    });
    let SS = new NamedTextBox("図形の大きさ", place, 2, Params.Size);
    let RR = new NamedTextBox("円の大きさ", place, 2, Params.R);
    let No = new NamedTextBox("個数", place, 2, Params.No);
    let Go = new Button("設定", place, {click:function(){showFigs(true);}});
    let Save = new Button("保存", place, {click:function(){
        let N = No.value-0;
        for(let i=0;i<2;i++) {
        let Diff = colors[i][1].rgb.map(
            (V,j)=>{return (colors[i][2].rgb[j]-V)/(N-1);});
        let res = " ";
//        for(let j=0; j<N;j++){
//            res +=Diff.map((V,k)=>{return Math.floor(V*j+colors[i][1].rgb[k])}).join(" ")+" ";
        //        }
        res = Array(N).fill(0).map((dummy, j)=>{
            return Diff.map((V,k)=>{return Math.floor(V*j+colors[i][1].rgb[k])}).join(" ");
        }).join(" ");
        res += " "+ colors[i][0].rgb.join(" ");
            console.log(res);
        }
        console.log("saved");
        }});
    [Params.Left, Params.Right].forEach(function(Vs, i) {
        Vs.forEach((V,j)=>{colors[i][j].rgb=V;})
    });
    let P = DOMObject.getElmId("Canvas");
    let SVG, rects=[], circles=[[],[]];
    showFigs(true);
    function showFigs(mode=true) {//console.log("called");
        let Size = SS.value-0, R = RR.value-0, Margin = 20, N = No.value-0;
        if(mode) {console.log(N);
            P.elm.removeChild(P.elm.firstChild);
            SVG = new DOMObject(
                "svg",{width:(Size+Margin)*2, height:Size*N+Margin*2, id:"SVG"},
                P, {}, "SVG");
            for(let i=0;i<2;i++) {
                let xOffset = Margin + Size*i;
                rects[i] = new DOMObject("rect",
                    {x:xOffset, y:Margin, width:Size, height:Size*N,
                     fill:`rgb(${colors[i][0].rgb.join(",")})`
                    }, SVG, {}, "SVG");
                let cx = xOffset + Size/2;
                let Diff = colors[i][1].rgb.map(
                    (V,j)=>{return (colors[i][2].rgb[j]-V)/(N-1);});
                for(let j=0, cy = Margin + Size/2; j<N; j++, cy+=Size) {
                    let C = Diff.map((V,k)=>
                       {return Math.floor(V*j+colors[i][1].rgb[k])}).join(",");
                    circles[i][j] =
                        new DOMObject("circle", {cx:cx, cy:cy, r:R,
                              fill:`rgb(${C})`}, SVG, {}, "SVG");
                }
            }
        }else {
            rects.forEach((rect,i)=>rect.setAttribs(
                {fill:`rgb(${colors[i][0].rgb.join(",")})`}));
            for(let i=0;i<2;i++) {
                let Diff = colors[i][1].rgb.map(
                    (V,j)=>{return (colors[i][2].rgb[j]-V)/(N-1);});
                for(let j=0; j<N; j++) {
                    let C = Diff.map((V,k)=>
                       {return Math.floor(V*j+colors[i][1].rgb[k])}).join(",");
                circles[i][j].setAttribs({fill:`rgb(${C})`});
                }
            }
        }
    }
}
