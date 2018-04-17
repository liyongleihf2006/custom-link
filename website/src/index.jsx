import React from "react";
import { render } from "react-dom";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import CustomLink, { isPathEqual } from "custom-link";
const customHistory = createBrowserHistory();
const CustomLinkExample = () => {
    return (
        <div>
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
                                    if (!isPathEqual(to, location)) {
                                        history.push(to);
                                    } else {
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
                                    if (!isPathEqual(to, location)) {
                                        history.push(to);
                                    } else {
                                        /* //打开这个注释,那么每次都会重新刷新对应的路由组件，否则当连续访问同一个路由则只刷新一次
                                        history.replace(to); */
                                    }
                                }}>About</button>)
                            }} />
                        </li>
                    </ul>
                    <hr />

                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                </div>
            </Router>
            <button onClick={() => {
                const to = "/about";
                const { location } = customHistory;
                if (!isPathEqual(to, location)) {
                    customHistory.push(to);
                } else {
                    /* //打开这个注释,那么每次都会重新刷新对应的路由组件，否则当连续访问同一个路由则只刷新一次
                    customHistory.replace(to); */
                }
            }}>跳转到about页</button>
        </div>

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