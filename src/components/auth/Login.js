import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <section className="mx-auto p-5">
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <form class="login-form">
                            <div class="input-group py-2">
                                <label class="sr-only" for="email">E-mail</label>
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><i class="fas fa-envelope"></i></div>
                                </div>
                                <input type="email" class="form-control" id="email" placeholder="Entez votre e-mail" />
                            </div>
                            <div class="input-group py-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><i class="fas fa-key"></i></div>
                                </div>
                                <label class="sr-only" for="password">Mot de passe</label>
                                <input type="password" class="form-control" placeholder="Mot de passe" />
                            </div>
                            <div class="form-group form-check">
                                <input type="checkbox" class="form-check-input" id="remember" />
                                <label class="form-check-label" for="remember">Se souvenir de moi</label>
                            </div>
                            <div class="form-group form-check">
                                <input type="checkbox" class="form-check-input" id="rememberMe" />
                                <label class="form-check-label" for="rememberMe">Se souvenir de moi</label>
                            </div>
                            <button type="submit" class="btn btn-info btn-block rounded-0">Connexion</button>
                        </form>
                    </div>
                    <div className="col-3"></div>
                </div>
            </section>

        );
    }
}

export default Login;