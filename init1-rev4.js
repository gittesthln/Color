window.onload = function(){
  let Params = {
      Size:200,
      R:60,
      No:5, 
      Back:[[0,0,0], [0,0,90]],
      Circle:[[0,100,50], [0,100,50]]};
    let places = [DOMObject.getElmId("placeBack"),
                  DOMObject.getElmId("placeCircle"),
                  DOMObject.getElmId("placeButton")];
  let type = "hsl";
  let SS = new NamedTextBox("図形の大きさ", places[2], 2, Params.Size);
  let RR = new NamedTextBox("円の大きさ", places[2], 2, Params.R);
  let No = new NamedTextBox("個数", places[2], 2, Params.No);
  let Go = new Button("設定", places[2], {click:function(){showFigs(1);}});
  let Save = new Button("保存", places[2], {click:function(){
    for(let i=0;i<2;i++) {
      let res = colors[i].reduce((x,y)=>{ return `${x} ${y.hsl.join(" ")}`;},"[")+"]";
      console.log(res);
    }
    console.log("saved");
  }});
  let colors;
  let Names = ["Back", "Circle"];
  let P = DOMObject.getElmId("Canvas");
  let SVG, circles=[], rects = [];
  showFigs(0);//initilize
  function showFigs(mode=0) {//console.log("called");
    let Size = SS.value-0, R = RR.value-0, Margin = 20, N = No.value-0;
      if(mode == 0 || mode == 1) {
      colors = ["背景","中央"].map(function(T, i){
        if(mode==1) places[i].elm.removeChild(places[i].elm.firstChild);
        let divT = new divWithText(T, places[i]);
        let Low  = (mode==0)?Params[Names[i]][0]:colors[i][0].hsl;
        let High = (mode==0)?Params[Names[i]][1]:
              colors[i][colors[i].length-1].hsl;;
        let Diff = Array(3).fill(0).map((dummy,j)=>{return (High[j]-Low[j])/(N-1)});
        return Array(N).fill(0).map((dummy, j)=>{
          let val = Diff.map((V,k)=>{return Math.floor(V*j+Low[k])});
          let C = new SetColor("", "hsl", divT, function(){showFigs(2);},
                               {style:"display:inline-block;"});
				  C.hsl = val;
          return C;
        });
      });
      P.elm.removeChild(P.elm.firstChild);
      SVG = new DOMObject(
          "svg",{width:Size*N+Margin*2, height:Size+Margin, id:"SVG"},
                P, {}, "SVG");
      let cy = Margin+Size/2;
      for(let j=0, xOffset = Margin; j<N; j++, xOffset+=Size) {
        rects[j] = new DOMObject("rect",
         {x:xOffset, y:Margin, width:Size, height:Size, fill:`${colors[0][j]}`},
         SVG, {}, "SVG");
       circles[j] = new DOMObject("circle", {cx:`${xOffset+Size/2}`, cy:cy,
                      r:R, fill:`${colors[1][j]}`}, SVG, {}, "SVG");
      }
    }
    if(mode == 2){//color box value changed
      for(let j=0; j<N; j++) {
        circles[j].setAttribs({fill:`${colors[1][j]}`});
        rects[j].setAttribs({fill:`${colors[0][j]}`});
      }
    }
  }
}
