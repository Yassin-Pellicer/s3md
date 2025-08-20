import { useState } from "react";

export function hooks() {
  const [selectedOption, setSelectedOption] = useState<string>("Schedule");  

  return {
    selectedOption,
    setSelectedOption
  };
}
