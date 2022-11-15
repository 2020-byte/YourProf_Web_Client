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
    }//TODO: 오류 알아보기(해결됨)
    //getHeaders가 data.js에서만 있었음
    //여기서 새로만들던가 거기서 가져오던가 해야했음


    getHeaders() {
        const token = this.tokenStorage.getToken();
        return {
            Authorization: `Bearer ${token}`,
        };
    }

    async getUserRatings(depId) {
        //undefined을 string으로 전달안하려면 undefined 일 때, 저렇게 ''으로 보내야 함.
        const query = depId && depId !="0"? `${depId}` : '';
        const data =  this.http.fetch(`/account/profile/reviews/${query}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
    }

    async getLikedRatings(depId) {
        const query = depId && depId !="0"? `${depId}` : '';
        const data =  this.http.fetch(`/account/profile/likes/${query}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
    }

    async getLikedRating(ratingId) {
        const data =  this.http.fetch(`/account/like/${ratingId}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
    }

    async postLike(ratingId) {
        const data =  this.http.fetch(`/account/like/${ratingId}`, {
            method: 'POST',
            headers: this.getHeaders(),
        });
        return data;
    }

    async deleteLike(ratingId) {
        return this.http.fetch(`/account/like/${ratingId}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
    }

    async getDisLikedRatings(depId) {
        const query = depId && depId !="0"? `${depId}` : '';
        const data =  this.http.fetch(`/account/profile/dislikes/${query}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
    }

    async getDisLikedRating(ratingId) {
        const data =  this.http.fetch(`/account/dislike/${ratingId}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
    }

    async postDisLike(ratingId) {
        const data =  this.http.fetch(`/account/dislike/${ratingId}`, {
            method: 'POST',
            headers: this.getHeaders(),
        });
        return data;
    }

    async deleteDisLike(ratingId) {
        return this.http.fetch(`/account/dislike/${ratingId}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
    }

    async getBookmarks(depId) {
        const query = depId && depId !="0"? `${depId}` : '';
        const data =  this.http.fetch(`/account/bookmarks/${query}`, {//또 맨앞에 /이거 안넣었어서 오류 떴네
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
    }

    async getBookmark(profId) {
        const data =  this.http.fetch(`/account/bookmark/${profId}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
    }

    async postBookmark(profId) {
        const data =  this.http.fetch(`/account/bookmark/${profId}`, {
            method: 'POST',
            headers: this.getHeaders(),
        });
        return data;
    }

    async deleteBookmark(profId) {
        return this.http.fetch(`/account/bookmark/${profId}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
    }

}
