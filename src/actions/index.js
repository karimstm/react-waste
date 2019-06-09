import axios from 'axios'


// Auth Actions ------------------



export const register = (userData) => {
    let headers = {
        'Content-Type': 'application/json',
    }
    debugger ;
    return axios.post('http://wastetoresources-env.5aqp9mu79y.eu-west-3.elasticbeanstalk.com/api/collecteur',
    {
        email: userData.email,
        password: userData.password,
        prenom: userData.firstName,
        nom: userData.lastName,
        ville: userData.city,
        addresse: userData.address,
        pays: userData.country,
        telephone: userData.phone

    }, {headers: headers}).then(
       (res) => {
           debugger;
            return res.data;
       },
       (err) => {
           debugger;
            console.log(err);
            return Promise.reject(err.response.data.message);
       })
}