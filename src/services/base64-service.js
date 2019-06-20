import { IMGE_SIZE } from '../actions/types'

class Base64Service {

    blobToBase64 = (blob, callback) => {
        var reader = new FileReader();
        reader.onload = function () {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            callback(base64);
        };
        reader.readAsDataURL(blob);
    }

    displayBase64String = (formProps) => {
        return new Promise((resolve, reject) => {
            var result = [];
            if (formProps.photos === null || formProps.photos === undefined)
            {
                resolve(result);     
            }
                
            var output = Object.entries(formProps.photos).map(([key, value]) => value);
            output.map(value => {
                if (value.size / (1024 * 1024)  > IMGE_SIZE)
                    reject({"photos": 'La taille de l\'image doit être inférieure à 2 Mo'});
                return this.blobToBase64(value, (data) => {
                    result.push({ "file": `data:${value.type};base64,${data}` });
                    if (result.length === output.length)
                        resolve(result);
                });
            });
        });
    }
}

export default new Base64Service();