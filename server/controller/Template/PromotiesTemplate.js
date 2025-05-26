const promotiesTemplate = ({ name, subject, message }) => {
  return `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-family: Arial, sans-serif; background-color: #EAEAEA; padding: 20px;">
      <tr>
        <td align="center">
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
            <!-- Header Section -->
            <tr>
              <td style="padding: 30px; text-align: center; background-color: #000000; color: #FFFFFF;">
                <h1 style="margin: 0; font-size: 24px;">${subject}</h1> <!-- Dynamic Subject -->
              </td>
            </tr>
            <!-- Body Section -->
            <tr>
              <td style="padding: 25px; text-align: left; color: #333;">
                ${
                  name
                    ? `<p style="font-size: 18px;">Hallo <strong>${name}</strong>,</p>`
                    : ""
                }
                <p style="font-size: 16px; line-height: 1.6;">${message}</p>
              </td>
            </tr>
            <!-- Footer Section -->
            <tr>
              <td style="padding: 20px; text-align: center; background-color: #F1F1F1; color: #666; font-size: 12px;">
                <p style="margin: 0;">&copy; 2025 UpNailz. Alle rechten voorbehouden.</p>
                <p style="margin: 0;">Vragen of hulp nodig? <a href="mailto:support@upnailz.com" style="color:#000000; font-weight: bold;">Neem contact met ons op</a>.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
};
module.exports = { promotiesTemplate };









