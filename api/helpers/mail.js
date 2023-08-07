import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "sportsevolution76@gmail.com",
    pass: "uwiucssexrtzdkvc",
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
