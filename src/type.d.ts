type ScoreState = {
    score: number
}

type ScoreAction = {
    type: string,
    amount: number
}

type DispatchType = (args: ScoreAction) => ScoreAction