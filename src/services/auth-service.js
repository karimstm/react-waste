
import * as jwt from 'jsonwebtoken'
import * as moment from 'moment';

class AuthService {
    
    tokenKey = 'auth_token';

    getToken(tokenKey = null) {
        if (tokenKey == null)
            return localStorage.getItem(this.tokenKey); // this to retrieve login token key
        return localStorage.getItem(tokenKey); // this to ket mercure token key
    }

    invalidateUser() {
        localStorage.removeItem(this.tokenKey);
    }

    saveToken(token, tokenKey = null) {
        if (tokenKey == null)
            localStorage.setItem(this.tokenKey, token);
        else
            localStorage.setItem(tokenKey, token);
    }

    decode(token) {
        return jwt.decode(token);
    }

    getExpiration(token) {
        const exp = this.decode(token).exp;
        return moment.unix(exp);
    }

    getUsername()
    {
        const token = this.decode(this.getToken());
        return token.username;
    }

    getRoles(token) {
        let role = '';
        if (token)
        {
            const roles = this.decode(token).roles;
            if (roles)
            {
                role = roles[0];
            }
            return role;
        }
        return role;
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