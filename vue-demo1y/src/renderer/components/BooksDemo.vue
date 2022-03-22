<template>
    <div>
        <div v-html="chapters[0]"></div>
        <img :src="imgUrl" alt="">
    </div>
</template>


<script>
const EPub = require("epub");

import fs from 'fs'
export default {
    data(){
        return {
            chapters:[],
            imgUrl:""
        }
    },
    mounted(){
       let files = fs.readdirSync('books')
        let file = files[0]
       let epub = new EPub('books/'+file);
       epub.on('end',()=>{
           console.log(epub)
           epub.flow.forEach((chapter)=>{
                // console.log(chapter)
                // console.log("目录："+chapter.id)
                epub.getChapter(chapter.id,(error,text)=>{
                    // console.log(error)
                    // console.log(text)
                    // this.chapters.push(text)
                })
            })
            epub.getImage("cover", (error, img, mimeType)=>{
                console.log(img)
                
                // 将二进制buffer数据转化成图片地址
                this.imgUrl = `data:${mimeType};base64,` + img.toString('base64')

                console.log(mimeType)
            });
           
           
       })
       
       epub.parse()
       
    }
}


</script>