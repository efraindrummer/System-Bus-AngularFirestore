import { DocumentReference } from '@angular/fire/firestore';

export class Cliente{
    id:string;
    nombre:string;
    apellido:string;
    correo:string;
    telefono:string;
    imgUrl: string;
    ref:DocumentReference;
    visible:boolean;

    constructor(){
        
    }
}