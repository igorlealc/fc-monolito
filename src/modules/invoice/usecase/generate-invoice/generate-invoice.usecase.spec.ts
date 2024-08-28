import Address from "../../../@shared/domain/value-object/address";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

describe("Generate invoice usecase tests", () => {

    const invoiceRepository = {
        create: jest.fn(),
        find: jest.fn()
    }

    const invoiceDTO = {
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
            {
                name: "Product 1",
                price: 5.23,
            },
            {
                name: "Product 2",
                price: 8.59,
            }
        ]
    }

    it("should execute correct methods when usecase is called", async () => {
        const usecase = new GenerateInvoiceUseCase(invoiceRepository);
        const result = await usecase.execute(invoiceDTO);

        expect(invoiceRepository.create).toHaveBeenCalled();
        expect(result.name).toEqual(invoiceDTO.name)
        expect(result.document).toEqual(invoiceDTO.document)
        expect(result.address.street).toEqual(invoiceDTO.address.street)
        expect(result.address.number).toEqual(invoiceDTO.address.number)
        expect(result.address.complement).toEqual(invoiceDTO.address.complement)
        expect(result.address.city).toEqual(invoiceDTO.address.city)
        expect(result.address.state).toEqual(invoiceDTO.address.state)
        expect(result.address.zipCode).toEqual(invoiceDTO.address.zipCode)        
        expect(result.items.length).toEqual(invoiceDTO.items.length)
        
        for (let i = 0; i < invoiceDTO.items.length; i++) {
            const invoiceItem = invoiceDTO.items[i];
            const resultItem = result.items[i];
            expect(resultItem.id).toBeDefined()
            expect(resultItem.name).toEqual(invoiceItem.name)
            expect(resultItem.price).toEqual(invoiceItem.price)
        }

    });

});


