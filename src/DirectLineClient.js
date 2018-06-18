class DirectLineClient {
    constructor(secret) {
        this.secret = secret;
        this.token = '';
        this.conversationId = '';
        this.streamUrl = '';
    }

    startConversation() {
        var self = this;
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + self.token);

        return new Promise(function (resolve, reject) {
            if (self.conversationId !== '') {
                resolve({});
                return;
            }
            fetch('https://directline.botframework.com/v3/directline/conversations', { method: 'POST', headers: headers }).then(function (response) {
                if (!response.ok) {
                    reject(response.statusText);
                }
                else {
                    response.json().then(function (data) {
                        self.streamUrl = data.streamUrl;
                        self.conversationId = data.conversationId;
                        resolve(data);
                    });
                }
            });
        });
    }

    refreshToken() {
        var self = this;

        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + self.token);
        return new Promise(function (resolve, reject) {
            fetch('https://directline.botframework.com/v3/directline/tokens/refresh', { method: 'POST', headers: headers }).then(function (response) {
                if (!response.ok) {
                    reject(response.statusText);
                }
                else {
                    response.json().then(function (data) {
                        self.token = data.token;
                        resolve(data);
                    });
                }
            });
        });
    }


    getMessages(streamEvent) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.secretToToken().then(function () {
                self.startConversation().then(function () {
                    var exampleSocket = new WebSocket(self.streamUrl);
                    exampleSocket.onerror = function (event) {
                        console.log(event);
                    };
                    exampleSocket.onclose = function (event) {
                        console.log(event);
                    };
                    exampleSocket.onopen = function (event) {
                        console.log(event);
                    };
                    exampleSocket.onmessage = function (event) {
                        console.log(event);
                        if (event.data) {
                            streamEvent(JSON.parse(event.data));
                        }
                    };
                }).catch(function (startConversationExeption) {
                    console.log('startConversationExeption:' + JSON.stringify(startConversationExeption));
                });
            }).catch(function (secretToTokenException) {
                console.log('secretToTokenException:' + JSON.stringify(secretToTokenException));
            });
        });
    }


    secretToToken() {
        var self = this;
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + self.secret);

        return new Promise(function (resolve, reject) {
            fetch('https://directline.botframework.com/v3/directline/tokens/generate', { method: 'POST', headers: headers }).then(function (response) {
                if (!response.ok) {
                    reject(response.statusText);
                }
                else {
                    response.json().then(function (data) {
                        self.token = data.token;
                        resolve(data);
                    });
                }
            });
        });
    }

    postMessage(activity) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.refreshToken().then(function () {
                var headers = new Headers();
                headers.append('Authorization', 'Bearer ' + self.token);
                headers.append('Content-Type', 'application/json');

                fetch('https://directline.botframework.com/v3/directline/conversations/' + self.conversationId + '/activities', { method: 'POST', headers: headers, body: JSON.stringify(activity), mode: 'cors' }).then(function (response) {
                    if (!response.ok) {
                        reject(response.statusText);
                    }
                    else {
                        response.json().then(function (data) {
                            resolve(data);
                        });
                    }
                });

            });
        });
    }
}

export default DirectLineClient;