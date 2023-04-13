import {Component, ViewChild} from '@angular/core';
import { BillComponent } from './bill/bill.component';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(BillComponent) billComponent!: BillComponent;


  //@ViewChild(BillComponent) billComponent!: BillComponent;
  //private billComponent: BillComponent;

  // constructor() {
  //   this.billComponent = new BillComponent();
  // }

  downloadBill(customerId: string): void {
    this.billComponent.customerId = customerId;
    this.billComponent.generateDummyBill();
    // setTimeout(() => {
    //   this.generatePdf();
    // }, 100);
    this.createPDFfromHTML();
  }

  private generatePdf(): void {
    const billElement = this.billComponent.elementRef.nativeElement;
    //const content = billElement.querySelector('[innerHTML]');
    alert(billElement);
    html2canvas(billElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('bill.pdf');
    });
  }


  private createPDFfromHTML(): void {
    console.log("In Create PDF from HTML");
    const billElement = this.billComponent.elementRef.nativeElement;
    var HTML_Width = billElement.width();
    console.log("HTML Width ==> " + HTML_Width);
    var HTML_Height = billElement.height();
    console.log("HTML Height ==> " + HTML_Height);
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas(billElement).then(function (canvas) {
      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage();
        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
      }
      pdf.save("bill12.pdf");
    });
  }


  // private generatePdf(): void {
  //   const billElement = this.billComponent.elementRef.nativeElement;
  //   const styles = billElement.querySelector('.bill-styles').innerHTML;
  //   const content = billElement.querySelector('[innerHTML]');
  //   const clonedContent = content.cloneNode(true);
  //   clonedContent.innerHTML = styles + clonedContent.innerHTML;
  //   html2canvas(clonedContent).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/jpeg', 1.0);
  //     const pdf = new jsPDF();
  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //     pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  //     pdf.save('bill.pdf');
  //   });
  // }

  // private generatePdf(): void {
  //   const billElement = this.billComponent.elementRef.nativeElement;
  //   html2canvas(billElement).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/jpeg', 1.0);
  //     const pdf = new jsPDF();
  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //     pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  //     pdf.save('bill.pdf');
  //   });
  // }


  // private generatePdf(): void {
  //   const billElement = this.billComponent.elementRef.nativeElement;
  //   html2canvas(billElement).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF();
  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //     pdf.save('bill.pdf');
  //   });
  // }
  // private generatePdf(): void {
  //   const pdf = new jsPDF();
  //   const pageHeight = pdf.internal.pageSize.height;
  //   const headerText = 'Your Header';
  //   const footerText = 'Your Footer';
  //
  //   const container = document.createElement('div');
  //   container.innerHTML = this.billComponent.getHtmlContent();
  //   alert(this.billComponent.getHtmlContent());
  //   document.body.appendChild(container);
  //
  //   html2canvas(container).then(canvas => {
  //     //const imgData = canvas.toDataURL('image/png');
  //     //pdf.addImage(imgData, 'PNG', 0, 0);
  //     pdf.addPage();
  //     pdf.text(headerText, 10, 10);
  //     pdf.text(footerText, 10, pageHeight - 10);
  //     pdf.save('bill.pdf');
  //
  //     document.body.removeChild(container);
  //   });
  // }
}
