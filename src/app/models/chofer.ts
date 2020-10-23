import { DocumentReference } from "@angular/fire/firestore";

export class Chofer{
    id: string;
    nombre: string;
    apellido: string;
    sueldo: number;
    imgChofer: string;
    ref: DocumentReference;
    visible: boolean;

    constructor(){
        
    }
    
}