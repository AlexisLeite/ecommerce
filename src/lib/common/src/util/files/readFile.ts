export function readJsonFile(): Promise<string> {
  return new Promise((resolve, reject) => {
    // Create a hidden file input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json, .json";

    // When the user picks a file…
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) {
        reject(new Error("No file selected"));
        return;
      }

      // Read it as text
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          resolve(result);
        } else {
          reject(new Error("Unexpected file content format"));
        }
      };
      reader.onerror = () => {
        reject(reader.error ?? new Error("Error reading file"));
      };
      reader.readAsText(file);
    };

    // Open the file picker
    input.click();
  });
}
