class ElementWrapper{
    constructor(type){
        this.root = document.createElement(type)
    }
    setAttribute(name,value){
        this.root.setAttribute(name,value)
    }
    appendChild(vchild){
        vchild.mountTo(this.root)
    }
    mountTo(parent){
        parent.appendChild(this.root)
    }
}
class TextWrapper{
    constructor(type){
        this.root = document.createTextNode(type)
    }
    mountTo(parent){
        parent.appendChild(this.root)
    }
}

export class Component {
    constructor(){
        this.children = []
    }
    mountTo(parent){
        let vdom =this.render()
        vdom.mountTo(parent)
    }
    setAttribute(name,value){
        this[name] = value
    }
    appendChild(vchild){
        this.children.push(vchild)
    }
}

export let ToyReact = {
    createElement(type,attributes,...children)
        {
            let element
            console.log("type",type,"atrributes",attributes,"children",...children)
            if(typeof type ==="string")
                element = new ElementWrapper(type)
            else
                element = new type

            for(let name in attributes){
                //element[name] = atrributes[name] wrong
                element.setAttribute(name,attributes[name])
            }
            let insertChildren = (children) =>{
                for(let child of children){
                    console.log('child',child,typeof(child))
                    if(typeof child ==="object" && child instanceof Array){
                        insertChildren(child)
                    }else{
                        // 先只处理这三种可知的
                        if(!(child instanceof Component) 
                        && !(child instanceof ElementWrapper)
                        && !(child instanceof TextWrapper))
                            child = String(child)
                         if(typeof child === "string")
                         // child = document.createTextNode(child)
                            child = new TextWrapper(child)
                        element.appendChild(child)
                    }
                }
            }
            insertChildren(children)
            return element
        },
        render(vdom,element) {
            vdom.mountTo(element)
        }
}