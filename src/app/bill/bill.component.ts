import { Component, OnInit, Input, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BillComponent implements OnInit {
  @Input() customerId: string;
  billContent: string;
  elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
    this.billContent = '';
    this.customerId = '';
  }

  ngOnInit(): void {
    //console.log("In NGInit");
    //this.generateDummyBill();
  }

 public generateDummyBill(): void {
    const items = [];
    for (let i = 1; i <= 1000; i++) {
      items.push({ description: `Item ${i}`, quantity: i, price: i * 10 });
    }

    const itemRows = items
      .map(
        (item) =>
          `<tr>
          <td>${item.description}</td>
          <td>${item.quantity}</td>
          <td>${item.price}</td>
        </tr>`
      )
      .join('');

    this.billContent =  `
    <html>
      <head>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          @media print {
            .page-break {
              page-break-after: always;
            }
          }
        </style>
      </head>
      <body>
        <h1>Invoice</h1>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
        </table>
        <div class="page-break"></div>
        <h2>Terms and Conditions</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          lacinia, enim ac vestibulum volutpat, lorem arcu hendrerit
          lorem, vitae bibendum diam mi vel sapien. Sed in nunc nec arcu
          vulputate ornare. Donec rutrum massa quam, quis imperdiet erat
          tincidunt ac. Duis non turpis semper, lobortis odio eget,
          rhoncus est. Sed ut augue eu sapien venenatis bibendum vitae
          vitae justo. Morbi non urna consequat, blandit turpis et,
          dapibus libero. In ut tellus eget mi gravida bibendum.
        </p>
      </body>
    </html>
  `;
    console.log(this.billContent);
  }


  // public generateDummyBill(): void {
  //   this.billContent = `
  //     <h1>Invoice for Customer ID: ${this.customerId}</h1>
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>Item</th>
  //           <th>Quantity</th>
  //           <th>Price</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         <tr>
  //           <td>Item 1</td>
  //           <td>2</td>
  //           <td>$20</td>
  //         </tr>
  //         <tr>
  //           <td>Item 2</td>
  //           <td>1</td>
  //           <td>$10</td>
  //         </tr>
  //       </tbody>
  //     </table>
  //     <h2>Total: $50</h2>
  //   `;
  //   console.log("Bill Content " + this.billContent);
  //
  // }

  getHtmlContent(): string {
    console.log("Sample Log");
    console.log(this.billContent);
    return this.billContent;
  }
}
