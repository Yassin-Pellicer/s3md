import { useState } from "react";

export function hooks() {
  const [selectedOption, setSelectedOption] = useState<string>("");  

  return {
    selectedOption,
    setSelectedOption
  };
}
