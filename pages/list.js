import React, {useEffect, useState} from "react";
import Head from 'next/head'
import Header from "../components/Header";
import {Breadcrumb, Col, Icon, List, Row} from 'antd'
import {HomeOutlined, UserOutlined} from '@ant-design/icons';

import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/footer";

import axios from "axios"
import servicePath from "../config/apiUrl";
import Link from "next/link"


const MyList = (list) => {
    const [myList, setMyList] = useState(list.data)
    useEffect(()=>{
        setMyList(list.data)
    })
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>
            <Header/>
            <Row className='comm-main' type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">
                                <HomeOutlined/>
                                <span>首页</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <UserOutlined/>
                                <span>视频教程</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <List
                        header={<div>最新日志</div>}
                        itemLayout="vertical"
                        dataSource={myList}
                        renderItem={item => (
                            <List.Item>
                                <div className="list-title">
                                    <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                                        <a>{item.title}</a>
                                    </Link>
                                </div>
                                <div className="list-icon">
                                    <span><Icon type="calendar" />{item.addTime}</span>
                                    <span><Icon type="folder" /> {item.typeName}</span>
                                    <span><Icon type="fire" />  {item.view_count}人</span>
                                </div>
                                <div className="list-context">{item.introduce}</div>
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

MyList.getInitialProps = async (context) => {
    let id = context.query.id
    const promise = new Promise((resolve => {
        console.log(id)
        axios(servicePath.getListById+id).then(
            (res)=>{
                resolve(res.data)
            }
        )
    }))
    return await promise
}

export default MyList

