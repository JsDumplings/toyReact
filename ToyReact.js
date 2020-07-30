class ElementWrapper{
    constructor(type){
        this.root = document.createElement(type)
    }
    setAttribute(name,value){
        if(name.match(/^on([\s\S]+)$/)){
            let eventName = RegExp.$1.replace(/^[\s\S]/,s => s.toLowerCase())
            this.root.addEventListener(eventName,value)
        }
        if(name === "className")
            name = "class"
        this.root.setAttribute(name,value)
        // console.log('this.root',this.root)
    }
    appendChild(vchild){
        let range = document.createRange()
        // console.log('this.root',this.root)
        if(this.root.children.length){
            range.setStartAfter(this.root.lastChild)
            range.setEndAfter(this.root.lastChild)
        } else {
            range.setStart(this.root,0)
            range.setEnd(this.root,0)
        }
        vchild.mountTo(range)
    }
    mountTo(range){
        range.deleteContents()
        range.insertNode(this.root)
    }
}
class TextWrapper{
    constructor(type){
        this.root = document.createTextNode(type)
    }
    mountTo(range){
        range.deleteContents()
        range.insertNode(this.root) 
    }
}

export class Component {
    constructor(){
        this.children = []
        // 该种方式可以最简创建一个没有冗余内容的空对象
        this.props = Object.create(null)
    }
    mountTo(range){
        this.range = range
        this.updata() 
    }
    updata(){
        //创建注释节点
        let placeholder = document.createComment("placehoder")
        //创建range对象
        let range = document.createRange()
        //精细选择节点，setStart(参照节点，节点偏移量)，以0为基数，空格也算一个文本字符，占一个偏移量
        //range.endContainer --返回range对象结束的node，用于改变一个节点结束的位置

        //
        range.setStart(this.range.endContainer,this.range.endOffset)
        range.setEnd(this.range.endContainer,this.range.endOffset)
        range.insertNode(placeholder)

        this.range.deleteContents()

        let vdom =this.render()
        vdom.mountTo(this.range)

        // placeholder.parentNode .replaceChild(placeholder)
    }
    setAttribute(name,value){
        this.props[name] = value
        this[name] = value
    }
    appendChild(vchild){
        this.children.push(vchild) 
    }
    setState(state){
        let merge = (oldState,newState) => {
            for(let p in newState) {
                if(typeof newState[p] === "object"){
                    if(typeof oldState[p] !== "object"){
                        oldState[p] = {}
                    }
                    merge(oldState[p],newState[p])
                } else {
                   oldState[p] = newState[p]
                }
            }
        }
        if(!this.state && state)
            this.state = {}
        merge(this.state,state)
        this.updata()
    }
}

export let ToyReact = {
    createElement(type,attributes,...children)
        {
            let element
            // console.log("type",type,"atrributes",attributes,"children",...children)
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
                    // console.log('child',child,typeof(child))
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
            let range = document.createRange()
            if(element.children.length){
                range.setStartAfter(element.lastChild)
                range.setEndAfter(element.lastChild)
            } else {
                range.setStart(element,0)
                range.setEnd(element,0)
            }
            vdom.mountTo(range)
        }
}