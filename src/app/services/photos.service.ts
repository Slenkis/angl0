import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

export class Photo {
  constructor(
    public id: number,
    public owner_id: number,
    public album_id: number,
    public date: number,
    public url: string
  ) {
  }
}

@Injectable({providedIn: 'root'})
export class PhotosService {
  constructor(private http: HttpClient) {}

  fetchPhotos(profileId: number, offset: number): Observable<Photo[]> {
    const params = new HttpParams()
      .set('offset', `${offset}`)
    return this.http
      .get<Photo[]>(`${environment.serverUrl}/api/${profileId}/photos`, {params})
  }
}
