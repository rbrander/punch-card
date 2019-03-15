const pad = (time) => {
  return (time < 10) ? `0${time}` : time
}

export const formatTimer = (sec) => {
  let hour = Math.floor(sec / 3600)
  let minute = Math.floor(sec / 60) % 60
  let seconds = sec % 60
  return [hour, minute, seconds]
    .map(v => pad(v))
    .join(':')
}