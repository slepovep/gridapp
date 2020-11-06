import {TemplateRef, ViewChild} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {Jurpers} from './jurpers';
import {JurpersService} from './jurpers.service';
import {Observable, throwError} from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [JurpersService]
})
export class AppComponent implements OnInit {
    //типы шаблонов
    @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

    jurpers: Jurpers;
    jurpersons: Array<Jurpers>;
    isNewRecord: boolean;
    statusMessage: string;
    inputValue : string = '6283';

    constructor(private serv: JurpersService) {
        this.jurpersons = new Array<Jurpers>();
    }

    ngOnInit() {
        //this.loadJurpers();
        catchError(err => {  
            console.log(err); 
            return throwError(err);
        })
    }
    
    //загрузка
    private loadJurpers() {
        this.serv.getJurpers().subscribe((data: Jurpers[]) => {
            this.jurpersons = data;
        });
    }

    //загрузка всех ЮЛ
     loadAllJurpers() {
        this.serv.getAllJurpers().subscribe((data: Jurpers[]) => {
            this.jurpersons = data;
        });
    }
    // добавление пользователя
 /*   addJurpers() {
        this.editedJurpers = new Jurpers(0,"",0);
        this.Jurperss.push(this.editedJurpers);
        this.isNewRecord = true;
    }
*/

    findJurpers(code: string) {
        //this.editedJurpers = new Jurpers(Jpers.rn, Jpers.code, Jpers.name);
        this.serv.getJurpersCode(code).subscribe((data: Jurpers[]) => {
            this.jurpersons = data;
        });
        catchError(err => {  
            console.log(err); 
            return throwError(err);})
    }
    // загружаем один из двух шаблонов
    loadTemplate(Jurpers: Jurpers) {
            return this.readOnlyTemplate;
    }

    deleteJurpers(jurpers1: Jurpers){
        for(var i = 0;i < this.jurpersons.length; i++){
            if(jurpers1.rn == this.jurpersons[i].rn){
                this.jurpersons.splice(i,1);
                break;
                
            }
        }
    }
}