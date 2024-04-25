import type { IInvoice, IInvoiceShort, IProduct, IClient } from "../interfaces";
const allInvoices = require("../data/invoices.json");
const allProducts = require("../data/products.json");
const allClients = require("../data/clients.json");

let invoiceList: IInvoiceShort[] = allInvoices;
let productList: IProduct[] = allProducts;
let clientList: IClient[] = allClients;

const getProducts = () : IProduct[] => {
    return productList;
}

const getClients = () : IClient[] => {
    return clientList;
}

const getInvoices = () : IInvoice[] => {
    return invoiceList
        .map((invoice: IInvoiceShort) => {
            const product = productList.find((p: IProduct) => p.id === invoice.idProduct);
            const client = clientList.find((c: IClient) => c.id === invoice.idClient);

            // Create a deep copy of the invoice object
            const invoiceCopy = JSON.parse(JSON.stringify(invoice));

            delete invoiceCopy.idProduct;
            delete invoiceCopy.idClient;

            return {
                ...invoiceCopy,
                product,
                client,
            };
        })
        .sort((a, b) => a.id - b.id);
}

const findInvoiceById = (id: number) : IInvoiceShort => {
    return invoiceList.find((invoice: IInvoiceShort) => invoice.id === id);
}

const getInvoicesFromClient = (idClient: number) : IInvoice[] => {
    return getInvoices().filter((invoice: IInvoice) => invoice?.client?.id === idClient);
}

const addInvoice = (invoice: IInvoiceShort) => {
    invoice.id = getNextNumberInvoiceId();
    invoiceList.push(invoice);
}

const updateInvoice = (id: number, invoice: IInvoiceShort) => {
    const index = invoiceList.findIndex((invoice: IInvoiceShort) => invoice.id === id);
    invoiceList[index] = invoice;
}

const removeInvoice = (id: number) => {
    const index = invoiceList.findIndex((invoice: IInvoiceShort) => invoice.id === id);
    invoiceList.splice(index, 1);
    return true;
}

const getNextNumberInvoiceId = (): number => {
    let lastID = allInvoices[allInvoices.length - 1].id;
    return Number(lastID+1);
}

export default {
    getProducts,
    getClients,
    getInvoices,
    getInvoicesFromClient,
    findInvoiceById,
    addInvoice,
    updateInvoice,
    removeInvoice
}