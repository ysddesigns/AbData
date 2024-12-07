declare module "flutterwave-node-v3" {
  class Flutterwave {
    constructor(publicKey: string, secretKey: string);

    Bills: {
      fetch_bills_Cat: () => Promise<any>;
    };

    // You can add other methods and properties from Flutterwave's SDK as needed
  }

  export { Flutterwave };
}
