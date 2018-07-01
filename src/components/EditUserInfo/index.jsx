import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less'


class EditUserInfo extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
      <div>
        <div className="M-jxE">
          <button className="IalUJ " title="添加头像"><img alt="添加头像" className="be6sR" src="https://scontent-frx5-1.cdninstagram.com/vp/da767c5fe26fe6a419aad4f352e7f45a/5BE3737A/t51.2885-19/11906329_960233084022564_1448528159_a.jpg"/></button>
        </div>
        <div className="XX1Wc">
          <h1 className="kHYQv " title="username">username</h1>
          <a className="LUEBY" href="#">编辑头像</a>
          //如何做到不仅隐藏文件选择框，还实现文件选择
          <div>
            <form encType="multipart/form-data"><input accept="image/jpeg,image/png" className="tb_sK" type="file"/>
                </form>
          </div>
        </div>
        <form className="kWXsT">
          <div className="eE-OA">
            <aside className="sxIVS  "><label htmlFor="pepName">姓名</label></aside>
            <div className="ada5V"><input className="JLJ-B zyHYP" id="pepName" type="text" value="名称"/></div>
          </div>
          <div className="eE-OA">
            <aside className="sxIVS  "><label htmlFor="pepUsername">帐号</label></aside>
            <div className="ada5V"><input className="JLJ-B zyHYP" aria-required="true" id="pepUsername" type="text"
                                          value="用户账户"/></div>
          </div>
          <div className="eE-OA">
            <aside className="sxIVS  "><label htmlFor="pepWebsite">网站</label></aside>
            <div className="ada5V"><input className="JLJ-B zyHYP" aria-required="false" id="pepWebsite" type="text"
                                          value="额，不知道填什么"/></div>
          </div>
          <div className="eE-OA">
            <aside className="sxIVS  "><label htmlFor="pepBio">个人简介</label></aside>
            <div className="ada5V"><input className="JLJ-B zyHYP" aria-required="false" id="pepBio" type="text"
                                          value="没什么爱好"/></div>
          </div>
          <div className="eE-OA">
            <aside className="sxIVS  tvweK"><label></label></aside>
            <div className="ada5V">
              <div className="VWvNL"><h2 className="JJF77">私人信息</h2></div>
            </div>
          </div>
          <div className="eE-OA">
            <aside className="sxIVS  "><label htmlFor="pepEmail">邮箱</label></aside>
            <div className="ada5V"><input className="JLJ-B zyHYP" aria-required="false" id="pepEmail" type="text"
                                          value=""/></div>
          </div>
          <div className="eE-OA">
            <aside className="sxIVS  "><label htmlFor="pepPhone Number">电话号码</label></aside>
            <div className="ada5V"><input className="JLJ-B zyHYP" aria-required="false" id="pepPhone Number" type="text"
                                          value="+86 188 0515 6570"/></div>
          </div>
          <div className="eE-OA">
            <aside className="sxIVS  "><label htmlFor="pepGender">性别</label></aside>
            <div className="ada5V">
              <select
                id="pepGender" className="zOJg- iFMgT">
                <option value="1">男</option>
                <option value="2">女</option>
                <option value="3">未指定</option>
              </select>
            </div>
          </div>
          //按钮隐藏没有实现
          <div className="eE-OA">
            <aside className="sxIVS "><label></label></aside>
            <div className="ada5V">
              <div className="fi8zo"><span className="_1OSdk"><button
                className="_5f5mN       jIbKX  _6VtSN    pm766    " disabled="">提交</button></span><a className="M8zL6"
                                                                                                     href="#">暂时停用我的帐户</a>
              </div>
            </div>
          </div>
        </form>
      </div>

    );
  }


}



export default EditUserInfo;
