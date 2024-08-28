import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import InvoiceItem from "../domain/invoice.item.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemModel from "./invoice.item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway{

    async create(invoice: Invoice): Promise<void>  {       
        await InvoiceModel.create( {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            items: invoice.items.map((item => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            }))),
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
        },      
        {
          include: [{ model: InvoiceItemModel }],
        });
    }

    async find(id: string): Promise<Invoice> {
       const model = await InvoiceModel.findOne({
        where: { id: id },
        include: [InvoiceItemModel],
      });

      return new Invoice({
        id: new Id(model.id),
        name: model.name,
        document: model.document,
        address: new Address(model.street, model.number, model.complement, model.city, model.state, model.zipCode),
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
        items: model.items.map((item)=> new InvoiceItem({id: new Id(item.id), name: item.name, price: item.price}))
      });
    }
}