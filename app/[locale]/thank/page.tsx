import StickyHeader from "@/components/LandingPage/StickyHeader";
import DonorWall from "@/components/ThankYouPage/DonorWall";
import ThankYouHeader from "@/components/ThankYouPage/ThankYouHeader";
import YourImpactSection from "@/components/ThankYouPage/YourImpactSection";


const ProgressSection = () => {
  return (
    <div className="w-full bg-primary rounded-lg justify-center flex flex-col items-center">
      <div className="w-full flex justify-center items-start gap-2 p-4">
        <div className="flex flex-col items-end justify-end">
          <h2 className="text-4xl text-light-background">Goal : 14 762 $ </h2>
          <h4 className="text-yellow-500 font-semibold text-lg">+ 100$</h4>
        </div>
        <span className="font-serif font-semibold text-2xl text-dark-background">
          / 50 000 $
        </span>
      </div>
      <div className="text-dark-background text-lg">
        We've added you to our donors wall!
      </div>
      <DonorWall />
    </div>
  );
};

const ThankYouPage = () => {
  return (
    <div className="bg-background">
      <div className="w-full px-16 pt-8">
        <StickyHeader />
      </div>
      <ThankYouHeader />
      <div className="flex px-16 pb-16 gap-8">
        <YourImpactSection />
        <ProgressSection />
      </div>
    </div>
  );
};

export default ThankYouPage;
