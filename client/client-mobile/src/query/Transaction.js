import { gql } from "@apollo/client";

export const GET_INVOICE = gql`
  mutation PayInvoice($invoicePayload: InvoicePayload) {
    payInvoice(invoicePayload: $invoicePayload) {
      message
    }
  }
`;

export const POST_INVOICE = gql`
  mutation Mutation($balance: Int) {
    createInvoice(balance: $balance) {
      external_id
      invoice_url
      totalPrice
    }
  }
`;
