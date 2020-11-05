import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';

@Injectable()
export class JurpersService{

    private url = "http://192.168.0.60:88/api/GetJP";
    private url2 = "http://192.168.0.60:88/api/GetJurpers";
    private url3 = "http://192.168.0.60:88/api/GetJurpers";
    constructor(private http: HttpClient){ }

    getJurpers(){
        return this.http.get(this.url2);
    }

    getAllJurpers(){
        return this.http.get(this.url2);
    }
    getJurpersCode(code: string){
        return this.http.get(this.url3 + '/' + code);
    }
    createUser(user: User){
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post(this.url, JSON.stringify(user), {headers: myHeaders});
    }
    updateUser(user: User) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put(this.url, JSON.stringify(user), {headers:myHeaders});
    }
    deleteUser(id: number){
        return this.http.delete(this.url + '/' + id);
    }
}