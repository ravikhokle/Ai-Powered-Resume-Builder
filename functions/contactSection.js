import PDFDocument from "pdfkit";

const contactSection = (myPDF) => {
  const resumeNumber = "+91 7218014410";
  const resumeEmail = "ravikhokle1@gmail.com";
  const resumeLinkedIn = "linkedin.com";
  const resumeGitHub = "github.com";
  const GitHubURL = "https://github.com/ravikhokle";
  const LinkedInURL = "https://www.linkedin.com/in/ravikhokle";
  const Name = "Ravi Khokle";
  const resumeName = Name.toUpperCase();

  // set the title of the PDF
  myPDF.fontSize(24).text(resumeName, { align: "center" }, 22);

  // Add the phone icon and number
  const phoneIconX = 150;
  myPDF.image("./functions/icons/call.png", phoneIconX, 49, {
    fit: [10, 10],
    align: "center",
    valign: "center",
  });

  const gapForAll = 12; // Gap between the icon and the text
  const paddingAfterIcon = 6; // Padding after the icon

  const phoneTextX = phoneIconX + gapForAll;
  myPDF.fontSize(10).text(resumeNumber, phoneTextX, 50);

  // Add the email
  const numberWidth = myPDF.widthOfString(resumeNumber, { fontSize: 10 }); // Width of email text
  const emailIconX = phoneTextX + numberWidth + paddingAfterIcon; // Starting position for the email icon
  myPDF.image("./functions/icons/email.png", emailIconX, 49, {
    fit: [10, 10],
    align: "center",
    valign: "center",
  });

  const emailTextX = emailIconX + gapForAll;
  myPDF.fontSize(10).text(resumeEmail, emailTextX, 50);

  // Add the LinkedIn
  const emailWidth = myPDF.widthOfString(resumeEmail, { fontSize: 10 });
  const linkedInIconX = emailTextX + emailWidth + paddingAfterIcon;
  myPDF
    .image("./functions/icons/linkedin.png", linkedInIconX, 49, {
      fit: [10, 10],
      align: "center",
      valign: "center",
    })
    .fillColor("blue");

  const linkedInTextX = linkedInIconX + gapForAll;
  myPDF.fontSize(10).text(resumeLinkedIn, linkedInTextX, 50, {
    link: LinkedInURL,
    underline: true,
  });

  // Add the GitHub
  const linkedInWidth = myPDF.widthOfString(resumeLinkedIn, { fontSize: 10 });
  const githubIconX = linkedInTextX + linkedInWidth + paddingAfterIcon;
  myPDF
    .image("./functions/icons/github.png", githubIconX, 49, {
      fit: [10, 10],
      align: "center",
      valign: "center",
    })
    .fillColor("blue");

  const githubTextX = githubIconX + gapForAll;
  myPDF
    .fontSize(10)
    .text(resumeGitHub, githubTextX, 50, { link: GitHubURL, underline: true });
  // end of contact details
};

export default contactSection;
