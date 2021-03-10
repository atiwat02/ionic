import { crudapi } from './crudapi';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  tmpcountrylist :any;
  constructor( private alertCtrl:AlertController,
    private getcrud:crudapi,public alertController: AlertController) { }

  ngOnInit() {

      this.getcrud.readData().subscribe(data =>{
      this.tmpcountrylist = data.map(e =>{
        return{
          id: e.payload.doc.id,
          isEdit:false ,
          myname: e.payload.doc.data()['name'.toString()],
          myimg:  e.payload.doc.data()['img'.toString()],
          mycategory:  e.payload.doc.data()['category'.toString()],
          myingredient: e.payload.doc.data()['ingredient'.toString()],
        };
      });
      console.log(this.tmpcountrylist);
    });
  }



  async edit(item:any){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit',
      inputs: [
        {
          value: item.myimg ,
          name: 'topic',
          type: 'text',
          placeholder: 'Img',

        },
        {
          value: item.mycategory ,
          name: 'detail',
          type: 'textarea',
          placeholder: 'Category',

        },
        {
          value: item.myname,
          name: 'author',
          type: 'text',
          placeholder: 'Name',

        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log();
          }
        }, {
          text: 'Ok',
          handler: (alert) => {
            console.log(item.id);
            this.getcrud.updateData({id:item.id,img:alert.topic,category:alert.detail,name:alert.author})
          }
        }
      ]
    });

    await alert.present();
  }
  deleteitem(id){
    this.getcrud.delete(id.id);

  }
  async presentAlert(mess) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Warning',
      message: "ต้องการลบใช่หรือไม่",
      buttons: [ {
          text: 'ไม่ใช่',
          handler: () => {

          }
        },
        {
          text: 'ใช่',
          handler: () => {
          this.deleteitem(mess);
          }

        }
      ]
    });

    await alert.present();
  }

  async create(){
    console.log("add");
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'create',
      inputs: [
        {
          name: 'topic',
          type: 'text',
          placeholder: 'Img',
        },
        {
          name: 'detail',
          type: 'textarea',
          placeholder: 'Category',
          cssClass: 'alertDanger'
        },
        {
          name: 'author',
          type: 'text',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log();
          }
        }, {
          text: 'ADD',
          handler: (alert) => {
            console.log();
            this.getcrud.createData({img:alert.topic,category:alert.detail,name:alert.author})
          }
        }
      ]
    });
    await alert.present();
  }
}
