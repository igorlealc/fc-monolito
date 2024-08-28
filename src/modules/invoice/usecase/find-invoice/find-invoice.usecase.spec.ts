import Address from "../../../@shared/domain/value-object/address";
import Invoice from "../../domain/invoice.entity";
import InvoiceItem from "../../domain/invoice.item.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

describe("Find invoice usecase tests", () => {

    const invoice = new Invoice({
        name: "Fulano de Tal",
        document: "111.111.111-11",
        address: new Address(
            "Rua 001",
            "001",
            "2 Pavimento",
            "Pindamoiangaba",
            "SP",
            "11111-111"
        ),
        items: [
            new InvoiceItem({                
                name: "Product 1",
                price: 5.23,
            }),
            new InvoiceItem({
                name: "Product 2",
                price: 8.59,
            })
        ]
    })

    const invoiceRepository = {
        create: jest.fn(),
        find: jest.fn().mockResolvedValue(Promise.resolve(invoice))
    }    

    it("should execute correct methods when usecase is called", async () => {
        const usecase = new FindInvoiceUseCase(invoiceRepository);
        const result = await usecase.execute({id: "1"});

        expect(invoiceRepository.find).toHaveBeenCalled();
        expect(result.id).toEqual(invoice.id.id)
        expect(result.name).toEqual(invoice.name)
        expect(result.document).toEqual(invoice.document)
        expect(result.address.street).toEqual(invoice.address.street)
        expect(result.address.number).toEqual(invoice.address.number)
        expect(result.address.complement).toEqual(invoice.address.complement)
        expect(result.address.city).toEqual(invoice.address.city)
        expect(result.address.state).toEqual(invoice.address.state)
        expect(result.address.zipCode).toEqual(invoice.address.zipCode)        
        expect(result.items.length).toEqual(invoice.items.length)
        
        for (let i = 0; i < invoice.items.length; i++) {
            const invoiceItem = invoice.items[i];
            const resultItem = result.items[i];
            expect(resultItem.id).toEqual(invoiceItem.id.id)
            expect(resultItem.name).toEqual(invoiceItem.name)
            expect(resultItem.price).toEqual(invoiceItem.price)
        }

    });

});


