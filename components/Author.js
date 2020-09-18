import React from "react";
import {Avatar, Divider,Tag} from "antd"
import {GithubOutlined, QqOutlined, WechatOutlined} from "@ant-design/icons"
import "../public/style/components/author.css"

const Author = () => {
    return (
        <div className="author-div comm-box">
            <Avatar size={60}
                    src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1309877745,2071506778&fm=26&gp=0.jpg"/>
            <div className="author-introduction">
                努力搬砖
            </div>
            <div>
                <Tag color="magenta">我是萝莉</Tag>
                <Tag color="blue">长得好看</Tag>
                <Tag color="gold">努力成为富婆</Tag>
                <Tag color="green">幸福的小孩</Tag>
            </div>
            <Divider>社交账号</Divider>
            <Avatar size={28} icon={<GithubOutlined/>} className="account"/>
            <Avatar size={28} icon={<WechatOutlined/>} className="account"/>
            <Avatar size={28} icon={<QqOutlined/>} className="account"/>
        </div>
    )

}

export default Author
