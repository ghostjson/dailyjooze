const $dailyCheckboxElement = document.getElementById("daily-checkbox");
const $weeklyCheckboxElement = document.getElementById("weekly-checkbox");
const $targetCheckboxElement = document.getElementById("target-checkbox");
const $emailElement = document.getElementById("email");
const $whatsappElement = document.getElementById("whatsapp");
const $submitButtonElement = document.getElementById("submit-button");

const download = async () => {
  const daily = $dailyCheckboxElement.checked;
  const weekly = $weeklyCheckboxElement.checked;
  const target = $targetCheckboxElement.checked;
  const email = $emailElement.value;
  const whatsapp = $whatsappElement.value;

  if (email === null && whatsapp === null) {
    /// input logic
  } else {
    const payload = {
      downloads: {
        daily,
        weekly,
        target,
      },
      email,
      whatsapp,
    };

    const response = await fetch("/api/v1/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // blob data
    const data = await response.blob();
    downloadFromBlob(data);

    return response;
  }
};

const downloadFromBlob = (blob) => {
  const a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = "download";
  a.click();
};

window.onload = () => {
  $submitButtonElement.addEventListener("click", (event) => {
    download();
  });
};
