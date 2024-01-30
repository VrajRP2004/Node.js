const http = require("http")

const fs = require("fs")

const html = fs.readFileSync("./Template/index.html", 'utf-8');

const products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8'));

let productListHtml = fs.readFileSync('./Template/product-list.html', 'utf-8')

let productHtmlArray = products.map((prod)=>{
    let output = productListHtml.replace('{{%%NAME%%}}',prod.name)
    output = output.replace('{{%%MODELNAME%%}}', prod.modelname)
    output = output.replace('{{%%MODELNO%%}}', prod.modelname)
    output = output.replace('{{%%MODELNAME%%}}', prod.modelnumber)
    output = output.replace('{{%%SIZE%%}}', prod.modelname)
    output = output.replace('{{%%CAMERA%%}}', prod.camera)
    output = output.replace('{{%%PRICE%%}}', prod.price)
    output = output.replace('{{%%COLOR%%}}', prod.color)

    return output;
})

const server = http.createServer((req,res)=>{
    let path = req.url;
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
        let productresponseHtml = html.replace('{{%%CONTENT%%}}',productHtmlArray.join(','))
        res.writeHead(200,{
            'Contant-Type': 'text/html'
        })
        res.end(productresponseHtml)
    }
    else {
        res.writeHead(404,{
            'Content-Type':'text/html'
        });
        res.end(html.replace('{{%%CONTENT%%}}',"Error 404 page not found"))
    }
    // res.end(html);
    // console.log("vraj")
})

server.listen(8000,'127.0.0.1',()=>{
    console.log("created")
})