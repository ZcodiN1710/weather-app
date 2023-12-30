const generateBtn = document.getElementById("generate");
const zipInput = document.getElementById("zip");
const baseUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=`;
const apiKey = "&appid=576c33c43d66e9e66d770b967c83cc76&units=imperial";


// =============get the api============================
const getApiData = async (fullApiUrl) => {
  let zipCode = zipInput.value
  fullApiUrl =`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`
  console.log(fullApiUrl);
  const response = await fetch(fullApiUrl);
  try {
    const data = await response.json();
    return data.list[0].main.temp;
  } catch (error) {
    console.log("error", error);
  }
};
// =================Post request============================
const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
  } catch (error) {
    console.log("error", error);
  }
};
// ================Post all data========================================
const performActions = () => {
  // get the current date
  const dateNow = new Date();
  const currentDate = `${dateNow.getDate()} ${dateNow.toLocaleString("en", {
    month: "short",
  })} ${dateNow.getFullYear()}`;
  console.log(currentDate);
  // get the feeling of the user
  const userResponse = document.getElementById("feelings").value;
  console.log(userResponse);
  // get the temperature
  getApiData().then((temp) => {
    console.log(temp);
    postData("/addData", {
      temperature: temp,
      date: currentDate,
      feeling: userResponse,
    });
    updateUI(currentDate,temp,userResponse)
  });
  
};
//==================update the UI==========================
const updateUI =  (date,temperature,feeling) => {
  // const request = await fetch("/all");
  // try {
    // const allData = await request.json();
    // console.log(allData);
    const dateEl = document.querySelector("#date p").innerHTML =
      date;
    const tempEl = document.querySelector("#temp p").innerHTML =
    temperature;
    const contentEl = document.querySelector("#content").innerHTML =
      feeling
  // } catch (error) {}
};
//  ==========listen to click generate button===========================
generateBtn.addEventListener("click", performActions);
