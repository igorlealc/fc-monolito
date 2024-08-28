import { Sequelize } from "sequelize-typescript"
import Invoice from "../domain/invoice.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import Address from "../../@shared/domain/value-object/address"
import InvoiceRepository from "./invoice.repository"
import InvoiceModel from "./invoice.model"
import InvoiceItemModel from "./invoice.item.model"
import InvoiceItem from "../domain/invoice.item.entity"

describe("Invoice Repository test", () => {

    let sequelize: Sequelize
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        sync: { force: true }
      })
  
      sequelize.addModels([InvoiceModel, InvoiceItemModel]);
      await sequelize.sync()
    })
  
    afterEach(async () => {
      await sequelize.close()
    })
  
    it("should create a invoice", async () => {  
      const invoice = new Invoice({
        id: new Id("1"),
        name: "Fulano de tal",      
        document: "111.111.111-11",
        address: new Address(
          "Rua 001",
          "001",
          "2 Pavimento",
          "Pindamoiangaba",
          "SP",
          "11111-111"
        ),
        items:[
          new InvoiceItem({
            id: new Id("1"),
            name: "Produto 1",
            price: 1.14
          }),
          new InvoiceItem({
            id: new Id("2"),
            name: "Produto 2",
            price: 2.57
          }),

        ]      
      })
  
      const repository = new InvoiceRepository()
      await repository.create(invoice)
      const invoiceDb = await InvoiceModel.findOne({
        where: { id: invoice.id.id },
        include: [InvoiceItemModel],
      });

      expect(invoiceDb).toBeDefined()
      expect(invoiceDb.id).toEqual(invoice.id.id)
      expect(invoiceDb.name).toEqual(invoice.name)
      expect(invoiceDb.document).toEqual(invoice.document)
      expect(invoiceDb.street).toEqual(invoice.address.street)
      expect(invoiceDb.number).toEqual(invoice.address.number)
      expect(invoiceDb.complement).toEqual(invoice.address.complement)
      expect(invoiceDb.city).toEqual(invoice.address.city)
      expect(invoiceDb.state).toEqual(invoice.address.state)
      expect(invoiceDb.zipCode).toEqual(invoice.address.zipCode)
      expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt)
      expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt)
      expect(invoiceDb.items.length).toEqual(invoice.items.length)
      for(let i = 0; i < invoice.items.length; i++){
        const invoiceItem = invoice.items[i];
        const dbItem = invoiceDb.items[i];
        expect(dbItem.id).toEqual(invoiceItem.id.id)
        expect(dbItem.name).toEqual(invoiceItem.name)
        expect(dbItem.price).toEqual(invoiceItem.price)
      }
   
    })
    
    it("should find a invoice", async () => {

      const invoice = new Invoice({
        id: new Id("1"),
        name: "Fulano de tal",      
        document: "111.111.111-11",
        address: new Address(
          "Rua 001",
          "001",
          "2 Pavimento",
          "Pindamoiangaba",
          "SP",
          "11111-111"
        ),
        items:[
          new InvoiceItem({
            id: new Id("1"),
            name: "Produto 1",
            price: 1.14
          }),
          new InvoiceItem({
            id: new Id("2"),
            name: "Produto 2",
            price: 2.57
          }),

        ]      
      })

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
  
      const repository = new InvoiceRepository()
      const result = await repository.find(invoice.id.id)
  
      expect(result).toBeDefined()
      expect(result.id.id).toEqual(invoice.id.id)
      expect(result.name).toEqual(invoice.name)
      expect(result.document).toEqual(invoice.document)
      expect(result.address.street).toEqual(invoice.address.street)
      expect(result.address.number).toEqual(invoice.address.number)
      expect(result.address.complement).toEqual(invoice.address.complement)
      expect(result.address.city).toEqual(invoice.address.city)
      expect(result.address.state).toEqual(invoice.address.state)
      expect(result.address.zipCode).toEqual(invoice.address.zipCode)
      expect(result.createdAt).toStrictEqual(invoice.createdAt)
      expect(result.updatedAt).toStrictEqual(invoice.updatedAt)
      expect(result.items.length).toEqual(invoice.items.length)
      for(let i = 0; i < invoice.items.length; i++){
        const invoiceItem = invoice.items[i];
        const resultItem = result.items[i];
        expect(resultItem.id.id).toEqual(invoiceItem.id.id)
        expect(resultItem.name).toEqual(invoiceItem.name)
        expect(resultItem.price).toEqual(invoiceItem.price)
      }
    })
  })