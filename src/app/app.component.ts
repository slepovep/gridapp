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

    constructor(private serv: JurpersService) {
        this.jurpersons = new Array<Jurpers>();
    }

    ngOnInit() {
        this.loadJurpers();
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
    //редактирование пользователя
    addJurpers() {
        //this.editedJurpers = new Jurpers(Jpers.rn, Jpers.code, Jpers.name);
        this.serv.getJurpersCode("3501").subscribe((data: Jurpers[]) => {
            this.jurpers;
        });
    }
    // загружаем один из двух шаблонов
    loadTemplate(Jurpers: Jurpers) {
            return this.readOnlyTemplate;
    }

}