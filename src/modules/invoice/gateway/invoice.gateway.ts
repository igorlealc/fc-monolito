import Invoice from "../domain/invoice.entity";

export default interface InvoiceGateway {
    create(client: Invoice): Promise<void>;
    find(id: string): Promise<Invoice>;
  }