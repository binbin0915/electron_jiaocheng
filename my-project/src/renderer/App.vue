<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  let axios = require('axios')
  import fs from 'fs'
  

  export default {
    name: 'my-project',
    mounted:function(){
      fs.writeFile('input.txt','将hello world写入到input.txt',(err)=>{
      if(err){
          console.log(err)
      }else{
          console.log('写入完毕')
      }
  })
      axios.get('http://www.baidu.com').then((res)=>{
        console.log(res)
      })
    }
  }
</script>

<style>
  /* CSS */
</style>
