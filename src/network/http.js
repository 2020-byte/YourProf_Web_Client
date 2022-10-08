export default class HttpClient {
constructor(baseURL, authErrorEventBus) {
    this.baseURL = baseURL;
    this.authErrorEventBus = authErrorEventBus;
}

async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });
    let data;
    try {
        data = await res.json();
    } catch (error) {
        console.error(error);
    }

    if (res.status > 299 || res.status < 200) {
    const message =
        data && data.message ? data.message : 'Something went wrong! ';
    const error = new Error(message);
    if (res.status === 401) {
        this.authErrorEventBus.notify(error);
        //export class AuthErrorEventBus {
        //     listen(callback) {
        //       this.callback = callback;
        //     }
        //     //listen을 통해서 실행할 콜백함수를 받고
        //
        //     notify(error) {
        //       this.callback(error);
        //     }
        //     //notify를 통해서 받은 콜백함수에 error를 매개변수로 던져주고 그 콜백함수를 실행함.
        //    
        //   }
        //토큰이 만료되면 authErrorEventBus.notify가 실행되고
        //notify는 error라는 매개변수를 가지고 listen을 통해서 받은 콜백함수를 실행시킴
        //콜백함수는 user을 undefined하도록 만드는 걸꺼임. 
        return;
    }
        throw error;
    }
        return data;
    }
}
