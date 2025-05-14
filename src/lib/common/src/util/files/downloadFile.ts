export async function downloadJson(fileName: string, content: string) {
  const byteNumbers = new Array(content.length)
    .fill(1)
    .map((_, i) => content.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {
    type: "application/json;charset=utf-8",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

export async function downloadBase64(fileName: string, base64: string) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length)
    .fill(1)
    .map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/pdf" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

export async function downloadFile(fileName: string, url: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName; // The filename for the downloaded PDF
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
