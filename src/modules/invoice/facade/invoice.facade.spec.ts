import { Sequelize } from "sequelize-typescript"

import Address from "../../@shared/domain/value-object/address"
import InvoiceModel from "../repository/invoice.model"
import InvoiceItemModel from "../repository/invoice.item.model"
import InvoiceRepository from "../repository/invoice.repository"
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase"
import InvoiceFacade from "./invoice.facade"
import InvoiceFacadeFactory from "../factory/invoice.facade.factory"


describe("Invoice Facade test", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([InvoiceModel, InvoiceItemModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should generate a invoice", async () => {

    const facade = InvoiceFacadeFactory.create()

    const input = {
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

    const result = await facade.generate(input)

    expect(result).toBeDefined()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.document).toEqual(input.document)
    expect(result.address.street).toEqual(input.address.street)
    expect(result.address.number).toEqual(input.address.number)
    expect(result.address.complement).toEqual(input.address.complement)
    expect(result.address.city).toEqual(input.address.city)
    expect(result.address.state).toEqual(input.address.state)
    expect(result.address.zipCode).toEqual(input.address.zipCode)
    expect(result.items.length).toEqual(result.items.length)
    for (let i = 0; i < result.items.length; i++) {
      const inputItem = input.items[i];
      const resultItem = result.items[i];
      expect(resultItem.id).toBeDefined()
      expect(resultItem.name).toEqual(inputItem.name)
      expect(resultItem.price).toEqual(inputItem.price)
    }
  })

  it("should find a invoice", async () => {   

    const facade = InvoiceFacadeFactory.create()

    const input = {
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

   const generated = await facade.generate(input)   

   const result = await facade.find({ id: generated.id })

   expect(result).toBeDefined()
   expect(result.id).toEqual(generated.id)
   expect(result.name).toEqual(generated.name)
   expect(result.document).toEqual(generated.document)
   expect(result.address.street).toEqual(generated.address.street)
   expect(result.address.number).toEqual(generated.address.number)
   expect(result.address.complement).toEqual(generated.address.complement)
   expect(result.address.city).toEqual(generated.address.city)
   expect(result.address.state).toEqual(generated.address.state)
   expect(result.address.zipCode).toEqual(generated.address.zipCode)
   expect(result.items.length).toEqual(result.items.length)
   for (let i = 0; i < result.items.length; i++) {
     const generatedItem = generated.items[i];
     const resultItem = result.items[i];
     expect(resultItem.id).toEqual(generatedItem.id)
     expect(resultItem.name).toEqual(generatedItem.name)
     expect(resultItem.price).toEqual(generatedItem.price)
   }
  })
})