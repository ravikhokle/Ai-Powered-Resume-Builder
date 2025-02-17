import NormalButton from "../components/NormalButton";
import MyTypeAnimation from "../utils/TypeAnimation";
import PDFViewer from "../utils/PDFViewer";
import SimpleResume from "../templates/Simple Resume Template.pdf";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 text-start">
        We offer free{" "}
        <span className="text-blue-500">
          <MyTypeAnimation
            text1="AI-Powered Resume Builder"
            text2="In Build Grammar Checker"
            text3="ATS-Friendly Resume Templates"
            text4="Fast and Easy Resume Creation"
          />
        </span>
      </h1>

      {/* Templates */}
      <div className="mt-20">
        <h2
          id="templates"
          className="text-2xl text-center sm:text-3xl font-bold text-gray-500"
        >
          Choose your resume template
        </h2>
        <div className="text-center">
          <div>
            <h2 className="text-2xl font-bold my-2 py-2">Simple</h2>
            <div>
              <PDFViewer url={SimpleResume} />
            </div>
            <NormalButton url="/simple-resume" name="Create" />
          </div>
          <hr className="my-5" />
          <div>
            <h2 className="text-2xl font-bold my-2 py-2">Exprienced</h2>
            <div>
              <PDFViewer url={SimpleResume} />
            </div>
            <NormalButton url="/" name="Coming Soon..." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
