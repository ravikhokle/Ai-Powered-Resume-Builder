import { useState } from "react";
import axios from "axios";
import placeHolder from "./placeHolder";
import Loading from "../components/Loading";
import DownloadButton from "../components/DownloadButton";
import PDFViewer from "../utils/PDFViewer";
import SubmitButton from "../components/SubmitButton";
import PlusButton from "../components/PlusButton";
import TrashButton from "../components/TrashButton";

const SimpleResume = () => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState({
    message: "",
    resumeLink: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    resumeNumber: "",
    resumeEmail: "",
    GitHubURL: "",
    LinkedInURL: "",
    summryTitle: "Professional Summary",
    summaryText: "",
    skillsTitle: "Skills",
    Skills: [{ field: "", skillsText: "" }],
    projectSectionHeading: "Projects",
    getFirstProjectTitle: "",
    firstProjectURL: "",
    firstProjectArray: [""],
    getSecondProjectTitle: "",
    secondProjectURL: "",
    secondProjectArray: [""],
    awardsAndAchievementsTitle: "Awards & Achievements",
    awardList: [{ boldText: "", normalText: "" }],
    EducationSection: "Education",
    degreeName: "",
    universityName: "",
    Years: [""],
    degreeStartDate: "",
    degreeEndDate: "",
    hobbiesAndInterests: "Hobbies & Interests",
    hobbiesAndInterestsArray: [""],
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

  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      Skills: [...prev.Skills, { field: "", skillsText: "" }],
    }));
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      Skills: prev.Skills.filter((_, i) => i !== index),
    }));
  };

  const addProjectPoint = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeProjectPoint = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const addAward = () => {
    setFormData((prev) => ({
      ...prev,
      awardList: [...prev.awardList, { boldText: "", normalText: "" }],
    }));
  };

  const removeAward = (index) => {
    setFormData((prev) => ({
      ...prev,
      awardList: prev.awardList.filter((_, i) => i !== index),
    }));
  };

  const addHobby = () => {
    setFormData((prev) => ({
      ...prev,
      hobbiesAndInterestsArray: [...prev.hobbiesAndInterestsArray, ""],
    }));
  };

  const removeHobby = (index) => {
    setFormData((prev) => ({
      ...prev,
      hobbiesAndInterestsArray: prev.hobbiesAndInterestsArray.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const addYear = () => {
    setFormData((prev) => ({
      ...prev,
      Years: [...prev.Years, ""],
    }));
  };

  const removeYear = (index) => {
    setFormData((prev) => ({
      ...prev,
      Years: prev.Years.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_API}/simpleResume`;
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const successMessage = response.data.message;
      setResponseData({
        message: successMessage,
        resumeLink: response.data.resumeLink,
      });
      // alert(successMessage);
    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error.response) {
        errorMessage = error.response.data.message || "Something went wrong.";
      } else if (error.request) {
        errorMessage = "Server is down. Please try again later.";
      }
      setResponseData({
        message: errorMessage,
        resumeLink: null,
      });
      // alert(errorMessage);
    } finally {
      setLoading(false);
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
            Professional Summary:
          </label>
          <textarea
            name="summaryText"
            value={formData.summaryText}
            onChange={handleChange}
            placeholder={placeHolder.summaryText}
            className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
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
              <button type="button" onClick={() => removeSkill(index)}>
                <TrashButton />
              </button>
            </div>
          ))}
          <PlusButton funName={addSkill} displayName="Add Skill" />
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
            <div key={index} className="space-y-2 mt-4 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Point {index + 1}:
              </label>
              <div className=" sm:flex flex-row justify-between">
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    handleArrayChange(e, "firstProjectArray", index)
                  }
                  placeholder={placeHolder.firstProjectArray[index] || ""}
                  className="w-full sm:w-[96%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeProjectPoint("firstProjectArray", index)}
                  className="mt-4 sm:mt-0"
                >
                  <TrashButton />
                </button>
              </div>
            </div>
          ))}
          <PlusButton
            funName={() => addProjectPoint("firstProjectArray")}
            displayName="Add Point"
          />

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
            <div key={index} className="space-y-2 mt-4 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Point {index + 1}:
              </label>
              <div className=" sm:flex flex-row justify-between">
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    handleArrayChange(e, "secondProjectArray", index)
                  }
                  className="w-full sm:w-[96%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() =>
                    removeProjectPoint("secondProjectArray", index)
                  }
                  className="mt-4 sm:mt-0"
                >
                  <TrashButton />
                </button>
              </div>
            </div>
          ))}
          <PlusButton
            funName={() => addProjectPoint("secondProjectArray")}
            displayName="Add Point"
          />
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
                  Award Name
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
                  Details
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
              <button type="button" onClick={() => removeAward(index)}>
                <TrashButton />
              </button>
            </div>
          ))}
          <PlusButton funName={addAward} displayName="Add Award" />
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

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Years</h3>
            {formData.Years.map((year, index) => (
              <div key={index} className="space-y-2 mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {index + 1}:
                </label>
                <div className=" sm:flex flex-row justify-between">
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => handleArrayChange(e, "Years", index)}
                    placeholder={placeHolder.Years[index] || ""}
                    className="w-full sm:w-[96%]  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeYear(index)}
                    className="mt-4 sm:mt-0"
                  >
                    <TrashButton />
                  </button>
                </div>
              </div>
            ))}
            <PlusButton funName={addYear} displayName="Add Year" />
          </div>
        </div>

        {/* Hobbies/Interests */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Hobbies & Interests
          </h3>
          {formData.hobbiesAndInterestsArray.map((hobby, index) => (
            <div key={index} className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                {index + 1}:
              </label>
              <div className=" sm:flex flex-row justify-between">
                <input
                  type="text"
                  value={hobby}
                  onChange={(e) =>
                    handleArrayChange(e, "hobbiesAndInterestsArray", index)
                  }
                  placeholder={
                    placeHolder.hobbiesAndInterestsArray[index] || ""
                  }
                  className="w-full sm:w-[96%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeHobby(index)}
                  className="mt-4 sm:mt-0"
                >
                  <TrashButton />
                </button>
              </div>
            </div>
          ))}
          <PlusButton funName={addHobby} displayName="Add Hobby" />
        </div>

        <p className="text-sm">
          📝 Note: This is a resume template designed with fixed sizes and
          fields to ensure optimal formatting. To create the best version of
          your resume,{" "}
          <span className=" font-bold text-red-500">
            please fill out all fields.
          </span>
        </p>
        <SubmitButton name="Generate" />
      </form>

      {loading && (
        <div className="p-6 space-y-2 bg-white shadow-lg rounded-xl max-w-4xl mx-auto mt-5">
          <Loading show={loading} />
        </div>
      )}

      {responseData.resumeLink && (
        <div className="p-6 space-y-2 bg-white shadow-lg rounded-xl max-w-4xl mx-auto mt-5">
          <h3 className="py-2">
            🎉 <b>Congratulations!</b> Your resume is ready to shine 🤩
          </h3>
          <PDFViewer url={responseData.resumeLink} />
          <div className="flex items-center justify-center">
            <DownloadButton name="Download" url={responseData.resumeLink} />
          </div>
          <p>
            We&apos;d love to hear your thoughts on our project! Share your
            valuable feedback with us at: ravikhokle1@gmail.com.
          </p>
        </div>
      )}
    </div>
  );
};

export default SimpleResume;
