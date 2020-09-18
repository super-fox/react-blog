import React, {useState} from "react";
import Head from 'next/head'
import Link from 'next/link'
import Header from "../components/Header";
import {Col, Icon, List, Row} from 'antd'
import '../public/style/pages/index.css'
import axios from 'axios'
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/footer";

import servicePath from "../config/apiUrl";

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const Home = (list) => {
    const [mylist, setMylist] = useState(list.data)

    const renderer = new marked.Renderer();
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
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>
            <Header/>
            <Row className='comm-main' type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <List
                        header={<div>最新日志</div>}
                        itemLayout="vertical"
                        dataSource={mylist}
                        renderItem={item => (
                            <List.Item>
                                <div className="list-title">
                                   <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                                       <a>{item.title}</a>
                                   </Link>
                                </div>
                                <div className="list-icon">
                                    <span><Icon type="calendar"/>{item.addTime}</span>
                                    <span><Icon type="folder"/> {item.typeName}</span>
                                    <span><Icon type="fire"/> {item.view_count}</span>
                                </div>
                                <div className="list-context"
                                     dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                                ></div>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author/>
                    <Advert/>
                </Col>
            </Row>
            <Footer/>
        </div>
    )
}

//读取首页数据
Home.getInitialProps = async () => {
   const promise = new Promise((resolve => {
       axios(servicePath.getArticleList).then(
           (res)=>{
               console.log('-----',res.data)
               resolve(res.data)
           }
       )
   }))
    return await promise
}

export default Home

