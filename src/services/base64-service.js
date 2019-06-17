class Base64Service {

    blobToBase64 = (blob, callback) => {
        var reader = new FileReader();
        var data = '';
        reader.onload = function() {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            callback(base64);
        };
        reader.readAsDataURL(blob);
    }

    displayBase64String (formProps) {
        const fd = new FormData();
        const result = [];
        fd.append("imageFile", formProps.imageToUpload[0]);
        console.log(Object.keys(formProps.imageToUpload));
        const outbut = Object.entries(formProps.imageToUpload).map(([key, value]) => {
            return this.blobToBase64(value, (data) => {
              result.push({"file": `data:${value.type};base64,${data}`})  
            })
        });
        return result;
    };

}

export default new Base64Service();