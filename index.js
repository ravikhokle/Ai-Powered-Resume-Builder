import express from "express";
import PDFDocument from "pdfkit";
import fs from "fs";
import drawLine from "./functions/drowLine.js";
import contactSection from "./functions/contactSection.js";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const port = process.env.PORT;
const summaryText =
  "I am a motivated Full Stack Developer with hands-on experience in building web applications. I’m skilled in front-end and back-end development and focus on writing clean, efficient code. I enjoy working as a team, sharing ideas, and learning from others. I’m excited to take on new challenges and use new technologies to create innovative solutions and improve development.";

app.get("/", (req, res) => {
  try {

    const Skills = [
      {
        skillsText: "React.js, HTML, CSS, JavaScript, Bootstrap, Tailwind",
        field: "Frontend:",
      },
      {
        skillsText: "Node.js, Express.js, MongoDB, Firebase",
        field: "Backend:",
      },
      {
        skillsText: "Git, GitHub, VS Code, Heroku, Netlify",
        field: "Tools:",
      },
      {
        skillsText: "Node.js, Express.js, MongoDB, Firebase",
        field: "Backend:",
      },
    ];

    const defaultOptions = {
      margins: { top: 0, left: 0, right: 0, bottom: 0 },
      layout: 'portrait',
    };
    
    // Initialize PDF document with default options
    const myPDF = new PDFDocument({ 
      layout: defaultOptions.layout, 
      margins: defaultOptions.margins 
    });
    const fonts = ["./fonts/calibri-regular.ttf", "./fonts/calibri-bold.ttf"];
    myPDF.font(fonts[0]);
    //const pdfName = new Date().getTime() + ".pdf";

    // contact section
    contactSection(myPDF);

    //Summry heading
    const summryTitle = "Summary";
    const summryTitleHeight = myPDF.heightOfString(summryTitle, {
      fontSize: 12,
    });
    const headingLeft = 30;
    const headingTop = 85;
    let height = headingTop;
    myPDF.font(fonts[1]);
    myPDF
      .fillColor("black")
      .fontSize(12)
      .text(summryTitle, headingLeft, height);

    // Draw a line
    const lineLeft = 30;
    drawLine(myPDF, (height += summryTitleHeight), lineLeft);

    // summary text
    const width = myPDF.page.width - 54;
    const summaryTextHeight = myPDF.heightOfString(summaryText, {
      fontSize: 11,
    });
    myPDF.font(fonts[0]);
    myPDF
      .fillColor("black")
      .fontSize(11)
      .text(summaryText, headingLeft, (height += 8), { width });
    // end of summary

    // Technical Skills heading
    const skillsTitle = "Technical Skills";
    const skillsTitleHeight = myPDF.heightOfString(skillsTitle, {
      fontSize: 12,
    });
    myPDF.font(fonts[1]);
    myPDF
      .fillColor("black")
      .fontSize(12)
      .text(skillsTitle, headingLeft, (height += summaryTextHeight + 5));

    drawLine(myPDF, (height += skillsTitleHeight), lineLeft);

    // skills

    Skills.forEach((skill) => {
      // Calculate the heights
      const fieldWidth = myPDF.widthOfString(skill.field, { fontSize: 11 });
      const fieldHeight = myPDF.heightOfString(skill.field, { fontSize: 11 });
      const skillsTextHeight = myPDF.heightOfString(skill.skillsText, {
        fontSize: 11,
      });

      const currentElementHeight = Math.max(fieldHeight, skillsTextHeight);

      // show fields
      myPDF
        .font(fonts[1])
        .fontSize(11)
        .text(skill.field, headingLeft + 10, height + skillsTitleHeight);

      // show skillsText
      myPDF
        .font(fonts[0])
        .fillColor("black")
        .fontSize(11)
        .text(skill.skillsText, fieldWidth + 45, height + skillsTitleHeight);

      height += currentElementHeight + 5;
    });
    // end of skills

    // Projects Section Start
    const projectSectionHeading = "Projects";
    const projectSectionHeadingHeight = myPDF.heightOfString(
      projectSectionHeading,
      { fontSize: 12 }
    );
    myPDF.font(fonts[1]);
    myPDF
      .fillColor("black")
      .fontSize(12)
      .text(projectSectionHeading, headingLeft, (height += 20));

    drawLine(myPDF, (height += projectSectionHeadingHeight), lineLeft);

    // First Project Title
    const firstProjectURL = "https://internshipyatra.ravikhokle.site";
    const firstProjectTitle = "Developed a Web-Based Project Platform -";
    const firstProjectTitleWidth = myPDF.widthOfString(firstProjectTitle, {
      fontSize: 11,
    });
    const SecondProjectURL = "https://internshipyatra.ravikhokle.site";
    const SecondProjectTitle = "Developed a Web-Based Project Platform -";
    const SecondProjectTitleWidth = myPDF.widthOfString(SecondProjectTitle, {
      fontSize: 11,
    });
    myPDF
      .font(fonts[1])
      .fillColor("black")
      .fontSize(11)
      .text(firstProjectTitle, headingLeft, (height += 11));
    myPDF
      .fontSize(10)
      .fillColor("blue")
      .text("Link", firstProjectTitleWidth + 15, height, {
        link: firstProjectURL,
        underline: true,
      });

    const firstProjectArray = [
      "Ravi is working on pdf generate project Created a platform to connect students with Project opportunities.",
      "Intern Functionality: Students can browse and apply for Projects.",
      "HR Functionality: HR can publish, update, and delete Projects, as well as review applicants’ resumes and profiles.",
    ];
    const firstProjectArrayHeight = myPDF.heightOfString(firstProjectArray, {
      fontSize: 11,
    });
    myPDF
      .text(" ", headingLeft + 20, (height += 10), { width })
      .fillColor("black")
      .font(fonts[0])
      .fontSize(11)
      .list(firstProjectArray, { bulletRadius: 2.5 });

    // second Project Title
    myPDF
      .font(fonts[1])
      .fillColor("black")
      .fontSize(11)
      .text(
        SecondProjectTitle,
        headingLeft,
        (height += firstProjectArrayHeight + 20)
      );
    myPDF
      .fontSize(10)
      .fillColor("blue")
      .text("Link", SecondProjectTitleWidth + 15, height, {
        link: SecondProjectURL,
        underline: true,
      });

    const secondProjectArray = [
      "Created a platform to connect students with Project opportunities.",
      "Intern Functionality: Students can browse and apply for Projects.",
      "HR Functionality: HR can publish, update, and delete Projects, as well as review applicants’ resumes and profiles.",
    ];
    const secondProjectArrayHeight = myPDF.heightOfString(secondProjectArray, {
      fontSize: 11,
    });
    myPDF
      .text(" ", headingLeft + 20, (height += 10), { width })
      .fillColor("black")
      .font(fonts[0])
      .fontSize(11)
      .list(secondProjectArray, { bulletRadius: 2.5 });

    //Awards & Achievements Section Start
    const awardsAndAchievements = "Awards & Achievements";
    myPDF.font(fonts[1]);
    myPDF
      .fillColor("black")
      .fontSize(12)
      .text(
        awardsAndAchievements,
        headingLeft,
        (height += secondProjectArrayHeight + 30)
      );
    drawLine(myPDF, (height += 13), lineLeft);

    // Awards list
    const awardList = [
      {
        boldText: "C, C++:",
        normalText: "Compilation Certificates from Devansh Edu Tech Parbhani.",
      },
      {
        boldText: "Full Stack Web Development:",
        normalText: "Certificate from Udemy",
      },
    ];

    awardList.forEach((award) => {
      // Calculate the heights
      const boldTextWidth = myPDF.widthOfString(award.boldText, {
        fontSize: 11,
      });
      const boldTextHeight = myPDF.heightOfString(award.boldText, {
        fontSize: 11,
      });
      const normalTextHeight = myPDF.heightOfString(award.normalText, {
        fontSize: 11,
      });

      const currentElementHeight = Math.max(boldTextHeight, normalTextHeight);

      myPDF
        .font(fonts[1])
        .fontSize(11)
        .text(award.boldText, headingLeft + 10, height + normalTextHeight);

      myPDF
        .font(fonts[0])
        .fillColor("black")
        .fontSize(11)
        .text(award.normalText, boldTextWidth + 45, height + normalTextHeight);

      height += currentElementHeight + 5;
    });

    // Education

    const EducationSection = "Education";
    myPDF.font(fonts[1]);
    myPDF
      .fillColor("black")
      .fontSize(12)
      .text(EducationSection, headingLeft, (height += 20));

    drawLine(myPDF, (height += 13), lineLeft);
    const degreeName = "BCA (Bachelor of Computer Applications)";
    const universityName = "SRTMU Nanded";
    const universityNameWidth = myPDF.widthOfString(universityName, {
      fontSize: 11,
    });
    const Years = [
      "BCA-FY CGPA: 7.15",
      "BCA-SY CGPA: 7.25",
      "Currently pursuing BCA-TY",
    ];

    const widthForShowUniversityName =
      myPDF.page.width - universityNameWidth - headingLeft;

    myPDF
      .font(fonts[1])
      .fillColor("black")
      .fontSize(11)
      .text(degreeName, headingLeft + 20, (height += 10), { width });

    myPDF
      .font(fonts[1])
      .fillColor("black")
      .fontSize(11)
      .text(universityName, widthForShowUniversityName, height, { width });

    const degreeStartDate = "July 2022";
    const degreeEndDate = "August 2025";

    myPDF
      .font(fonts[0])
      .fillColor("black")
      .fontSize(11)
      .text(
        `${degreeStartDate} - ${degreeEndDate}`,
        headingLeft + 20,
        (height += 20),
        { width }
      );

    myPDF
      .text(" ", headingLeft + 20, (height += 8), { width })
      .font(fonts[0])
      .fillColor("black")
      .fontSize(11)
      .list(Years, { bulletRadius: 2.5 });

    const yearHeight = myPDF.heightOfString(Years, { fontSize: 11 });

    // Hobbies and Interests

    const hobbiesAndInterests = "Hobbies/Interests";
    myPDF
      .font(fonts[1])
      .fillColor("black")
      .fontSize(11)
      .text(hobbiesAndInterests, headingLeft, (height += yearHeight + 55), {
        width,
      });

    drawLine(myPDF, (height += 12), lineLeft);

    const hobbiesAndInterestsArray = [
      "Learning new Technologies",
      "Exploring new things",
      "Blogging",
      "Traveling",
      "Gaming",
    ];

  hobbiesAndInterestsArray.forEach((hobby) => {
  const hobbyTextHeight = myPDF.heightOfString(hobby, { fontSize: 10 });

  myPDF
    .font(fonts[0])
    .fillColor("black")
    .fontSize(11)
    .text(hobby, headingLeft + 20, height + 10, { width });

    height += hobbyTextHeight + 5; // Increment the current height for the next item
});

    myPDF.pipe(fs.createWriteStream("resume.pdf"));
    myPDF.end();

    res.send("PDF Created");
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
