
import * as jwt from 'jsonwebtoken'
import * as moment from 'moment';

class AuthService {
    
    tokenKey = 'auth_token';

    getToken() {
        return localStorage.getItem(this.tokenKey)
    }

    invalidateUser() {
        localStorage.removeItem(this.tokenKey);
    }

    saveToken(token) {
        localStorage.setItem(this.tokenKey, token);
    }

    decode(token) {
        return jwt.decode(token);
    }

    getExpiration(token) {
        const exp = this.decode(token).exp;
        return moment.unix(exp);
    }

    getRoles(token) {
        let role = '';
        if (token)
        {
            const roles = this.decode(token).roles;
            if (roles)
            {
                role = roles[0];
                console.log(role);
            }
                
            return role;
        }
        
    }

    isPicker()
    {
        return 'ROLE_PICKER';
    }

    isReseller()
    {
        return 'ROLE_RESELLER';
    }

    isBuyer()
    {
        return 'ROLE_BUYER';
    }

    isValid(token) {
        return moment().isBefore(this.getExpiration(token));
    }

    isAuthenticated() {
        const token = this.getToken();
        return (token && this.isValid(token)) ? true : false;
    }
}

export default new AuthService();