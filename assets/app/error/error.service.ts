import {EventEmitter} from "@angular/core";

import {Error} from "./error.model";

export class ErrorService {
    errorOccured = new EventEmitter<Error>();

    errorHandle(error: any){
        const e = new Error(error.title, error.error.message);
        this.errorOccured.emit(e);
    }
}