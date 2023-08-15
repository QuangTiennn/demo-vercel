import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "trinhtrungdung164@gmail.com",
    pass: "rgwikgjdbwblpiqk",
  },
});

export const sendMail = (options) => {
  return transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent: " + info.response);
    }
  });
};
