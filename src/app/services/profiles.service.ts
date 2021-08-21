import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

export class Profile {
  constructor(public id: number, public name: string) {
  }
}

@Injectable({providedIn: 'root'})
export class ProfilesService {
  constructor(private http: HttpClient) {
  }

  addProfile(id: number, name: string) {
    const params = new HttpParams().append('name', name)
    return this.http
      .put(`${environment.serverUrl}/profiles/${id}`, null, {params, observe: 'response'})
  }

  fetchProfiles(): Observable<Profile[]> {
    return this.http
      .get<Profile[]>(`${environment.serverUrl}/profiles`)
  }

  removeProfile(id: number) {
    return this.http
      .delete(`${environment.serverUrl}/profiles/${id}`, {observe: 'response'})
  }
}
