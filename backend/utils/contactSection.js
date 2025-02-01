
const topForText = 70;
const topForIcon = 69;


const contactSection = (myPDF, data) => {
  const { name, resumeNumber, resumeEmail, GitHubURL, LinkedInURL } = data;
  const resumeName = name.toUpperCase();

  // need for calculating width.
  const resumeLinkedIn = "linkedin.com";
  const resumeGitHub = "github.com";

  myPDF.fontSize(24).text(resumeName, { align: "center" }, 42);

  const phoneIconX = 150;
  myPDF.image("./utils/icons/call.png", phoneIconX, topForIcon, {
    fit: [10, 10],
    align: "center",
    valign: "center",
  });

  const gapForAll = 12; // Gap between the icon and the text
  const paddingAfterIcon = 6; // Padding after the icon

  const phoneTextX = phoneIconX + gapForAll;
  myPDF.fontSize(10).text(resumeNumber, phoneTextX, topForText);

  // Add the email
  const numberWidth = myPDF.widthOfString(resumeNumber, { fontSize: 10 });
  const emailIconX = phoneTextX + numberWidth + paddingAfterIcon; // Starting position for the email icon
  myPDF.image("./utils/icons/email.png", emailIconX, topForIcon, {
    fit: [10, 10],
    align: "center",
    valign: "center",
  });

  const emailTextX = emailIconX + gapForAll;
  myPDF.fontSize(10).text(resumeEmail, emailTextX, topForText);

  // Add the LinkedIn
  const emailWidth = myPDF.widthOfString(resumeEmail, { fontSize: 10 });
  const linkedInIconX = emailTextX + emailWidth + paddingAfterIcon;
  myPDF
    .image("./utils/icons/linkedin.png", linkedInIconX, topForIcon, {
      fit: [10, 10],
      align: "center",
      valign: "center",
    })
    .fillColor("blue");

  const linkedInTextX = linkedInIconX + gapForAll;
  myPDF.fontSize(10).text(resumeLinkedIn, linkedInTextX, topForText, {
    link: LinkedInURL,
    underline: true,
  });

  // Add the GitHub
  const linkedInWidth = myPDF.widthOfString(resumeLinkedIn, { fontSize: 10 });
  const githubIconX = linkedInTextX + linkedInWidth + paddingAfterIcon;
  myPDF
    .image("./utils/icons/github.png", githubIconX, topForIcon, {
      fit: [10, 10],
      align: "center",
      valign: "center",
    })
    .fillColor("blue");

  const githubTextX = githubIconX + gapForAll;
  myPDF
    .fontSize(10)
    .text(resumeGitHub, githubTextX, topForText, { link: GitHubURL, underline: true });
};

export default contactSection;
