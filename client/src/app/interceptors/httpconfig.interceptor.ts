
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from  localstorage.
        const authToken = localStorage.getItem('Token');
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        

        if (authToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + authToken)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
        // send cloned request with header to the next handler.
        
    }
}
