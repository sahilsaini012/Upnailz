const express = require("express");
const axios = require("axios");
const router = express.Router();
const accessToken =
  "EAAIe3ZAVkZAlQBO9DuLmbklBSk0IgfZBY4v0Y9idfQdOpZAiXPzXLXJZCk8bV6Rie5Ne5gzhKpJ3i1pa8ZC9NmViKigsdgPs1KwnQPSo9pwOGABceq6YZCk2ZBUS5TqeMxixC9ItNmQnWoRe16cxhSbNMGRu9QqEnKJkecsCiH8DbjRBNomanFcBANTBiTBn1rZAxQzDYH2mIQoDiy7WP21seS5sAPGlVb6ZBFqjsZD"; // Your WhatsApp Business API access token
const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID; // Your WhatsApp Business API phone number ID
exports.sendMessage = async (req) => {
  try {
    const res = await axios.post(
      `https://graph.facebook.com/v14.0/${phoneNumberId}/messages`,
      {
        messaging_product: "whatsapp",
        to: 919138462797,
        type: "template",
        template: {
          name: "book_appointment",
          language: {
            code: "en_US",
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return { success: true };
  } catch (error) {
    console.error("Error Sending message:", error);
    return { success: false, error };
  }
};