export default function chooseQualityColor(itemQuality) {
    if(itemQuality < 0) return "lightgrey"
    if (itemQuality >= 4) return 'rgb(127, 246, 195)';
    if (itemQuality < 4 && itemQuality >= 3) return 'rgb(255, 241, 112)';
    return 'rgb(255, 156, 156)';
}