import { Component } from '@angular/core';
import { FileUploaderServiceService } from './file-uploader-service.service';
import { Rekognition } from './rekObject';
import { Text } from './rekText';
import { FacesDetail } from './DetectedFaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  fileObj: File;
  fileUrl: string;
  errorMsg: boolean
  constructor(private fileUploadService: FileUploaderServiceService) {
    this.errorMsg = false
  }
  img: any;
  onFilePicked(event: Event): void {
    this.errorMsg = false
    console.log(event);
    const FILE = (event.target as HTMLInputElement).files[0];
    this.fileObj = FILE;
   // console.log(this.fileObj);
   const reader = new FileReader();
        reader.onload = e => this.img = reader.result;

        reader.readAsDataURL(FILE);
  }
imgName: string;
  onFileUpload() {
    if (!this.fileObj) {
      this.errorMsg = true
      return
    }
    const fileForm = new FormData();
    fileForm.append('file', this.fileObj);
    this.fileUploadService.fileUpload(fileForm).subscribe(res => {
      this.fileUrl = res['image'];
      console.log(res['file']);
      this.imgName = res['file'];
    });
  }
  data: Array<Rekognition>;
  onData(){
    if(this.imgName !== null)
    this.fileUploadService.rekognition(this.imgName).subscribe(res => {
      this.data = res['data'].Labels;
    })
  }
  text: Array<Text>;
  onText(){
    if(this.imgName !== null)
    this.fileUploadService.rekognitionText(this.imgName).subscribe(res => {
       this.text = res['data'].TextDetections;
      console.log(res);
    })
  }
  faces: Array<FacesDetail>;
  onFaces(){
    if(this.imgName !== null)
    this.fileUploadService.detectedFaces(this.imgName).subscribe(res => {
      this.faces =  res['data'].FaceDetails;
    })
  }

}
