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

    async postRating(ratingInfo) {
        console.log(ratingInfo);
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

    async updateRating(ratingInfo) {
        return this.http.fetch(`/prof/${ratingInfo.profId}/ratings/${ratingInfo.ratingId}`, {
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
}