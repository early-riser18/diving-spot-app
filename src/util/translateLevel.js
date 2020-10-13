export default function  translateLevel(level){
    switch (level) {
        case 'easy':
            return 'Facile';
        case 'medium':
            return 'Intermédiaire';
        case 'hard':
            return 'Avancé';
        default: return 'Avancé';
  } 
}