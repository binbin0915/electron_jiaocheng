let fs = require('fs')

console.log(fs)

fs.writeFile('input.txt','将hello world写入到input.txt',(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('写入完毕')
    }
})

let btn = document.querySelector('button')
let i = 0;
btn.onclick = function(){
    i++;
    fs.writeFile(`input${i}.txt`,'按钮写入的内容',(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log('写入完毕')
        }
    })
}