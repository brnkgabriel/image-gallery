function viralAdvertising(n) {
  // Write your code here
  let recepient = 5
  let totalLikes = 0

  for (let i = 1; i <= n; i++) {
    const likes = Math.floor(recepient / 2)
    recepient = likes * 3
    totalLikes += likes
  }

  return totalLikes
}

// console.log(viralAdvertising(3))

function saveThePrisoner(n, m, s) {
  // n = num of prisoners
  // m = num of candies
  // s = start
  // Write your code here

  const lastPrisoner = s + (m - 1) % n

  if (lastPrisoner === 0) {
    return n
  }
  return lastPrisoner
}

// console.log(saveThePrisoner(3,7,3))

function timeInWords(h, m) {
  // Write your code here
  const map = new Map()
  map.set(1, "one")
  map.set(2, "two")
  map.set(3, "three")
  map.set(4, "four")
  map.set(5, "five")
  map.set(6, "six")
  map.set(7, "seven")
  map.set(8, "eight")
  map.set(9, "nine")
  map.set(10, "ten")
  map.set(11, "eleven")
  map.set(12, "twelve")
  map.set(13, "thirteen")
  map.set(14, "fourteen")
  map.set(15, "fifteen")
  map.set(16, "sixteen")
  map.set(17, "seventeen")
  map.set(18, "eighteen")
  map.set(19, "nineteen")
  map.set(20, "twenty")
  map.set(30, "thirty")
  map.set(40, "forty")
  map.set(50, "fifty")

  const minStr = (m) => {
    const mns = m > 30 ? 60 - Number(m) : m
    const minPieces = mns.toString().split("")
    // console.log("mns", mns)
    if (minPieces[1] && !map.get(mns)) {
      const ref = Number(minPieces[0] + "0")
      const unit = Number(minPieces[1])
      return unit === 0 ? map.get(ref) : map.get(ref) + " " + map.get(unit)
    } else {
      return map.get(mns)
    }
  }
  
  const minNumber = Number(m)

  const hrs = Number(h)
  const isMinZero = minNumber === 0

  if (isMinZero) {
    return `${map.get(hrs)} o' clock`
  } else {
    if (minNumber <= 30){
      if (minNumber === 15) return `quarter past ${map.get(hrs)}`
      if (minNumber === 30) return `half past ${map.get(hrs)}`
      return minNumber === 1
        ? `${minStr(minNumber)} minute past ${map.get(hrs)}`
        : `${minStr(minNumber)} minutes past ${map.get(hrs)}`
    } else {
      if (minNumber !== 45 ) {
        return `${minStr(minNumber)} minutes to ${map.get(hrs + 1)}`
      } else {
        return `quarter to ${map.get(hrs + 1)}`
      }
    }
  }
}

console.log(timeInWords(5, 00))
console.log(timeInWords(5, 01))
console.log(timeInWords(5, 10))
console.log(timeInWords(5, 15))
console.log(timeInWords(5, 30))
console.log(timeInWords(5, 40))
console.log(timeInWords(5, 45))
console.log(timeInWords(5, 47))
console.log(timeInWords(5, 28))