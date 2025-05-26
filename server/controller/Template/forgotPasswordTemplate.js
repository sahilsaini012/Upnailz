const forgotPasswordTemplate = (data) => {
  return `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-family: Arial, sans-serif; background-color: #F9F9F9; padding: 20px;">
      <tr>
        <td align="center">
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border-radius: 8px; overflow: hidden;">
            <tr>
              <td style="padding: 20px; text-align: center; background-color:#333333; color: #FFFFFF;">
                <h1 style="margin: 0; font-size: 24px;">Wijzig je wachtwoord</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; text-align: left; color: #333;">
                <p style="font-size: 16px; line-height: 1.5;">Hallo ${data.name}</p>
                <p style="font-size: 16px; line-height: 1.5;">We hebben een verzoek ontvangen om het wachtwoord aan te passen. Klik op de onderstaande knop om het wachtwoord te wijzigen. Als je geen wachtwoord wijziging hebt aangevraagd, negeer dan deze e-mail en raadpleeg de webbeheerder.</p>
                <p style="text-align: center; margin: 30px 0;">
                  <a href="${data.link}" style="background-color:#333333; color: #FFFFFF; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block;">Wachtwoord resetten</a>
                </p>
                <p style="font-size: 14px; line-height: 1.5; color: #666;">Deze link verloopt over 5 minuten. Als je geen wachtwoordreset hebt aangevraagd, is er geen verdere actie vereist.</p>
                <p style="font-size: 14px; line-height: 1.5; color: #666;">Bedankt,<br>UpNailz</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
};
module.exports = { forgotPasswordTemplate };