import React, {useEffect, useState} from "react";
import '../public/style/components/header.css'
import {Col, Menu, Row} from 'antd'
import {HomeOutlined} from '@ant-design/icons'
import Router from "next/router";
import axios from "axios"
import servicePath from "../config/apiUrl";


const Header = () => {


    const [navArray, setNavArray] = useState([]);
    //第二个参数为空，是旨在一开始执行一次
    useEffect(() => {
        //异步函数里面不能直接定义一个异步函数
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(res => {
                return res.data.data
            })
            setNavArray(result)
        }
        fetchData()
    }, [])

    //声明跳转
    const handleClick = (e) => {
        if (e.key === 0) {
            Router.push('/index')
        } else {
            Router.push('/list?id=' + e.key)
        }
    }
    return (
        <div className='header'>
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className='header-logo'>小铃铛</span>
                    <span className='header-txt'>模拟博客</span>
                </Col>
                <Col className='menu-div' xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0" icon={<HomeOutlined/>}>
                            首页
                        </Menu.Item>
                        {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.id} icon={<HomeOutlined/>}>
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}
export default Header
