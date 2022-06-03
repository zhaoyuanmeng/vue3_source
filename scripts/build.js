// 把package目录下的所有包都打包

// 1.先拿到所有的模块
const fs = require('fs')

const execa = require('execa') //开启子进程 调用rollup打包


const target =  fs.readdirSync('packages').filter((f)=>{
    if(!fs.statSync(`packages/${f}`).isDirectory){
        return false
    }
    return true
})
// 对我们的目标依次进行打包 并行打包

async function build(target){
    await execa('rollup',['-c','--environment',`Target:${target}`],{stdio:'inherit'})
}

function parallel(targets,build){
    let res = []
    for(const target of targets ){
        let r = build(target)
        res.push(r)
    }
    return Promise.all(res)
}

parallel(target,build)
