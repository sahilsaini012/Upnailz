const ReminderTemplate = (data) => {
  return `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-family: Arial, sans-serif; background-color: #F4F4F4; padding: 20px;">
      <tr>
        <td align="center">
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border-radius: 8px; overflow: hidden;">
            <!-- Header Section -->
            <tr>
              <td style="padding: 30px; text-align: center;background-color: #333333; color: #FFFFFF;">
                <h1 style="margin: 0; font-size: 28px;">Afspraak herinnering</h1>
                <p style="margin: 5px; font-size: 16px;">Mis je aankomende afspraak niet</p>
              </td>
            </tr>
            <!-- Body Section -->
            <tr>
              <td style="padding: 25px; text-align: left; color: #333;">
                <p style="font-size: 18px; line-height: 1.6;">Hallo <strong>${data.name}</strong>,</p>
                <p style="font-size: 16px; line-height: 1.6;">Hierbij een vriendelijke herinnering aan je afspraak bij UpNailz! Afspraakgegevens:</p>
                <table width="100%" cellpadding="5" cellspacing="0" style="margin: 20px 0; border-collapse: collapse; border: 1px solid #ddd;">
                  <tr>
                    <td style="width: 200px; font-weight: bold; color: #333; background-color: #F9F9F9;">Datum:</td>
                    <td style="color: #555;">${data.appointment_on}</td>
                  </tr>
                  <tr>
                    <td style="width: 200px; font-weight: bold; color: #333; background-color: #F9F9F9;">Tijd:</td>
                    <td style="color: #555;">${data.time}</td>
                  </tr>
                  <tr>
                    <td style="width: 200px; font-weight: bold; color: #333; background-color: #F9F9F9;">Behandeling:</td>
                    <td style="color: #555;">${data.treatment}</td>
                  </tr>
                </table>
                <p style="font-size: 16px; line-height: 1.6;">Heb je vragen of wil je een nieuwe afspraak plannen? Stuur me dan een bericht via WhatsApp.</p>
                <p style="font-size: 14px; line-height: 1.6; color: #888;">Let op: Het is niet mogelijk om je afspraak online of per e-mail te wijzigen.</p>
              </td>
            </tr>
            <!-- Footer Section -->
            <tr>
              <td style="padding: 20px; text-align: center; background-color: #F1F1F1; color: #666; font-size: 12px;">
                <p style="margin: 0;">&copy; 2025 UpNailz. Alle rechten voorbehouden.</p>
                <p style="margin: 0;">Vragen of hulp nodig? <a href="mailto:support@upnailz.com" style="color:rgb(13, 14, 15); font-weight: bold;"> Neem contact met mij op via WhatsApp.</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
};
module.exports = { ReminderTemplate };