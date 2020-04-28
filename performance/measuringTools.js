function calculateTypeMemory(input) {
    var totalBytes = 0, arraySize = null;
    if(typeof input==='boolean') {
        totalBytes += 4;
        //arraySize = {type:"boolean", size:4, name:property, value:object[property]};
    } else if(typeof input==='string') {
        totalBytes += input.length * 2;
    } else if(typeof input==='number') {
        totalBytes += 8;
    }
    return [totalBytes, arraySize];
}
function calculateObjectMemory(object, addProperties=false) {
    if(Array.isArray(object) || typeof object=="object") {
        var totalBytes = 0, arraySize = [];
        for(let property in object) {
            if(Array.isArray(object[property]) || typeof object[property]=="object") {
                totalBytes += calculateObjectMemory(object[property]);
            } else {
            let memSizeContext = calculateTypeMemory(object[property]);
            totalBytes += memSizeContext[0];
            arraySize.push(memSizeContext[1]);
            if(addProperties) totalBytes += calculateTypeMemory(property)[0];
            }
        }
        return totalBytes;
    } else return -1;
}
