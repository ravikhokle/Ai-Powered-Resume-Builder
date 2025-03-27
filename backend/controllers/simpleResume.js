  import PDFDocument from "pdfkit";
  import drawLine from "../utils/drowLine.js";
  import contactSection from "../utils/contactSection.js";
  import uploadToCloudinary from "../lib/cloudnary.js";
  import stream from "stream";

  const simpleResume = async (req, res) => {
    const { name, resumeEmail, resumeNumber } = req.body;
    if (!name && !resumeEmail && !resumeNumber) {
      return res.status(400).send({ message: "Please provide contact details" });
    }

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

      // Create PDF document
      const myPDF = new PDFDocument({
        layout: defaultOptions.layout,
        margins: defaultOptions.margins,
      });

      myPDF.pipe(bufferStream);

      const fonts = ["./fonts/calibri-regular.ttf", "./fonts/calibri-bold.ttf"];
      myPDF.font(fonts[0]);

      // Add contact section
      contactSection(myPDF, req.body);

      // Add section with title and content
      const addSection = (
        title,
        content,
        fontSize = 12,
        contentFontSize = 11
      ) => {
        const titleHeight = myPDF.heightOfString(title, { fontSize });
        myPDF
          .font(fonts[1])
          .fillColor("black")
          .fontSize(fontSize)
          .text(title, 30, height);
        drawLine(myPDF, (height += titleHeight), 30);
        const contentHeight = myPDF.heightOfString(content, {
          fontSize: contentFontSize,
        });
        myPDF
          .font(fonts[0])
          .fillColor("black")
          .fontSize(contentFontSize)
          .text(content, 30, (height += 8), { width: myPDF.page.width - 54 });
        height += contentHeight + 5;
      };

      let height = 110;

      // Add summary section
      summaryText && summryTitle && addSection(summryTitle, summaryText);

      // Add skills section
        addSection(skillsTitle, "");
        Skills.forEach((skill) => {
          const fieldWidth = myPDF.widthOfString(skill.field, { fontSize: 11 });
          const fieldHeight = myPDF.heightOfString(skill.field, { fontSize: 11 });
          const skillsTextHeight = myPDF.heightOfString(skill.skillsText, {
            fontSize: 11,
          });
          const currentElementHeight = Math.max(fieldHeight, skillsTextHeight);
          myPDF.font(fonts[1]).fontSize(11).text(skill.field, 40, height);
          myPDF
            .font(fonts[0])
            .fillColor("black")
            .fontSize(11)
            .text(skill.skillsText, fieldWidth + 45, height);
          height += currentElementHeight + 5;
        });
      

      height += 10;
      // Add projects section
      if (
        projectSectionHeading &&
        (getFirstProjectTitle || getSecondProjectTitle)
      ) {
        addSection(projectSectionHeading, "");
        const addProject = (title, url, points) => {
          const projectTitle = url ? `${title} - ` : title;
          const projectTitleWidth = myPDF.widthOfString(projectTitle);
          myPDF
            .font(fonts[1])
            .fillColor("black")
            .fontSize(11)
            .text(projectTitle, 30, height);
          url &&
            myPDF
              .fontSize(10)
              .fillColor("blue")
              .text("Link", projectTitleWidth + 35, height, {
                link: url,
                underline: true,
              });
          const pointsHeight = myPDF.heightOfString(points, { fontSize: 11 });
          myPDF
            .text(" ", 50, (height += 10), { width: myPDF.page.width - 54 })
            .fillColor("black")
            .font(fonts[0])
            .fontSize(11)
            .list(points, { bulletRadius: 2.5 });
          height += pointsHeight + 20;
        };

        getFirstProjectTitle &&
          addProject(getFirstProjectTitle, firstProjectURL, firstProjectArray);
        getSecondProjectTitle ? (height += 30) : height + 0; // Add space between first and second project
        getSecondProjectTitle &&
          addProject(getSecondProjectTitle, secondProjectURL, secondProjectArray);
        height += 20; // Add space after second project
      }

      // Add awards section
        addSection(awardsAndAchievementsTitle, "");
        awardList.forEach((award) => {
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
          myPDF.font(fonts[1]).fontSize(11).text(award.boldText, 40, height);
          myPDF
            .font(fonts[0])
            .fillColor("black")
            .fontSize(11)
            .text(award.normalText, boldTextWidth + 45, height);
          height += currentElementHeight + 5;
        });

      height += 10;
      // Add education section
      if (degreeName.length > 0) {
        addSection(EducationSection, "");
        const universityNameWidth = myPDF.widthOfString(universityName, {
          fontSize: 11,
        });
        const widthForShowUniversityName =
          myPDF.page.width - universityNameWidth - 30;
        myPDF
          .font(fonts[1])
          .fillColor("black")
          .fontSize(11)
          .text(degreeName, 50, height);
        universityName &&
          myPDF
            .font(fonts[1])
            .fillColor("black")
            .fontSize(11)
            .text(universityName, widthForShowUniversityName, height);
        degreeStartDate &&
          myPDF
            .font(fonts[0])
            .fillColor("black")
            .fontSize(11)
            .text(`${degreeStartDate} - ${degreeEndDate}`, 50, (height += 20));
        height += 1; // Add space between degree dates and years list
        Years &&
          myPDF
            .text(" ", 50, (height += 8))
            .font(fonts[0])
            .fillColor("black")
            .fontSize(11)
            .list(Years, { bulletRadius: 2.5 });
        height += 60; // Add space after years list
      }

      // Add hobbies section

        addSection(hobbiesAndInterests, "");
        hobbiesAndInterestsArray.forEach((hobby) => {
          const hobbyTextHeight = myPDF.heightOfString(hobby, { fontSize: 10 });
          myPDF
            .font(fonts[0])
            .fillColor("black")
            .fontSize(11)
            .text(hobby, 50, height);
          height += hobbyTextHeight + 3;
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
      console.error("Error generating resume:", error);
      res.status(500).send({ message: "error while generating the resume." });
    }
  };

  export default simpleResume;
