export const rollDateDice = () => {
  const data = [];

  for(let m = 5; m < 13; m++) {
    for(let d = 1; d < 30; d++) {
      let value = Math.floor(Math.random() * 9);
      let month, day;
      if (m < 10) { month = `0${m}` } else { month = m }
      if (d < 10) { day = `0${d}` } else { day = d }
      data.push({ day: `2019-${month}-${day}`, value: value })
    }
  }

  return data;
}