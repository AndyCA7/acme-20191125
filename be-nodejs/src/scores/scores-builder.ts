export class ScoresBuilder {

    buildScore(scores: number[]){
        var inputScores: number[] = scores;
        var outputScores: number[] = [];
    
        for (var i=0, l=10; i < l; i++){
            var priorFrameScore: number = outputScores[i-1] || 0;
            var thisRoll: number = inputScores[0] || 0;
            var nextRoll: number = inputScores[1] || 0;
            var secondNextRoll: number = inputScores[2] || 0;
            
            if (thisRoll === 10){
                // Strike logic
                outputScores[i] = thisRoll + nextRoll + secondNextRoll + priorFrameScore;
                inputScores.splice(0, 1);
            }
            else if (thisRoll + nextRoll === 10){
                // Spare Logic
                outputScores[i] = thisRoll + nextRoll + secondNextRoll + priorFrameScore;
                inputScores.splice(0, 2);
            }
            else {
                // Frame Logic
                outputScores[i] = thisRoll + nextRoll + priorFrameScore;
                inputScores.splice(0, 2);
            }
            
        }
    
        return outputScores;
    }

    convertCharactersToScores(rolls: string): Number[] {
        return rolls.split("").map((x, i) => {
            if (x === "X"){
                return 10;
            }
            else if (x === "/"){
                return Number(`${10 - Number(rolls[i-1])}`);
            }
            else if (x === "-"){
                return 0;
            }
            return Number(x);
        });
    }
}
