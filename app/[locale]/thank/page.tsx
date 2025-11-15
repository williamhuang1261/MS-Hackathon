import StickyHeader from "@/components/LandingPage/StickyHeader";
import ThankYouHeader from "@/components/ThankYouPage/ThankYouHeader";

const ThankYouPage = () => {
  return (
    <div>
      <div className="w-full px-16 fixed top-8">
        <StickyHeader />
      </div>
      {/* <ThankYouHeader /> */}
    </div>
  );
};

export default ThankYouPage;
