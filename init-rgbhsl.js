window.onload = function(){
    let Params = {
        Size:200, R:60, Back:[0,0,0], Circle:[255,0,0]
    };
    let places = [DOMObject.getElmId("placeBack"),
                  DOMObject.getElmId("placeCircle"),
                  DOMObject.getElmId("placeButton")];
    let SS = new NamedTextBox("図形の大きさ", places[2], 2, Params.Size);
    let RR = new NamedTextBox("円の大きさ", places[2], 2, Params.R);
    let Names = ["Back", "Circle"];
    let P = DOMObject.getElmId("Canvas");
    let Size = Params.Size, R = Params.R, N = 1;
    let colors = ["背景(hsl)","中央(rgb)"].map(function(T, i){
        let divT = new divWithText(T, places[i]);
        let C = new SetColor("", i==0?"hsl":"rgb", divT, function(){
                circles.setAttribs({fill:`${colors[1]}`});
                rects.setAttribs({fill:`${colors[0]}`});
            },
            {style:"display:inline-block;"});
        C[i==0?"hsl":"rgb"] = Params[Names[i]];
        return C;
    });
    let SVG = new DOMObject("svg",{width:Size, height:Size, id:"SVG"}, P, {}, "SVG");
    let rects = new DOMObject("rect",
           {x:0, y:0, width:Size, height:Size, fill:colors[0]}, SVG, {}, "SVG");
    let circles = new DOMObject("circle", {cx:Size/2, cy:Size/2,
                                           r:R, fill:colors[1]}, SVG, {}, "SVG");
    setTimeout(checkColor,1000, [0, 100, 25]);
		function checkColor(Chsl){
        colors[0].hsl = Chsl;
        colors[1].rgb = HSL2RGB(...Chsl);
        circles.setAttribs({fill:`${colors[1]}`});
        rects.setAttribs({fill:`${colors[0]}`});
        Chsl[0] +=30;
        if(Chsl[0]<360) setTimeout(checkColor,1000, Chsl);
        else {
            Chsl[0]=0;
            Chsl[1] -= 10;
            if(Chsl[1]>0) setTimeout(checkColor,500, Chsl);
            else {
                Chsl[1] = 100;
                Chsl[2] += 25;
                if(Chsl[2]<100) setTimeout(checkColor,500, Chsl);
            }
        }
		}
}
function HSL2RGB(h, s, l){
		let r, g, b;
		[r, g, b] = hsl2rgb(h/360, s/100, l/100);//console.log([r,g,b]);
		return[Math.round(r*255), Math.round(g*255),Math.round(b*255)];
}
function hsl2rgb(h, s, l) {
    let m1, m2;
    m2 = (l<=0.5)?(l*(s+1)):(l+s-l*s);
    m1 = l*2-m2; //console.log(`m1=${m1} m2=${m2}`);
    return [
        hue2rgb(m1, m2, h+1/3),
        hue2rgb(m1, m2, h),
        hue2rgb(m1, m2, h-1/3)];
} 
function hue2rgb(m1, m2, h){
    if(h<0) h +=1;          
    if(h>1) h -=1;         
    if(h*6<1) return m1+(m2-m1)*h*6;
    if(h*2<1) return m2;
    if(h*3<2) return m1+(m2-m1)*(2/3-h)*6;
    return m1;
}
