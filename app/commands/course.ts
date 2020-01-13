const xml2js = require('xml2js').parseString;
import fetch from 'node-fetch';

interface ICourse {
  USD: string;
  EUR: string;
}

function courseCommand(bot) {
  bot.onText(/\/course/, (msg, match) => {
    const chatId = msg.chat.id;

    fetch('http://www.cbr.ru/scripts/XML_daily.asp?')
      .then((res) => res.text())
      .then((text) => {

        const course = getCourse(text);
        bot.sendMessage(chatId, buildCourseString(course));
        return text;
      })
      .catch((err) => console.log(err));
  });
}

function getCourse(xml) {
  const course: ICourse = {
    EUR: null,
    USD: null,
  };

  xml2js(xml, (err, result) => {
    const valutes = result.ValCurs.Valute;
    valutes.forEach((valute) => {
      if (valute.CharCode[0] === 'USD') {
        course.USD = getValuteValue(valute);
      }

      if (valute.CharCode[0] === 'EUR') {
        course.EUR = getValuteValue(valute);
      }
    });
    return course;
  });

  return course;
}

function getValuteValue(valute) {
  const value = valute.Value[0].replace(/\,/, '.');
  return Number(value).toFixed(2);
}

function buildCourseString(course) {
  console.log(course);
  let result = '';

  const date = new Date();
  const currentDay = date.getDate();
  const currentMonth = +date.getMonth() + 1 ;
  const currentYear = date.getFullYear();
  const currentDate = `Today is: ${currentDay}/${currentMonth}/${currentYear} \b`;
  result += currentDate;

  result += `USD course: ${course.USD} \b`;
  result += `EUR course: ${course.EUR} \b`;

  return result;
}

export default courseCommand;
