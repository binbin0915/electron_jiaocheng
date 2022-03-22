<template>
  <div id="wrapper">
    <div class="top">
      <div class="search">
        <a-input-search size="large" default-value="javascript" placeholder="请输入要搜索的书籍" enter-button @search="onSearch" />
      </div>
      <div class="bookBtn">
        <a-button type="primary"  icon="appstore" size="large" @click="$router.push('/books')">已下载书籍</a-button>
      </div>
    </div>

    <div class="result">
    <a-table :columns="columns" :data-source="searchList" rowKey="id">
        <img slot="bookPic" style="width:200px" slot-scope="bookPic" :src="bookPic" />
        <div slot="downloadInfos" class="btnlist" slot-scope="downloadInfos,rowData">
          <a-button type="primary"  icon="download" @click="download(downloadInfos[0].url,'epub',rowData.title)" >epub</a-button>
          <a-button type="primary"  icon="download"  @click="download(downloadInfos[1].url,'mobi',rowData.title)"  >mobi</a-button>
          <a-button type="primary" icon="download"  @click="download(downloadInfos[2].url,'zaw3',rowData.title)" >azw3</a-button>
        </div>
      </a-table>

    </div>
  </div>
</template>

<script>
  const fs =require('fs')
  const axios = require('axios')
  const adapter= require('axios/lib/adapters/http');
  axios.defaults.adapter = require('axios/lib/adapters/http');
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width:150
  },
  {
    title:"书名",
    dataIndex: 'title',
    key: 'title',
    width:150
    // slots: { title: 'customTitle' },
    // scopedSlots: { customRender: 'name' },
  },
  {
    title: 'bookPic',
    dataIndex: 'bookPic',
    key: 'bookPic',
    slots: { title: 'bookPic' },
    scopedSlots: { customRender: 'bookPic' },
    width:250
  },
  {
    title: 'description',
    key: 'description',
    dataIndex: 'description'
  },
  {
    title: 'downloadInfos',
    dataIndex: 'downloadInfos',
    key: 'downloadInfos',
    slots: { title: 'downloadInfos' },
    scopedSlots: { customRender: 'downloadInfos' },
    width:400
  },
  
 
];


  import SystemInformation from './LandingPage/SystemInformation'
  // import axios from 'axios'
  export default {
    name: 'landing-page',
    data:function(){
      return {
          searchList:[],
          columns
        }
    },
    methods:{
      onSearch: async function(value){
        console.log(axios.defaults.adapter)
        console.log(adapter)
        
        let res = await this.$http.get('https://www.shiyisoushu.com/api/search/v3?q='+ encodeURI(value))
        this.searchList = res.data.data.content
        console.log(res)
      },
      download(url,ext,title){
        console.log(url)
        console.log(ext)
        console.log(title)
        // 判断下载的链接地址是否存在，如果不存在则直接跳出
        if(!url)return;
        // 判断当前目录下是否有books这个目录
        if(!fs.existsSync('books')){
          // 如果没有就创建目录
          fs.mkdirSync('books')
        }
        axios({
          method:'get',
          url:url,
          responseType:'stream'
        })
        .then((response)=> {
          console.log(response)
          console.log(`${title}.${ext}`)
          this.$message.info(`《${title}》书籍开始下载，请耐心等候！`,2);
          response.data.pipe(fs.createWriteStream(`books/${title}.${ext}`))
          response.data.on('end',()=>{
            console.log("下载完毕")
            this.$notification.open({
              message: "下载完毕",
              description:
                `《${title}》书籍下载完毕`,
              onClick: () => {
                console.log('Notification Clicked!');
              },
            });
          })
        });
      }

    }
  }
</script>

<style>
 #wrapper{
   padding: 30px;
 }
 .search{
   margin-bottom: 30px;
 }
 .btnlist{
   display: flex;
   justify-content: center;
 }
 .btnlist .ant-btn{
   margin:0 5px;
 }

 .top{
   width: 100%;
   display: flex;
   justify-content: space-between;
 }
 .top .search{
   width: 70%;
 }
</style>
