import {Component} from '@angular/core';
import {NavController, NavParams, Platform, AlertController} from 'ionic-angular';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@Component({
    selector: 'pdf-reader',
    templateUrl: 'pdf.html'
})
export class PdfViewPage {

    storageDirectory: string = '';

    constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private transfer: FileTransfer, private file: File, public alertCtrl: AlertController , private fileOpener: FileOpener) {
      this.platform.ready().then(() => {
        // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
        if(!this.platform.is('cordova')) {
          return false;
        }
  
        if (this.platform.is('ios')) {
          this.storageDirectory = file.documentsDirectory;
        }
        else if(this.platform.is('android')) {
          this.storageDirectory = file.externalRootDirectory;
        }
        else {
          // exit otherwise, but you could add further types here e.g. Windows
          return false;
        }
        console.log(this.storageDirectory);
        this.download(navParams.data);
      });
    }

    download(url) {
        console.log(url);
        let fileTransfer = this.transfer.create();
        console.log(fileTransfer);
        fileTransfer.download(url, this.storageDirectory + 'file.pdf').then((entry) => {
            console.log('download complete: ' + entry.toURL());

            this.fileOpener.open( entry.toURL(), 'application/pdf')
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error openening file', e));

            this.navCtrl.pop();

        }, (error) => {
            // handle error
        });
    }

}