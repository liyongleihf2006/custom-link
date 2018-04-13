# CustomLink

**概述**

CustomLink是对react-router-dom 下面插件Link的扩展,添加了属性render,以及添加了方法isPathEqual,写它的目的如下:

1. 我想要连续多次点击某个Link的时候,路由的访问记录不要每次都保存到history中,只保留第一次的就好了
2. link我不想写死为一个a标签,我希望其是任意元素或者是任意组合元素,触发方式是任意事件
3. 我顺便在demo中写了一个不通过Link的事件来切换路由的办法,我觉得大部分项目中都可能是用得到的
4. 我顺便在这个扩展插件中扩展了一个叫做isPathEqual的方法,是用来判断两个路由是不是等价的

**使用示例**
```js
import React from "react";
import { render } from "react-dom";
import {Router, Route} from "react-router-dom";
import {createBrowserHistory} from "history";
import CustomLink,{isPathEqual} from "custom-link";
const customHistory = createBrowserHistory();
const CustomLinkExample = () => {
    return (
        <Router history={customHistory}>
            <div>
                <ul>
                    <li>
                        <CustomLink render={(context, props) => {
                            const { router } = context;
                            const { history } = router;
                            const { location } = history;
                            return (<button onClick={() => {
                                const to = "/";
                                if(!isPathEqual(to,location)){
                                    history.push(to);
                                }else{
                                    /* //打开这个注释,那么每次都会重新刷新对应的路由组件，否则当连续访问同一个路由则只刷新一次
                                    history.replace(to); */
                                }
                            }}>Home</button>)
                        }} />
                    </li>
                    <li>
                        <CustomLink render={(context, props) => {
                            const to = "/about";
                            const { router } = context;
                            const { history } = router;
                            const { location } = history;
                            return (<button onClick={() => {
                                if(!isPathEqual(to,location)){
                                    history.push(to);
                                }else{
                                    /* //打开这个注释,那么每次都会重新刷新对应的路由组件，否则当连续访问同一个路由则只刷新一次
                                    history.replace(to); */
                                }
                            }}>About</button>)
                        }} />
                    </li>
                </ul>
                <hr/>
                <button onClick={()=>{
                    const to = "/about";
                    const { location } = customHistory;
                    if(!isPathEqual(to,location)){
                        customHistory.push(to);
                    }else{
                        /* //打开这个注释,那么每次都会重新刷新对应的路由组件，否则当连续访问同一个路由则只刷新一次
                        customHistory.replace(to); */
                    }
                }}>跳转到about页</button>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
            </div>
        </Router>
    )
}
const Home = () => (
    <div>
        home
    </div>
)
const About = () => {
    console.log("refresh");
    return (
        <div>
        about
        </div>
    )
}
render(<CustomLinkExample />, document.querySelector("#example"));
```  
[simple](https://liyongleihf2006.github.io/custom-link/website/index.html)
