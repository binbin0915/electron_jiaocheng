<template>
<div class="booksMain">
    <div class="top">
        <a-button type="primary"  icon="arrow-left" size="large" @click="$router.push('/')">回到首页</a-button>

    </div>
    <div id="books">

        <a-row :gutter="16">
            <a-col :span="8" v-for="(item,i) in books" :key="i" @click="openBook(item)">
                <a-card hoverable style="width: 240px;height:400px">
                    <img
                        slot="cover"
                        alt="example"
                        :src="item.imgUrl"
                    />
                    <a-card-meta :title="item.metadata.title">
                    <template slot="description">
                        作者：{{item.metadata.creator}}
                    </template>
                    </a-card-meta>
                </a-card>
            </a-col>
            
        </a-row>
    </div>
    </div>
</template>


<script>
const EPub = require("epub");

import fs from 'fs'
export default {
    data(){
        return {
            books:[],
            imgUrl:""
        }
    },
    methods:{
        openBook(book){
            console.log('books',book)
            this.$router.push({
                name:'bookDetail',
                params:{
                    book
                }
            })
        }
    },
    mounted(){
       let files = fs.readdirSync('books')
        files.forEach((item,index)=>{
           let epub = new EPub('books/'+item);
            epub.on('end',()=>{
                console.log(epub)
                this.books.push(epub)
                console.log(item)
                epub.getImage(epub.metadata.cover, (error, img, mimeType)=>{
                    console.log(img)
                    
                    // 将二进制buffer数据转化成图片地址
                    epub.imgUrl =  `data:${mimeType};base64,` + img.toString('base64')
                    this.$forceUpdate()
                    console.log(mimeType)
                });
            })
            
            epub.parse()

       })
       
       
    }
}


</script>

<style >
#books{
    padding: 30px;
}
.ant-card-meta-description{
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>