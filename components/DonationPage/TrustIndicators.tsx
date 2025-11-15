import React from "react";

const TrustIndicators = () => {
  return (
    <div className="bg-primary/20 border-2 border-primary/20 rounded-lg p-6 text-center">
      <p className="text-foreground mb-2">
        <span className="font-bold text-primary">
          🟣 80% of funds go directly to programs
        </span>
      </p>
      <p className="text-sm text-foreground/70">
        The other 20% powers operations so we can serve more women in crisis.
      </p>
    </div>
  );
};

export default TrustIndicators;
