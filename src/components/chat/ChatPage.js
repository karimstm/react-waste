import React, { Component } from 'react';

class ChatPage extends Component {
    render() {
        return (
            <div className="messageBox row m-4">
                <div className="col-md-4 pl-0 col-sm-12">
                    <div className="list-names">
                        <ul className="list-group">
                            <li className="list-group-item border-0 p-0">
                                <input type="text" placeholder="Nom du destinataire" className="form-control" />
                            </li>
                            <li className="list-group-item"><a href="#">John Doe</a></li>
                            <li className="list-group-item"><a href="#">Mohamed Ali</a></li>
                            <li className="list-group-item"><a href="#">Zakaria Said</a></li>
                            <li className="list-group-item"><a href="#">Karim Ahmed</a></li>
                            <li className="list-group-item"><a href="#">Bilal Rafah</a></li>
                        </ul>
                    </div>
                </div>
                <div className="chat-box col-md-8 col-sm-12">
                    <div className="messages clearfix">
                        <ul>
                            <li className="sent">
                                <span>P</span>
                                <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
                            </li>
                            <li className="replies">
                                 <span>You</span>
                                <p>When you're backed against the wall, break the damn thing down.</p>
                            </li>
                        </ul>
                    </div>
                    <div className="message-input clearfix">
                        <div className="row">
                            <div className="col-10">
                                <textarea type="text" placeholder="Votre Message" className="border form-control" ></textarea>
                            </div>
                            <div className="col-2 text-right">
                                <button className="btn btn-warning mb-2" ><i class="fas fa-paper-plane"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatPage;