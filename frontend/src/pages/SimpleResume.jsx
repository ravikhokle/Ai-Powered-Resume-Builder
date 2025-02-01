import { useState } from "react";
import axios from "axios";
import placeHolder from "./placeHolder";
import Loading from "../components/Loading";

const SimpleResume = () => {

  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState({
    message:"",
    resumeLink:"",
  });

  const [formData, setFormData] = useState({
    name: "",
    resumeNumber: "",
    resumeEmail: "",
    GitHubURL: "",
    LinkedInURL: "",
    summryTitle: "Professional Summary",
    summaryText: "",
    skillsTitle: "Technical Skills",
    Skills: [
      {
        field: "",
        skillsText: "",
      },
      {
        field: "",
        skillsText: "",
      },
      { field: "", skillsText: "" },
    ],
    projectSectionHeading: "Projects",
    getFirstProjectTitle: "",
    firstProjectURL: "",
    firstProjectArray: ["", "", ""],
    getSecondProjectTitle: "",
    secondProjectURL: "",
    secondProjectArray: ["", "", ""],
    awardsAndAchievementsTitle: "Awards & Achievements",
    awardList: [
      {
        boldText: "",
        normalText: "",
      },
      {
        boldText: "",
        normalText: "",
      },
    ],
    EducationSection: "Education",
    degreeName: "",
    universityName: "",
    Years: ["", "", ""],
    degreeStartDate: "",
    degreeEndDate: "",
    hobbiesAndInterests: "Hobbies & Interests",
    hobbiesAndInterestsArray: ["", "", "", "", ""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (e, field, index, nestedField) => {
    const { value } = e.target;
    setFormData((prev) => {
      const updatedArray = [...prev[field]];
      if (nestedField) {
        updatedArray[index] = {
          ...updatedArray[index],
          [nestedField]: value,
        };
      } else {
        updatedArray[index] = value;
      }
      return {
        ...prev,
        [field]: updatedArray,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_API}/simpleResume`;
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      setResponse({
        message: response.data.message,
        resumeLink: response.data.resumeLink,
      });
      console.log(response.data.resumeLink);
    } catch (error) {
      console.error("Error while creating resume:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-6 bg-white shadow-lg rounded-xl max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          AI Powered Resume Builder
        </h2>

        {/* Basic Info */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={placeHolder.name}
              className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number:
            </label>
            <input
              type="text"
              name="resumeNumber"
              value={formData.resumeNumber}
              onChange={handleChange}
              placeholder={placeHolder.resumeNumber}
              className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email:
            </label>
            <input
              type="email"
              name="resumeEmail"
              value={formData.resumeEmail}
              onChange={handleChange}
              placeholder={placeHolder.resumeEmail}
              className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GitHub URL:
            </label>
            <input
              type="text"
              name="GitHubURL"
              value={formData.GitHubURL}
              onChange={handleChange}
              placeholder={placeHolder.GitHubURL}
              className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn URL:
            </label>
            <input
              type="text"
              name="LinkedInURL"
              value={formData.LinkedInURL}
              onChange={handleChange}
              placeholder={placeHolder.LinkedInURL}
              className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Summary Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Summary:
          </label>
          <textarea
            name="summaryText"
            value={formData.summaryText}
            onChange={handleChange}
            placeholder={placeHolder.summaryText}
            className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        {/* Skills Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Skills</h3>
          {formData.Skills.map((skill, index) => (
            <div
              key={index}
              className="space-y-2 flex flex-col sm:flex-row gap-4 mb-4"
            >
              <div className="w-full sm:w-1/3">
                <label className="block text-sm font-medium text-gray-700">
                  Field/Area
                </label>
                <input
                  type="text"
                  value={skill.field}
                  onChange={(e) =>
                    handleArrayChange(e, "Skills", index, "field")
                  }
                  placeholder={placeHolder.Skills[index]?.field || ""}
                  className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full sm:w-2/3">
                <label className="block text-sm font-medium text-gray-700">
                  Skills:
                </label>
                <input
                  type="text"
                  value={skill.skillsText}
                  onChange={(e) =>
                    handleArrayChange(e, "Skills", index, "skillsText")
                  }
                  placeholder={placeHolder.Skills[index]?.skillsText || ""}
                  className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Projects</h3>
          {/* First Project */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Project Title:
              </label>
              <input
                type="text"
                name="getFirstProjectTitle"
                value={formData.getFirstProjectTitle}
                onChange={handleChange}
                placeholder={placeHolder.getFirstProjectTitle}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link:
              </label>
              <input
                type="text"
                name="firstProjectURL"
                value={formData.firstProjectURL}
                onChange={handleChange}
                placeholder={placeHolder.firstProjectURL}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {formData.firstProjectArray.map((item, index) => (
            <div key={index} className="space-y-2 mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Point {index + 1}:
              </label>
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleArrayChange(e, "firstProjectArray", index)
                }
                placeholder={placeHolder.firstProjectArray[index] || ""}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {/* Second Project */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Second Project Title:
              </label>
              <input
                type="text"
                name="getSecondProjectTitle"
                value={formData.getSecondProjectTitle}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link:
              </label>
              <input
                type="text"
                name="secondProjectURL"
                value={formData.secondProjectURL}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {formData.secondProjectArray.map((item, index) => (
            <div key={index} className="space-y-2 mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Point {index + 1}:
              </label>
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleArrayChange(e, "secondProjectArray", index)
                }
                className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Awards Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Awards & Achievements
          </h3>
          {formData.awardList.map((award, index) => (
            <div
              key={index}
              className="space-y-2 flex flex-col sm:flex-row gap-4 mb-4"
            >
              <div className="w-full sm:w-1/3">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={award.boldText}
                  onChange={(e) =>
                    handleArrayChange(e, "awardList", index, "boldText")
                  }
                  placeholder={placeHolder.awardList[index]?.boldText || ""}
                  className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full sm:w-2/3">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  value={award.normalText}
                  onChange={(e) =>
                    handleArrayChange(e, "awardList", index, "normalText")
                  }
                  placeholder={placeHolder.awardList[index]?.normalText || ""}
                  className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Education
          </h3>
          <div className="space-y-2 flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Course/Degree Name:
              </label>
              <input
                type="text"
                name="degreeName"
                value={formData.degreeName}
                onChange={handleChange}
                placeholder={placeHolder.degreeName || ""}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                University/College Name:
              </label>
              <input
                type="text"
                name="universityName"
                value={formData.universityName}
                onChange={handleChange}
                placeholder={placeHolder.universityName || ""}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="space-y-2 flex flex-col sm:flex-row gap-4 mt-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Start Date:
              </label>
              <input
                type="text"
                name="degreeStartDate"
                value={formData.degreeStartDate}
                onChange={handleChange}
                placeholder={placeHolder.degreeStartDate || ""}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                End Date:
              </label>
              <input
                type="text"
                name="degreeEndDate"
                value={formData.degreeEndDate}
                onChange={handleChange}
                placeholder={placeHolder.degreeEndDate || ""}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Years Section */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Years:
            </label>
            {formData.Years.map((year, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="text"
                  value={year}
                  onChange={(e) => handleArrayChange(e, "Years", index)}
                  placeholder={placeHolder.Years[index] || ""}
                  className="block w-full p-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Hobbies/Interests */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Hobbies & Interests
          </h3>
          {formData.hobbiesAndInterestsArray.map((hobby, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {index + 1}:
              </label>
              <input
                type="text"
                value={hobby}
                onChange={(e) =>
                  handleArrayChange(e, "hobbiesAndInterestsArray", index)
                }
                placeholder={placeHolder.hobbiesAndInterestsArray[index] || ""}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        <p className="text-sm">📝 Note: This is a resume template designed with fixed sizes and fields to ensure optimal formatting. To create the best version of your resume, <span className="text-red-600">please fill out all fields.</span></p>
        <button
          type="submit"
          className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>

      {loading &&
      <div className="p-6 space-y-2 bg-white shadow-lg rounded-xl max-w-4xl mx-auto mt-5">
      <Loading show={loading}/>
       </div>}

      {response.resumeLink &&
      <div className="p-6 space-y-2 bg-white shadow-lg rounded-xl max-w-4xl mx-auto mt-5">
         <h1>🎉 Congratulations! Your resume is ready to shine 🤩</h1>
          <a href={response.resumeLink} target="_blank">👉 <span className="text-blue-600">Download</span></a>
         <p className="py-2">We&apos;d love to hear your thoughts on our project! Share your valuable feedback with us at: ravikhokle1@gmail.com.</p>
      </div>}
    </div>
  );
};

export default SimpleResume;
