let holder = document.querySelector('#holder')
let readList = document.querySelector('#readList')
let fs = require('fs')
holder.addEventListener('drop',(e)=>{
    e.preventDefault();//取消默认
    e.stopPropagation();//阻止冒泡
    console.log(e)
    for(const file of e.dataTransfer.files){
        console.log(file)
        console.log('文件路径：',file.path)
        fs.readFile(file.path,(err,data)=>{
            if(err){
                console.log(err)
            }else{
                let newDiv = document.createElement('div')
                newDiv.className = "readFile"
                newDiv.innerHTML = `
                    <h3>${file.name}</h3>
                    <pre>${data}</pre>
                    
                `
                readList.appendChild(newDiv)
            }
        })
    }
    
})
holder.addEventListener('dragover',(e)=>{
    e.preventDefault();//取消默认
    e.stopPropagation();//阻止冒泡
})

