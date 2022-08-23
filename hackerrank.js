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

console.log(viralAdvertising(3))