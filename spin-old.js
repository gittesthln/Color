window.onload = function(){
    let place = getElmId("place");
   s1 = new SpinBox({display:"inline-block", value:50, margin:"5px", max:100, min:0}, place);
    new SpinBox({display:"inline-block", margin:"5px","big-skip":100}, place);
}
function getElmId(id) {
  return document.getElementById(id);
}
function mkElm(name, Opt, P, Events) {
  let Elm = document.createElement(name);
  setAttribs(Elm, Opt);
  if(P) P.appendChild(Elm);
  for(let evt in Events) {
    Elm.addEventListener(evt, Events[evt],true);
  }
  return Elm;
}
function setAttribs(Elm,Opt) {
  for(let attrib in Opt) {
    Elm.setAttribute(attrib,Opt[attrib]);
  }
}
function setOptions(props, Opt) {
  for( let key in Opt) {
    if(props.hasOwnProperty(key)) props[key] = Opt[key];
  }
}
function setStyle(props, Opt) {
  setOptions(props, Opt);
  return {
    style: JSON.stringify(props).replace(/[{"]/g,"").replace(/[,}]/g,";")};
}
class SpinBox {
  constructor(Opt, P, Events) {
    this.props = {
      values: {
        max:Number.MAX_VALUE,
        min:-Number.MAX_VALUE,
        skip: 1,
        "big-skip":5,
        value:0
      },
      boundary: {
        display:"block",
        margin:"0px",
        border:"0px",
        padding:"0px"
      }
    }
    let Value = this.props.values;
    let container = mkElm("div", setStyle(this.props.boundary, Opt), P);
    setOptions(this.props.values, Opt);
    let div0 = mkElm("div",
          {style:"display:inline-block; vertical-align:middle;"},
          container);
    let textBox = mkElm("input",
            {type:"text", size:"1em", value:Value.value, readonly:"readonly",
           style:"font-size:20px; text-align:right; disable"
          },
          div0);
    let div = mkElm("div",
            {style:"display:inline-block;vertical-align:middle"},
            container);
    let buttonStyle = {
          style: "font-size:10px;"+
              "margin:0px;"+
              "cursor:default;"+
              "background:lightgray;"+
              "border-color:black;"
    }
    let button = mkElm("div", buttonStyle, div,
       {click:function(E){
        let skip = E.shiftKey?Value["big-skip"]:Value.skip;
        textBox.value = Value.value =Math.min(Value.value+skip, Value.max);
       }});
    button.innerText ="▲";
    button = mkElm("div", buttonStyle, div,
      {click:function(E){
       let skip = E.shiftKey?Value["big-skip"]:Value.skip;
       textBox.value = Value.value =Math.max(Value.value-skip, Value.min);
      }});
    button.innerText ="▼";
  }
  get value() {
    return Values.value;
  }
}
