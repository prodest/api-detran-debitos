import { ClassDeb } from '../../models/enum';

export abstract class DefineClasseDebitos {

    constructor(){ }

    defineClasse(classe: number): ClassDeb {
        switch (classe) {
          case 1:
            return ClassDeb.CLASSE1;
          case 2:
            return ClassDeb.CLASSE2;
          case 3:
            return ClassDeb.CLASSE3;
          case 4:
            return ClassDeb.CLASSE4;
          case 5:
            return ClassDeb.CLASSE5;
          case 6:
            return ClassDeb.CLASSE6;
          case 7:
            return ClassDeb.CLASSE7;
          case 8:
            return ClassDeb.CLASSE8;
          case 9:
            return ClassDeb.CLASSE9;
          case 10:
            return ClassDeb.CLASSE10;
          case 11:
            return ClassDeb.CLASSE11;
          case 12:
            return ClassDeb.CLASSE12;
          case 13:
            return ClassDeb.CLASSE13;
          case 14:
            return ClassDeb.CLASSE14;
        }
      }

    
}