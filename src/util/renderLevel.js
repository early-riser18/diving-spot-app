
export default function renderLevel(level) {
    switch (level) {
        case 'Facile':
            return 'easy';
        case 'Moyen':
            return 'medium';
        case 'Difficile':
            return 'hard';
        default: return 'hard';
    }
}