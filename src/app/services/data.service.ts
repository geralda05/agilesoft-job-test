import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root',
  })

export class DataService {
    constructor(public auth: AuthService) {}

    async getNewMovies(page : (number | undefined)) {
        try {
          const response = await this.auth.HTTPrequest({
            method: 'get',
            url: environment.MOVIES.NEW+(page ? `?page=${page}` : ''),
            timeout: this.auth.timeoutHTTP,
            headers: this.auth.formatHeader()
          });

          console.log(response.data);

          return response;
        } catch (error:any) {
          
          throw error
        }
      }

    async getPopularMovies(page : (number | undefined)) {
        try {
            const response = await this.auth.HTTPrequest({
            method: 'get',
            url: environment.MOVIES.POPULAR+(page ? `?page=${page}` : ''),
            timeout: this.auth.timeoutHTTP,
            headers: this.auth.formatHeader()
            });

            console.log(response.data);

            return response;
        } catch (error:any) {
            
            throw error
        }
    }

    async getDetailMovie(id : (string | null)) {
        try {
            const response = await this.auth.HTTPrequest({
            method: 'get',
            url: environment.MOVIES.DETAIL(id),
            timeout: this.auth.timeoutHTTP,
            headers: this.auth.formatHeader()
            });

            return response;
        } catch (error:any) {
            
            throw error
        }
    }
    
}