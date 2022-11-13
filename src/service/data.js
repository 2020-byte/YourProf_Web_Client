export default class DataService {
    constructor(http, tokenStorage) {
        this.http = http;
        this.tokenStorage = tokenStorage;
        // this.socket = socket;
    }

    async getDepartments() {
        return this.http.fetch(`/profs/departments`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
    }

    async getProfs(search) {
        const query = search ? `?search=${search}` : '';
        return this.http.fetch(`/profs${query}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
    }

    async getProfswithDepartment(depId, search) {
        const query = search ? `?search=${search}` : '';
        return this.http.fetch(`/profs/departments/${depId}${query}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
    }

    async getProfInfo(profId) {
        const data =  this.http.fetch(`/profs/${profId}`, {    //url 앞에 /이거 빼먹지 않기.
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
    }

    async getRatingsbyProfIdwithCourseId(profId, courseId) {
        const data =  this.http.fetch(`/profs/${profId}/courses/${courseId}`, {    //url 앞에 /이거 빼먹지 않기.
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
    }

    async getRating(profId, ratingId) {
        return  this.http.fetch(`/profs/${profId}/ratings/${ratingId}`, {    //url 앞에 /이거 빼먹지 않기.
            method: 'GET',
            headers: this.getHeaders(),
        });
        //return data안하고 위에꺼 const data = 만 그냥 복사 붙여넣기해서 data 왜 못가져오는 지 헤맸음.
    }

    async postRating(ratingInfo) {
        return this.http.fetch(`/profs/${ratingInfo.profId}/ratings`, {
            method: 'POST',
            headers: this.getHeaders(),
            //요청 전문을 JSON 포멧으로 직렬화화여 가장 중요한 body 옵션에 설정
            body: JSON.stringify({...ratingInfo}),
        });
    }

    async deleteRating(profId, ratingId) {
        return this.http.fetch(`/profs/${profId}/ratings/${ratingId}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
    }

    async updateRating(ratingInfo, ratingId) {
        return this.http.fetch(`/profS/${ratingInfo.profId}/ratings/${ratingId}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({...ratingInfo }),
        });
    }

    getHeaders() {
        const token = this.tokenStorage.getToken();
        return {
            Authorization: `Bearer ${token}`,
        };
    }

    // onSync(callback) {
    //     return this.socket.onSync(, callback);
    // }

    async getUserInfo() {
        const data =  this.http.fetch(`/account/profile`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
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

    async getDisLikedRatings(depId) {
        const query = depId && depId !="0"? `${depId}` : '';
        const data =  this.http.fetch(`/account/profile/dislikes/${query}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
    }

}
