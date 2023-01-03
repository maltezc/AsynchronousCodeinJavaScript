"use strict";

const $favoriteNumber = $("#favorite-number");
const $multipleNumbersList = $("#multiple-numbers-list");
const $favoriteFactsList = $("#favorite-facts-list");

// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number.
// (Make sure you get back JSON by including the json query key, specific to this API.
// request 1
const BASEURL = "http://numbersapi.com";

// favorite numbers
const favNum1 = 15;
const favNum2 = 3;
const favNum3 = 21;

async function main() {
  // fav number fact
  const data1Result = await getNumFact(favNum1); // .then(res => console.log(res.data)).catch(error => console.log(error))

  // add to li
  const data1ResultHtml = `
  <h3>Favorite Number: ${favNum1}</h3>
  <h4>Favorite Number Fact:</h4>
  <h4>${data1Result}</h4>
  `;
  $favoriteNumber.html(data1ResultHtml);

  // Make that request and when you get the data back,
  // put all of the number facts on the page.
  // grab multiple facts
  const allResults = await axios(`${BASEURL}/${favNum2},${favNum3}`);

  for (const result in allResults.data) {
    const $li = $("<li>");
    $li.text(allResults.data[result]);
    $multipleNumbersList.append($li);
  }

  // Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
  // (Note: You’ll need to make multiple requests for this.)

  // Figure out how to get data on multiple numbers in a single request.
  // ALL PROMISES
  const fact1 = getNumFact(favNum1);
  const fact2 = getNumFact(favNum1);
  const fact3 = getNumFact(favNum1);
  const fact4 = getNumFact(favNum1);

  const allFacts = await Promise.allSettled([fact1, fact2, fact3, fact4]);

  for (const fact of allFacts) {
    const $li = $("<li>");
    $li.text(fact.value);
    $favoriteFactsList.append($li);
  }
}

async function getNumFact(num) {
  const axiosRequest1 = await axios(`${BASEURL}/${num}`);
  return axiosRequest1.data;
}

main();

