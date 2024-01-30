const http = require("http")
const replaceHtml = require('./Modules/replaceHtml')
const user = require('./Modules/user')
const url = require('url')
const everts = require('events')
const fs = require("fs")

const html = fs.readFileSync("./Template/index.html", 'utf-8');

const products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8'));

let productListHtml = fs.readFileSync('./Template/product-list.html', 'utf-8')
let productDetailHtml = fs.readFileSync('./Template/product-details.html', 'utf-8')

let productHtmlArray = products.map((prod)=>{
    let output = productListHtml.replace('{{%%NAME%%}}',prod.name)
    output = output.replace('{{%%MODELNAME%%}}', prod.modelname)
    output = output.replace('{{%%MODELNO%%}}', prod.modelname)
    output = output.replace('{{%%MODELNAME%%}}', prod.modelnumber)
    output = output.replace('{{%%SIZE%%}}', prod.modelname)
    output = output.replace('{{%%CAMERA%%}}', prod.camera)
    output = output.replace('{{%%PRICE%%}}', prod.price)
    output = output.replace('{{%%COLOR%%}}', prod.color)
    output = output.replace('{{%%ID%%}}', prod.id)

    return output;
})

// function replaceHtml(template,product){   because of replaceHtml.js
//     let output = template.replace('{{%%NAME%%}}',product.name)
//     output = output.replace('{{%%MODELNAME%%}}', product.modelname)
//     output = output.replace('{{%%MODELNO%%}}', product.modelname)
//     output = output.replace('{{%%MODELNAME%%}}', product.modelnumber)
//     output = output.replace('{{%%SIZE%%}}', product.modelname)
//     output = output.replace('{{%%CAMERA%%}}', product.camera)
//     output = output.replace('{{%%PRICE%%}}', product.price)
//     output = output.replace('{{%%COLOR%%}}', product.color)
//     output = output.replace('{{%%ID%%}}', product.id)

//     return output;
// }

// const server = http.createServer((req,res)=>{
//     let {query,pathname: path} = url.parse(req.url,true)
//     // console.log(x)
//     // let path = req.url;
//     if(path==='/' || path.toLocaleLowerCase() ==='/home'){
//         res.writeHead(200,{
//             'Content-Type':'text/html',
//             'my-header' : 'Hellow, world'
//         });
//         res.end(html.replace('{{%%CONTENT%%}}',"You are in Home page"))
//     }
//     else if(path.toLocaleLowerCase() ==='/about'){
//         res.writeHead(200,{
//             'Content-Type':'text/html'
//         });
//         res.end(html.replace('{{%%CONTENT%%}}',"You are in About page"))
//     }
//     else if(path.toLocaleLowerCase() ==='/contact'){
//         res.writeHead(200,{
//             'Content-Type':'text/html'
//         });
//         res.end(html.replace('{{%%CONTENT%%}}',"You are in Contact page"))
//     }
//     else if(path.toLocaleLowerCase() ==='/product'){
//         if(!query.id){
//             let productHtmlArray = products.map((prod)=>{
//                 return replaceHtml(productListHtml,prod);
//             })
//         let productresponseHtml = html.replace('{{%%CONTENT%%}}',productHtmlArray.join(','))
//         res.writeHead(200,{
//             'Contant-Type': 'text/html'
//         })
//         res.end(productresponseHtml)
//     }
//     else{
//         let prod = products[query.id]
//         let productDerailResponseHtml = replaceHtml(productDetailHtml, prod)
//         res.end(html.replace('{{%%CONTENT%%}}',productDerailResponseHtml))
//     }
//     }
//     else {
//         res.writeHead(404,{
//             'Content-Type':'text/html'
//         });
//         res.end(html.replace('{{%%CONTENT%%}}',"Error 404 page not found"))
//     }
//     // res.end(html);
//     // console.log("vraj")
// })

const server = http.createServer()

server.on('req',(req,res)=>{
    let {query,pathname: path} = url.parse(req.url,true)
    // console.log(x)
    // let path = req.url;
    if(path==='/' || path.toLocaleLowerCase() ==='/home'){
        res.writeHead(200,{
            'Content-Type':'text/html',
            'my-header' : 'Hellow, world'
        });
        res.end(html.replace('{{%%CONTENT%%}}',"You are in Home page"))
    }
    else if(path.toLocaleLowerCase() ==='/about'){
        res.writeHead(200,{
            'Content-Type':'text/html'
        });
        res.end(html.replace('{{%%CONTENT%%}}',"You are in About page"))
    }
    else if(path.toLocaleLowerCase() ==='/contact'){
        res.writeHead(200,{
            'Content-Type':'text/html'
        });
        res.end(html.replace('{{%%CONTENT%%}}',"You are in Contact page"))
    }
    else if(path.toLocaleLowerCase() ==='/product'){
        if(!query.id){
            let productHtmlArray = products.map((prod)=>{
                return replaceHtml(productListHtml,prod);
            })
        let productresponseHtml = html.replace('{{%%CONTENT%%}}',productHtmlArray.join(','))
        res.writeHead(200,{
            'Contant-Type': 'text/html'
        })
        res.end(productresponseHtml)
    }
    else{
        let prod = products[query.id]
        let productDerailResponseHtml = replaceHtml(productDetailHtml, prod)
        res.end(html.replace('{{%%CONTENT%%}}',productDerailResponseHtml))
    }
    }
    else {
        res.writeHead(404,{
            'Content-Type':'text/html'
        });
        res.end(html.replace('{{%%CONTENT%%}}',"Error 404 page not found"))
    } 
})

server.listen(8000,'127.0.0.1',()=>{
    console.log("created")
})

// let myEmitter = new everts.EventEmitter();
let myEmitter = new user();


myEmitter.on('userCreated',(id,name)=>{
    console.log(`a new user ${name} with ID ${id} is created!`)
})

myEmitter.on('userCreated',(id,name)=>{
    console.log(`a new user ${name} with ID ${id} is added to database!`)
})
myEmitter.emit('userCreated');
