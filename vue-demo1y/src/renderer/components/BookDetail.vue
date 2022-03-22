<template>
    <div>
        
        <a-button type="primary"  icon="arrow-left" size="large" @click="$router.push('/books')">已下载书籍</a-button>

        <div id="bookMain">
            <div id="left">
                <a-menu
                    style="width: 256px"
                    mode="inline"
                    v-if="book.flow"
                    >
                    <a-menu-item @click="toggleContent(item)"  key="sub1" v-for="(item,index) in book.flow" :key="index" v-if="item.title" >
                        <span><a-icon type="reddit" /><span>{{item.title}}</span></span>
                    </a-menu-item >
      
                </a-menu>

            </div>
            <div id="right">
                <div v-html="content"></div>
            </div>
        </div>
    </div>
</template>

<script>
import cheerio from 'cheerio'
export default {
    data:function(){
        return {
            content:"",
            book:{imgUrl:""},
            imgObj:{},
            css:""
        }
    },
    methods:{
        toggleContent(chapter){
            this.book.getChapterRaw(chapter.id,(error,text)=>{
                // console.log(error)
                // console.log(text)
                // console.log(text)
                const $ = cheerio.load(text)
                $('body').append(`<style>${this.css}</style>`);
                $('img').each((i,item)=>{
                    // console.log(item)
                    // 通过src获取id
                    let src = $(item).attr('src')
                    if(src.indexOf("../")!=-1){
                        console.log(src)
                        src = src.slice(3,src.length)
                    }else if(src.indexOf(".gif")!=-1){
                        return
                    }else{
                        src = 'Images/'+src
                    }
                    console.log(src)
                    
                    console.log(this.imgObj[src])
                    let imgId = this.imgObj[src].id
                    $(item).attr('src',"")
                    // console.log(imgId)
                    this.book.getImage(imgId, (error, img, mimeType)=>{
                            // console.log(img)
                            // 将二进制buffer数据转化成图片地址
                            $(item).attr('src',`data:${mimeType};base64,` + img.toString('base64'))
                            // console.log(mimeType)
                             this.content = $('body').html();
                    });
                })

                
                
                // console.log($('body').html())
                
                this.content = $('body').html();


            })
        }
    },
    mounted(){
        
        console.log(this.$route.params)
        
        this.book = this.$route.params.book; 
        if(!this.book){
            this.$router.push('/books')
            return;
        }
        for(let key in this.book.manifest){
            if(this.book.manifest[key].href.indexOf('OEBPS/')!=-1){
                let href = this.book.manifest[key].href;
                href = href.slice(6,href.length)
                this.imgObj[href] = this.book.manifest[key]
            }else{
                let href = this.book.manifest[key].href;
                this.imgObj[href] = this.book.manifest[key]
            }
            
        }
        console.log(this.imgObj)
        this.book.getFile("css", (error, data, mimeType)=>{
            this.css = data.toString()
        });
            
        
        


        this.content = `<img src="${this.book.imgUrl}">`

        // this.book.flow.forEach((chapter)=>{
        //     // console.log(chapter)
        //     // console.log("目录："+chapter.id)
        //     // epub.getChapter(chapter.id,(error,text)=>{
        //     //     // console.log(error)
        //     //     // console.log(text)
        //     //     this.chapters.push(text)
        //     // })
        // })
    }
}
</script>


<style >
#bookMain{
    display: flex;
}
/* #bookMain #left{
    width: 400px;
} */
#bookMain #right{
    flex:1;
    padding: 30px;
}
</style>