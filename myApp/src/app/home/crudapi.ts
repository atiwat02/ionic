import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable , OnInit } from '@angular/core';

@Injectable({
  providedIn : 'root' ,
})

export class crudapi{

  constructor(private fs:AngularFirestore){}
  readData(){
    return this.fs.collection('foodname').snapshotChanges();
  }


  createData(data:any){
    console.log(data)
    return this.fs.collection('foodname').add(data)
  }

 updateData(data:any){
  return this.fs.doc('foodname/'+data.id).update({name:data.name,img:data.img,category:data.category})
 }

 delete(docid:any){
   return this.fs.doc("foodname/"+docid).delete();
 }

}
