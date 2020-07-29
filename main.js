import {ToyReact,Component} from "./ToyReact.js"

class MyComponent extends Component{
    render(){
        return <div>
            <span>hello</span>
            <span>world!</span>
            <div>
                {/* this.children 传进了数组 */}
                {this.children}
                
            </div>
        </div>
    }
}
let a = <MyComponent name = "a" id = "ida">
    <div>123</div>
</MyComponent>
// document.body.appendChild(a)


ToyReact.render(
    a,
    document.body
)

/*
var a = ToyReact.createElement("div", {
  name: "a",
  id: "ida"
}, 
ToyReact.createElement("span", null, "Hello"),
 ToyReact.createElement("span", null, "world"), 
 ToyReact.createElement("span", null));
document.body.appendChild(a);
*/