module.exports = function(template,product){
    let output = template.replace('{{%%NAME%%}}',product.name)
    output = output.replace('{{%%MODELNAME%%}}', product.modelname)
    output = output.replace('{{%%MODELNO%%}}', product.modelname)
    output = output.replace('{{%%MODELNAME%%}}', product.modelnumber)
    output = output.replace('{{%%SIZE%%}}', product.modelname)
    output = output.replace('{{%%CAMERA%%}}', product.camera)
    output = output.replace('{{%%PRICE%%}}', product.price)
    output = output.replace('{{%%COLOR%%}}', product.color)
    output = output.replace('{{%%ID%%}}', product.id)

    return output;
}