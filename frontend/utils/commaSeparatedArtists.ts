export default function (artists: Array<{ name: string }>) {
    return artists.map(artist => artist.name).join(", ");
}