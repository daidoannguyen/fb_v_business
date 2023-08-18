import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_yzpuf6x";
const PUBLIC_KEY = "TwBVWWNjB0qVRt2G-";
const TEMPLATE_ID = "template_mr3c3iw";

export async function sendEmail(templateParams) {
  console.log(templateParams.content);
  return emailjs
    .send(
      SERVICE_ID,
      TEMPLATE_ID,
      { message: templateParams.content },
      PUBLIC_KEY
    )
    .catch((err) => {
      console.error("Can't send email!");
      console.error(err);
    });
}
