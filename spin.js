window.onload = function(){
    let place = DOMObject.getElmId("place");
    let colors = ["(左部)","(右部)"].map(function(T){
        let divT = new divWithText(T, place);
        let div = new DOMObject("div",{},divT);
        return ["背景色","中央の色(上)","中央の色(下)"].map(function(E){
            return new SetColor(E, div);
        });
    });
    console.log(colors);
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
class SetColor {
    constructor(title, P) {
        this.elm = new DOMObject(
            "div",{style:"display:inline-block"},
            P,
            {click:E=>{
                if(that.checkBox.elm.checked){
                    if(E.target.getAttribute("type") == "UP") {
                        that.RGB.forEach(C=>{C.up = E.shiftKey;});
                    }
                    if(E.target.getAttribute("type") == "DOWN") {
                        that.RGB.forEach(C=>{C.down = E.shiftKey;});
                    }
                    E.stopPropagation();
                }}}
        ).elm;
        this.elm.innerText = title;
        this.checkBox = new DOMObject("input",
            {type:"checkbox", stylestyle:"display:inline-block"},this);
        let that = this;
        this.RGB = Array(3).fill(0).map(function(){
            return new SpinBox({
                display:"inline-block",
                value:128,
                margin:"5px",
                max:255, min:0}, that);
        });
        console.log(this);
    }
}
let DOMObject = (function(){
    let NS ={
        HTML:"http://www.w3.org/1999/xhtml",
        SVG: "http://www.w3.org/2000/svg"
    }
    return class{
        static getElmId(id) {
            return {elm:document.getElementById(id)};
        }
    constructor(elm, attribs, parentNode, events, nameSpace="HTML"){
        this.elm = document.createElementNS(NS[nameSpace], elm);
        this.setAttribs(attribs);//console.log(parentNode);
        if(parentNode&& parentNode.elm) parentNode.elm.appendChild(this.elm);
        for(let evt in events) {
            this.elm.addEventListener(evt, events[evt],true);
        }
    }
    setAttribs(Opt) {
        let elm = this.elm;
        for(let attrib in Opt) {
            elm.setAttribute(attrib,Opt[attrib]);
        }
    }
    };})();
class divWithText extends DOMObject{
    constructor(text, parentNode) {
        super("div", {}, parentNode);
        this.elm.innerText = text;
    }
}
class SpinBox {
  constructor(Opt, P, Events) {
    this.values= {
        max:Number.MAX_VALUE,
        min:-Number.MAX_VALUE,
        skip: 1,
        "big-skip":5,
        value:0
      },
    this.boundary = {
        display:"block",
        margin:"0px",
        border:"0px",
        padding:"0px"
    }
    let that = this;
    let container = new DOMObject("div", setStyle(this.boundary, Opt), P);
    setOptions(this.values, Opt);
    let div0 = new DOMObject("div",
          {style:"display:inline-block; vertical-align:middle;"},
          container);
      this.textBox = new DOMObject(
          "input",
          {type:"text", size:"1em", value:this.values.value,
           readonly:"readonly",
           style:"font-size:15px; text-align:right; disable"
          },
          div0);
    let div = new DOMObject("div",
            {style:"display:inline-block;vertical-align:middle"}, container);
    let buttonStyle = {
          style: "font-size:4px;"+
              "margin:0px;"+
              "cursor:default;"+
              "background:lightgray;"+
              "border-color:black;"
    }
    buttonStyle.type = "UP";
    this.buttonUP = new DOMObject(
        "div", buttonStyle, div, {click:E=>{that.up = E.shiftKey;}});
    this.buttonUP.elm.innerText ="▲";
    buttonStyle.type = "DOWN";
    this.buttonDOWN = new DOMObject(
        "div", buttonStyle, div, {click:E=>{that.down = E.shiftKey;}});
    this.buttonDOWN.elm.innerText ="▼";
  }
  get value() {
    return this.values.value;
  }
  set up(shift){
    let skip = shift?this.values["big-skip"]:this.values.skip;
    this.textBox.elm.value = this.values.value =
          Math.min(this.values.value+skip, this.values.max);
  }
  set down(shift){
    let skip = shift?this.values["big-skip"]:this.values.skip;
    this.textBox.elm.value = this.values.value =
          Math.max(this.values.value-skip, this.values.min);
  }
}
