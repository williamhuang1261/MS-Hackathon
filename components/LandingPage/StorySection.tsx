import SurvivorStoryCarousel from "./SurvivorStoryCarousel";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const StorySection = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto px-4">
        <Card>
          <CardContent className="pt-6">
            <SurvivorStoryCarousel />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StorySection;
