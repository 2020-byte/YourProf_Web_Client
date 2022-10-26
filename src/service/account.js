export default class AccountService {
    constructor(http, tokenStorage) {
        this.http = http;
        this.tokenStorage = tokenStorage;
    }

    async getUserInfo() {
        // this.http.hello("account"); http다른 함수 hello는 써지는데 왜 fetch만 안써져 에러를 주는 것도 아니고 아예 연결이 끊겨
        const data =  this.http.fetch(`/account/profile`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
    }//TODO: 오류 알아보기

}
