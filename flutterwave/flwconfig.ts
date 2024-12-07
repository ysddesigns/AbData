import axios from "axios";
import { error } from "console";

const baseURL = "https://api.flutterwave.com/v3/top-bill-categories"; // Add country code

export const fetchBillCategories = async () => {
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer FLWSECK_TEST-9bca0e857074c9d01f882cf8ad894daf-X`, // Replace with your Flutterwave Secret Key
      },
      params: {
        country: "NG", // Ensure the country code is correct and added here
      },
    });
    console.log("response from fetch bill categories: ", response.data.data);
    console.log("");

    console.log("response from fetch bill message: ", response.data.message);

    if (response.data.status === "success") {
      return response.data.data; // List of bill categories
    } else {
      throw new Error(`Failed to fetch categories: ${response.data.message}`);
    }
  } catch (error: any) {
    console.error(
      "Error fetching bill categories:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const payBill = async (
  customer_id: string,
  billCode: string,
  amount: number
) => {
  try {
    const response = await axios.post(
      `${baseURL}/bills`, //endpoint for making payments
      {
        country: "NG",
        customer_id,
        amount,
        recurrence: "ONCE",
        type: billCode,
        reference: `tx-${Date.now()}`, // Unique transaction reference
      },
      {
        headers: {
          Authorization: `Bearer FLWSECK_TEST-9bca0e857074c9d01f882cf8ad894daf-X`, // Replace with your Flutterwave Secret Key
        },
      }
    );

    if (response.data.status === "successful") {
      return response.data; // Response from Flutterwave
    } else {
      throw new Error(`failed to make payment ${response.data.message}`);
    }
  } catch (error) {
    console.error("Error making bill payment:", error);
    throw error;
  }
};

// Usage example

export const buyAirtime = () => {
  fetchBillCategories()
    .then((categories) => {
      // console.log("available categories", categories);
      console.log("Categoris available!");

      // categorie AIRTIME
      const airtimeCat = categories.find((cat: any) => cat.code === "AIRTIME");
      if (airtimeCat) {
        payBill("09121135812", airtimeCat.biller_code, 200)
          .then((paymentResult) => {
            console.log("payment successful", paymentResult);
          })
          .catch((error) => {
            console.log("error during payment:", error.message);
          });
      } else {
        console.log("Airtime category not found!");
      }
    })
    .catch((error) => {
      console.log("Error fetching categories");
    });
};
