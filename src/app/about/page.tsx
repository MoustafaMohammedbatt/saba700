
import Breadcrumb from "@/components/Common/Breadcrumb";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page",
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb 
        pageName={`developed by `}
        description={` `}
      />
      <ProfileCard/>
    </>
  );
};

export default AboutPage;
