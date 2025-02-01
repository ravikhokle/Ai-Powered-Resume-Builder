import PDFDocument from "pdfkit";
import drawLine from "../utils/drowLine.js";
import contactSection from "../utils/contactSection.js";
import uploadToCloudinary from "../lib/cloudnary.js";
import stream from "stream";


const simpleResume = async (req, res) => {
  try {
    const {
      summaryText,
      summryTitle,
      skillsTitle,
      Skills,
      projectSectionHeading,
      getFirstProjectTitle,
      firstProjectURL,
      firstProjectArray,
      getSecondProjectTitle,
      secondProjectURL,
      secondProjectArray,
      awardsAndAchievementsTitle,
      awardList,
      EducationSection,
      degreeName,
      universityName,
      Years,
      degreeStartDate,
      degreeEndDate,
      hobbiesAndInterests,
      hobbiesAndInterestsArray,
    } = req.body;

    const defaultOptions = {
      margins: { top: 0, left: 0, right: 0, bottom: 0 },
      layout: "portrait",
    };

    const bufferStream = new stream.PassThrough();

    // Default options
    const myPDF = new PDFDocument({
      layout: defaultOptions.layout,
      margins: defaultOptions.margins,
    });

    myPDF.pipe(bufferStream);

    const fonts = ["./fonts/calibri-regular.ttf", "./fonts/calibri-bold.ttf"];
    myPDF.font(fonts[0]);

    // contact section
    contactSection(myPDF, req.body);

    //Summry heading
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
    const firstProjectTitle = `${getFirstProjectTitle} -`;
    const firstProjectTitleWidth = myPDF.widthOfString(firstProjectTitle, {
      fontSize: 11,
    });

    const SecondProjectTitle = `${getSecondProjectTitle} -`;
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
        link: secondProjectURL,
        underline: true,
      });

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
    myPDF.font(fonts[1]);
    myPDF
      .fillColor("black")
      .fontSize(12)
      .text(
        awardsAndAchievementsTitle,
        headingLeft,
        (height += secondProjectArrayHeight + 30)
      );
    drawLine(myPDF, (height += 13), lineLeft);

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

    myPDF.font(fonts[1]);
    myPDF
      .fillColor("black")
      .fontSize(12)
      .text(EducationSection, headingLeft, (height += 20));
    drawLine(myPDF, (height += 13), lineLeft);
    const universityNameWidth = myPDF.widthOfString(universityName, {
      fontSize: 11,
    });

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
    myPDF
      .font(fonts[1])
      .fillColor("black")
      .fontSize(11)
      .text(hobbiesAndInterests, headingLeft, (height += yearHeight + 55), {
        width,
      });

    drawLine(myPDF, (height += 12), lineLeft);

    hobbiesAndInterestsArray.forEach((hobby) => {
      const hobbyTextHeight = myPDF.heightOfString(hobby, { fontSize: 10 });

      myPDF
        .font(fonts[0])
        .fillColor("black")
        .fontSize(11)
        .text(hobby, headingLeft + 20, height + 10, { width });

      height += hobbyTextHeight + 5; // Increment the current height for the next item
    });

    myPDF.end();

    const cloudinaryUrl = await uploadToCloudinary(bufferStream);

    const data = {
      message: "Your resume is ready",
      resumeLink: cloudinaryUrl || "failed",
      success: true,
    };

    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

export default simpleResume;
