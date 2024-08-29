import Invoice from "../domain/invoice.entity";

export default interface InvoiceGateway {
    create(invoice: Invoice): Promise<Invoice>;
    find(id: string): Promise<Invoice>;
  }