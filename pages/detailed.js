import React from "react";
import Head from 'next/head'
import {Affix, Breadcrumb, Col, Row} from 'antd'

import axios from 'axios'

import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/footer";
import "markdown-navbar/dist/navbar.css"


import {CalendarOutlined, FireOutlined, HomeOutlined, MessageOutlined, UserOutlined} from "@ant-design/icons";
import "../public/style/pages/detailed.css"

import marked from "marked"
import hljs from "highlight.js"
import "highlight.js/styles/monokai-sublime.css"

import Tocify from "../components/tocify.tsx";

import servicePath from "../config/apiUrl";


const Detailed = (props) => {

    const tocify = new Tocify()
    const renderer = new marked.Renderer();

    renderer.heading = function(text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });

    let html = marked(props.article_content)


    return (
        <div>
            <Head>
                <title>Detailed</title>
            </Head>
            <Header/>
            <Row className='comm-main' type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    {/*面包屑导航*/}
                    <div>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">
                                <HomeOutlined/>
                                <span>首页</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <UserOutlined/>
                                <span>{props.typeName}</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <span>{props.title}</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="detailed-title">
                        {props.title}
                    </div>
                    <div className="list-icon center">
                        <CalendarOutlined/>{props.addTime}
                        <MessageOutlined/>{props.typeName}
                        <FireOutlined/>{props.view_count}
                    </div>
                    <div className="detailed-content" dangerouslySetInnerHTML={{__html:html}}>
                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author/>
                    <Advert/>
                    {/*文章目录*/}
                    <Affix offsetTop={5}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            {tocify && tocify.render()}
                        </div>
                    </Affix>
                </Col>
            </Row>
            <Footer/>
        </div>
    )
}

//接收传过来的id所以要接收上下文
Detailed.getInitialProps = async(context)=>{

    let id =context.query.id;
    const promise = new Promise((resolve)=>{

        axios(servicePath.getArticleById+id).then(
            (res)=>{
                resolve(res.data.data[0])
            }
        )
    })

    return await promise
}

export default Detailed

