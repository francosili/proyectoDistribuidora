import { Injectable, NgZone } from '@angular/core';

import { File } from '@ionic-native/file';

import { UploadImage } from '../models/UploadImage';

// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
// import { Transfer, TransferObject, FileUploadResult } from '@ionic-native/transfer';
// import { Insomnia } from '@ionic-native/insomnia';
// import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer';

@Injectable()
export class FileUploadService {

    public imageSelected: UploadImage;
    constructor(
        private file: File,
        // private transfer: FileTransfer,
        // private insomnia: Insomnia,      
        // private ng_zone: NgZone        
    ) { }
    
    test() {
        console.log('DataDirectory: ');
        console.log(this.file.dataDirectory);


        console.log('CACAAA');

        this.testUploadImage();
    }

    testUploadImage() {
        if (this.file.dataDirectory) {
          
            this.file.createDir(this.file.dataDirectory, 'img', false).then(directoryEntry => {
                console.log('CarpetaCreada: ');
                console.log(directoryEntry);
            }).catch(createDirError => {
                console.log(createDirError);
            });



            this.file.createFile(this.file.dataDirectory + '/img', 'testTestTest1', false).then(fileEntry => {
                console.log('success: ');
                console.log(fileEntry);

                this.file.listDir(this.file.dataDirectory, 'img').then(files => {
                    console.log('files: ');
                    console.log(files);
                }).catch(err => {
                    console.log('errorfiles');
                });
            }).catch(createFileError => {
                console.log(createFileError);
            })
        }

        
    }


}