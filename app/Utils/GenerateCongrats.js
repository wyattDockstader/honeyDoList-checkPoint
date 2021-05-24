
export const generateCongrats = function () {
    let congrats = [
        "Good job man",
        "ooo thats nice"
    ]
    let congrat = congrats[Math.floor(Math.random() * congrats.length)]
    return (congrat)
}