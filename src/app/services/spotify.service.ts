import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log("Spotify Services listo");
   }
   getQuery(query: string ){
     const URL = `https://api.spotify.com/v1/${ query }`;

     const headers = new HttpHeaders({
      'Authorization': 'Bearer BQBMnFhX4YlHUXoPci6CxrnTv1kRHuWtGUL3IlzKsjjxvInsmWeO1OiYB9IdWBivCBem7G_UDTD4lWpbK64'
    });
     return this.http.get(URL , { headers });

   }
   // tslint:disable-next-line: typedef
   getNewReleases(){
     return this.getQuery('browse/new-releases?limit=20').pipe( map(data => data['albums'].items));
   }

   getArtistas(termino: string ){    
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`).pipe(map(data => data['artists'].items));
    /* const headers = new HttpHeaders({
      'Authorization': 'Bearer BQARzraBnC0jGncNxzadp78BOU0OpRSECuTRA8gpwa0C9mFSGIsxkOQWl4IL-adcROyS9ZM2_bUIYwE-uSU'
    }); */

    // tslint:disable-next-line: max-line-length
    /* return this.http.get(`https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=15`, {headers}).pipe(map(data => data['artists'].items)); */
   }
   getArtista(id: string ){    
    return this.getQuery(`artists/${id}`); /* .pipe(map(data => data['artists'].items)) */
   }
   getTopTracks(id: string ){    
    return this.getQuery(`artists/${id}/top-tracks?country=US`) .pipe(map(data => data['tracks'])) ;
   }
}
