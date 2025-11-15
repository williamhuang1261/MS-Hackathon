import StickyHeader from "@/components/LandingPage/StickyHeader";
import ThankYouHeader from "@/components/ThankYouPage/ThankYouHeader";

const ThankYouPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-light-background">
      <div className="fixed left-0 right-0 top-0 z-20 w-full px-6 pt-6 sm:px-16">
        <StickyHeader />
      </div>
      <main className="flex w-full flex-1 items-center justify-center px-4 pb-16 pt-40 sm:px-8">
        <ThankYouHeader />
      </main>
    </div>
  );
};

export default ThankYouPage;
