export default interface Critic {
    name: string,
    category: string,
    imageUrl: string,
    messages: {
        fetchingLyrics: string,
        analysingLyrics: string,
        analysisDone: string
    }
    description: string,
    tone: string,
    approach: string,
    engagement: string
}