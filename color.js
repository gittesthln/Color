let Size  = 500;
let scale = 20;
window.onload = function(){
    let SVG = document.getElementsByTagName("svg")[0];
    setAttribs(SVG, {width:Size,height:Size});
    let g2 = makeSVGElm(SVG, "g", {transform:`translate(${Size/2},${Size/2})`});
    let g = makeSVGElm(g2, "g", {transform:`scale(1,-1)`});
    makeSVGElm(g, "line",
       {x1:-Size/2, y1:0, x2:Size/2, y2:0, "stroke-width":2, stroke:"black"});
    makeSVGElm(g, "line",
       {y1:-Size/2, x1:0, y2:Size/2, x2:0, "stroke-width":2, stroke:"black"});
    Array(4).fill(0).forEach((dummy,i)=>{
        makeSVGElm(g, "circle",
                   {cx:0,cy:0,r:scale*(i+1),
                    fill: "none", "stroke-width":2, stroke:"hsl(0,0%,50%)"
                   });
    })
    let path = makeSVGElm(g, "path",
                          {"stroke-width":2, stroke:"black", fill:"none"});
    let File = document.getElementById("file");
    File.onchange = (E)=>{
        console.log("OK");
        let reader = new FileReader();
        reader.onload = function(){
            let lines = reader.result.split("\n");
            let shift = 2+13*9;
            setAttribs(path, {d:Array(12).fill(0).map((V,i)=>{return shift+i}).
                        reduce((d, p)=>{
                            let data = lines[p].split(",");
                            [2,14,26].forEach((v)=>{
                                let cx = data[v]*scale;
                                let cy = data[v+1]*scale;
                                makeSVGElm(g, "circle",
                                       {cx:cx, cy:cy, r:3,
                                        fill:`hsl(${(p-shift)*30},100%,50%)`});
                            });
                            let cx = data[2]*scale;
                            let cy = data[2+1]*scale;
                            return `${d}${cx},${cy} `;
                        }, "M")+"z"});
        }
        reader.onerror= function(){alert("Error")};
        reader.readAsText(E.target.files[0]);
    };
}
function makeElm(parent, Elm, Attrib) {
    let E = document.createElement(Elm);
		setAttribs(E, Attrib);
     if(parent) parent.appendChild(E);
    return E;
}
function makeSVGElm(parent, Elm, Attrib) {
    let E = document.createElementNS("http://www.w3.org/2000/svg",Elm);
		setAttribs(E, Attrib);
    if(parent) parent.appendChild(E);
    return E;
}
function setAttribs(Elm, Attrib) {
    for(A in Attrib){
        Elm.setAttribute(A,Attrib[A]);
    };
}
